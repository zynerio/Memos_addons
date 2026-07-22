document.addEventListener('DOMContentLoaded', () => {
  const out = document.getElementById('output');
  const runBtn = document.getElementById('run-btn');
  const downloadBtn = document.getElementById('download-btn');
  const urlInput = document.getElementById('url');
  const tokenInput = document.getElementById('token');
  const LOGIN_DRAFT_KEY = 'memosLoginDraft';
  
  // Pre-rellenar con sesión activa o con borrador de login.
  chrome.storage.local.get(['memosServerUrl', 'memosAccessToken', LOGIN_DRAFT_KEY], (result) => {
    const draft = result[LOGIN_DRAFT_KEY] || {};
    const serverUrl = result.memosServerUrl || draft.serverUrl || '';
    const accessToken = result.memosAccessToken || draft.accessToken || '';

    if (serverUrl) urlInput.value = serverUrl;
    if (accessToken) tokenInput.value = accessToken;
  });

  function saveLoginDraftFromDebug() {
    chrome.storage.local.set({
      [LOGIN_DRAFT_KEY]: {
        serverUrl: (urlInput.value || '').trim(),
        accessToken: (tokenInput.value || '').trim()
      }
    });
  }

  urlInput.addEventListener('input', saveLoginDraftFromDebug);
  tokenInput.addEventListener('input', saveLoginDraftFromDebug);
  
  let rawText = '';

  function log(msgHtml, rawMsg, cls = '') {
    const line = document.createElement('div');
    line.className = 'test-line ' + cls;
    line.textContent = String(msgHtml || '').replace(/<[^>]*>/g, '');
    out.appendChild(line);
    if (rawMsg !== null) {
      rawText += rawMsg + '\n';
    }
    // Auto-scroll
    out.scrollTop = out.scrollHeight;
  }

  runBtn.addEventListener('click', async () => {
    out.replaceChildren();
    rawText = '--- MEMOS API DIAGNOSTIC REPORT ---\n\n';
    downloadBtn.style.display = 'none';
    
    const baseUrl = urlInput.value.trim().replace(/\/$/, '');
    const token = tokenInput.value.trim();
    
    if (!baseUrl || !token) {
      log('Error: Introduce URL y Access Token para ejecutar el diagnóstico (no requiere login previo).', null, 'error');
      return;
    }

    saveLoginDraftFromDebug();

    // Advertencia HTTP en Firefox
    const isHttp = /^http:/.test(baseUrl);
    const isFirefox = /Firefox/i.test(navigator.userAgent);
    if (isHttp && isFirefox) {
      log('⚠️ <b>Firefox detectado con URL HTTP.</b> Firefox activa HTTPS-Only Mode por defecto y bloquea peticiones fetch() desde extensiones hacia servidores HTTP. Soluciones: (1) Ve a Ajustes → Privacidad y Seguridad → HTTPS-Only Mode → Excepciones y añade tu servidor, o (2) desactiva dom.security.https_only_mode en about:config, o (3) usa Chrome/Edge.', null, 'error');
      log('⚠️ <b>Firefox detected with HTTP URL.</b> HTTPS-Only Mode blocks extension fetch() to HTTP servers. Fix: Settings → Privacy → HTTPS-Only → Add exception for your server, or set dom.security.https_only_mode=false in about:config, or use Chrome/Edge.', null, 'error');
    }

    const headers = { 'Authorization': `Bearer ${token}` };

    // TEST 1: Auth Status / User Info
    await testEndpoint('GET /api/v1/auth/status', `${baseUrl}/api/v1/auth/status`, { headers });
    await testEndpoint('GET /api/v1/users/me', `${baseUrl}/api/v1/users/me`, { headers });
    await testEndpoint('GET /api/v1/user/me', `${baseUrl}/api/v1/user/me`, { headers });

    // TEST 2: Workspace Profile - BARRIDO EXHAUSTIVO
    const workspaceEndpoints = [
      '/api/v1/workspace/profile',
      '/api/v1/workspaces/profile',
      '/api/v1/workspace/settings',
      '/api/v1/workspace/settings/custom_profile',
      '/api/v1/workspace/settings/CUSTOM_PROFILE',
      '/api/v1/workspace/settings/settings/CUSTOM_PROFILE',
      '/api/v1/workspace/settings/general',
      '/api/v1/workspace/settings/GENERAL',
      '/api/v1/workspace/settings/settings/GENERAL',
      '/api/v1/workspace/settings/BRANDING',
      '/api/v1/workspace/setting',
      '/api/v1/workspace/setting/CUSTOM_PROFILE',
      '/api/v1/workspace/setting/GENERAL',
      '/api/v1/system/info',
      '/api/v1/instance',
      '/api/v1/instance/settings',
      '/api/v1/instance/settings/GENERAL',
      '/api/v1/instance/settings/general',
      '/api/v1/instance/setting/GENERAL',
      '/api/v1/instance/setting/general',
    ];

    for (const ep of workspaceEndpoints) {
      await testEndpoint(`GET ${ep}`, `${baseUrl}${ep}`, { headers });
    }

    // TEST 2b: ConnectRPC (InstanceService/GetInstanceSetting GENERAL)
    log(`<h3>🔌 ConnectRPC Instance Setting</h3>`, `\n[ ConnectRPC Instance Setting ]`);
    const connectEndpoints = [
      '/memos.api.v1.InstanceService/GetInstanceSetting',
      '/api/memos.api.v1.InstanceService/GetInstanceSetting',
      '/api/v1/memos.api.v1.InstanceService/GetInstanceSetting',
    ];
    const connectPayloads = [
      { name: 'instance/settings/GENERAL' },
      { name: 'instance/settings/general' },
      { setting: { name: 'instance/settings/GENERAL' } },
    ];
    for (const ep of connectEndpoints) {
      for (const payload of connectPayloads) {
        await testEndpoint(
          `POST ${ep} body=${JSON.stringify(payload)}`,
          `${baseUrl}${ep}`,
          {
            method: 'POST',
            headers: {
              ...headers,
              'Content-Type': 'application/json',
              'Connect-Protocol-Version': '1',
            },
            body: JSON.stringify(payload),
          }
        );
      }
    }
    
    // También probar sin auth por si alguno es público
    await testEndpoint('GET /api/v1/workspace/profile (sin auth)', `${baseUrl}/api/v1/workspace/profile`);
    await testEndpoint('GET /api/v1/workspace/settings (sin auth)', `${baseUrl}/api/v1/workspace/settings`);

    // TEST 3: Listar memos (para ver la estructura de recursos)
    const memosResult = await testEndpoint('GET /api/v1/memos?pageSize=3', `${baseUrl}/api/v1/memos?pageSize=3`, { headers });
    
    if (memosResult.ok && memosResult.data?.memos) {
      const memos = memosResult.data.memos;
      log(`<h3>📋 Análisis de estructura de Memos</h3>`, `\n[ Análisis de estructura de Memos ]`);
      memos.forEach((m, i) => {
        log(`<b>Memo ${i}:</b> Campos: ${Object.keys(m).join(', ')}`, `Memo ${i}: Campos: ${Object.keys(m).join(', ')}`);
        if (m.attachments) log(`  → tiene "attachments" (${m.attachments.length})`, `  -> tiene "attachments" (${m.attachments.length})`, 'ok');
        if (m.resources) log(`  → tiene "resources" (${m.resources.length})`, `  -> tiene "resources" (${m.resources.length})`, 'ok');
        if (m.resourceList) log(`  → tiene "resourceList" (${m.resourceList.length})`, `  -> tiene "resourceList" (${m.resourceList.length})`, 'ok');
        if (m.relations) log(`  → tiene "relations" (${m.relations.length})`, `  -> tiene "relations" (${m.relations.length})`, 'ok');
        
        // Si tiene attachments, mostrar detalles
        const att = m.attachments || m.resources || m.resourceList || [];
        att.forEach((a, j) => {
          log(`  Attachment ${j}: ${JSON.stringify(a)}`, `  Attachment ${j}: ${JSON.stringify(a)}`);
        });
      });
    }

    // TEST 4: Listar attachments
    await testEndpoint('GET /api/v1/attachments', `${baseUrl}/api/v1/attachments`, { headers });

    // TEST 5: Upload test (tiny 1x1 PNG)
    log(`<h3>📤 Tests de subida de imagen (1x1 PNG de prueba)</h3>`, `\n[ Tests de subida de imagen ]`);
    
    // Tiny 1x1 red PNG en base64
    const tinyPngB64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
    const tinyPngBytes = Uint8Array.from(atob(tinyPngB64), c => c.charCodeAt(0));
    
    // Intento A: POST /api/v1/attachments con JSON (content como base64)
    await testEndpoint('POST /api/v1/attachments (JSON base64)', `${baseUrl}/api/v1/attachments`, {
      method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ attachment: { filename: 'test.png', type: 'image/png', content: tinyPngB64 } })
    });

    // Intento B: POST /api/v1/attachments con JSON (content como raw bytes string)
    await testEndpoint('POST /api/v1/attachments (solo filename,type,content)', `${baseUrl}/api/v1/attachments`, {
      method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: 'test2.png', type: 'image/png', content: tinyPngB64 })
    });

    // Intento C: POST /api/v1/resources con FormData
    const fd1 = new FormData();
    fd1.append('file', new Blob([tinyPngBytes], { type: 'image/png' }), 'test3.png');
    await testEndpoint('POST /api/v1/resources (FormData)', `${baseUrl}/api/v1/resources`, {
      method: 'POST', headers, body: fd1
    });

    // Intento D: POST /api/v1/resource/blob
    const fd2 = new FormData();
    fd2.append('file', new Blob([tinyPngBytes], { type: 'image/png' }), 'test4.png');
    await testEndpoint('POST /api/v1/resource/blob (FormData)', `${baseUrl}/api/v1/resource/blob`, {
      method: 'POST', headers, body: fd2
    });
    
    // Intento E: POST /api/v1/resource
    const fd3 = new FormData();
    fd3.append('file', new Blob([tinyPngBytes], { type: 'image/png' }), 'test5.png');
    await testEndpoint('POST /api/v1/resource (FormData)', `${baseUrl}/api/v1/resource`, {
      method: 'POST', headers, body: fd3
    });

    log(`<h3>✅ Tests finalizados</h3>`, `\n[ Tests finalizados ]`);
    
    // Al acabar mostramos botón
    downloadBtn.style.display = 'inline-block';
  });

  downloadBtn.addEventListener('click', () => {
    const blob = new Blob([rawText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'memos-debug-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  async function testEndpoint(name, url, options) {
    const start = Date.now();
    try {
      const res = await fetch(url, options);
      const duration = Date.now() - start;
      const status = res.status;
      const cls = res.ok ? 'ok' : 'error';
      const indicator = res.ok ? '✅' : '❌';
      
      log(`${indicator} <span class="endpoint">${name}</span> - Status: ${status} (${duration}ms)`, 
          `${name}: ${status} (${duration}ms)`, cls);
      
      const data = await res.json().catch(() => null);
      if (data) log(`<pre>${JSON.stringify(data, null, 2).substring(0, 500)}</pre>`, null);
      
      return { ok: res.ok, status: res.status, data: data };
    } catch (e) {
      log(`❌ <span class="endpoint">${name}</span> - ERROR: ${e.message}`, `${name}: FAILED (${e.message})`, 'error');
      return { ok: false, error: e.message };
    }
  }
});
