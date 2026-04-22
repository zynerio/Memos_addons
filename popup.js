document.addEventListener('DOMContentLoaded', () => {
  // Selectores UI Básicos
  const loginView = document.getElementById('login-view');
  const memosView = document.getElementById('memos-view');
  const loginForm = document.getElementById('login-form');
  const serverUrlInput = document.getElementById('server-url');
  const accessTokenInput = document.getElementById('access-token');
  const loginError = document.getElementById('login-error');
  const logoutBtn = document.getElementById('logout-btn');
  const expandBtn = document.getElementById('expand-btn');
  
  // Selectores Editor
  const memoInput = document.getElementById('memo-input');
  const saveMemoBtn = document.getElementById('save-memo-btn');
  const saveBtnIcon = document.getElementById('save-btn-icon');
  const saveBtnText = document.getElementById('save-btn-text');
  const cancelEditBtn = document.getElementById('cancel-edit-btn');
  const deleteEditBtn = document.getElementById('delete-edit-btn');
  const editorStatus = document.getElementById('editor-status');
  const formatBtns = document.querySelectorAll('.editor-container .format-btn');
  const attachImgBtn = document.getElementById('attach-img-btn');
  const imageUpload = document.getElementById('image-upload');
  const memoVisibility = document.getElementById('memo-visibility');
  
  // Selectores Vistas Adicionales (Sidebar y Header)
  const memosList = document.getElementById('memos-list');
  const mainSidebar = document.getElementById('main-sidebar');
  const railItems = document.querySelectorAll('.rail-item');
  const mainViews = document.querySelectorAll('.main-view');
  
  // Settings Selectors
  const tabItems = document.querySelectorAll('.tab-item');
  const tabContents = document.querySelectorAll('.settings-tab-content');
  const serverInfoName = document.getElementById('server-info-name');
  const serverInfoLogo = document.getElementById('server-info-logo');
  const serverLogoPreviewWrap = document.getElementById('server-logo-preview-wrap');
  const serverLogoPreview = document.getElementById('server-logo-preview');
  const railWorkspaceLogoWrap = document.getElementById('rail-workspace-logo-wrap');
  const railWorkspaceLogo = document.getElementById('rail-workspace-logo');
  const goDebugBtn = document.getElementById('go-debug-btn');
  const settingsLogoutBtn = document.getElementById('settings-logout-btn');
  const settingsUserInfo = document.getElementById('settings-user-info');
  const setLanguage = document.getElementById('set-language');
  const appVersionEl = document.getElementById('app-version');
  const helpGoDebugBtn = document.getElementById('help-go-debug-btn');
  const railLogoutBtn = document.getElementById('rail-logout-btn');
  const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const voiceBtn = document.getElementById('voice-btn');
  const recordingStatus = document.getElementById('recording-status');
  const voiceVisualizer = document.getElementById('voice-visualizer');
  const attachFileBtn = document.getElementById('attach-file-btn');
  const fileUpload = document.getElementById('file-upload');
  const publicPostOverlay = document.getElementById('public-post-overlay');
  const publicPostBackdrop = document.getElementById('public-post-backdrop');
  const closePublicPostBtn = document.getElementById('close-public-post-btn');
  const publicPostParent = document.getElementById('public-post-parent');
  const publicPostCommentsList = document.getElementById('public-post-comments-list');
  const publicPostCommentsCount = document.getElementById('public-post-comments-count');
  const publicThreadReplyInput = document.getElementById('public-thread-reply-input');
  const publicThreadReplyBtn = document.getElementById('public-thread-reply-btn');
  const publicThreadCancelEditBtn = document.getElementById('public-thread-cancel-edit-btn');
  const publicThreadFormatBtns = document.querySelectorAll('#public-thread-toolbar .format-btn');
  const publicThreadReplyStatus = document.getElementById('public-thread-reply-status');
  const publicPostCreatedAt = document.getElementById('public-post-created-at');
  const publicPostUpdatedAt = document.getElementById('public-post-updated-at');
  const publicPostLoadMoreBtn = document.getElementById('public-post-load-more-btn');
  const openPublicPostTabBtn = document.getElementById('open-public-post-tab-btn');

  const translations = {
    es: {
      nav_home: "Mis Memos",
      nav_public: "Explorar",
      nav_settings: "Opciones",
      nav_help: "Ayuda",
      sidebar_tags: "Etiquetas",
      search_placeholder: "Buscar memos...",
      editor_placeholder: "¿Qué tienes en mente?",
      btn_save: "Guardar",
      btn_update: "Actualizar",
      btn_cancel: "Cancelar",
      btn_delete: "Borrar",
      settings_general: "General",
      settings_server: "Servidor",
      settings_language: "Idioma",
      settings_advanced: "Avanzado",
      help_title: "Ayuda y Guía",
      help_features: "Funcionalidades Principales",
      help_shortcuts: "Atajos de Teclado",
      help_diagnostics: "Soporte y Diagnóstico",
      help_debug_btn: "Ejecutar Herramienta de Diagnóstico"
    },
    en: {
      nav_home: "My Memos",
      nav_public: "Explore",
      nav_settings: "Settings",
      nav_help: "Help",
      sidebar_tags: "Tags",
      search_placeholder: "Search memos...",
      editor_placeholder: "What's on your mind?",
      btn_save: "Save",
      btn_update: "Update",
      btn_cancel: "Cancel",
      btn_delete: "Delete",
      settings_general: "General",
      settings_server: "Server",
      settings_language: "Language",
      settings_advanced: "Advanced",
      help_title: "Help & Guide",
      help_features: "Core Features",
      help_shortcuts: "Keyboard Shortcuts",
      help_diagnostics: "Support & Diagnostics",
      help_debug_btn: "Run Diagnostic Tool"
    }
  };

  function applyTranslations() {
    chrome.storage.local.get(['memosLanguage'], (result) => {
      let lang = result.memosLanguage || 'auto';
      if (lang === 'auto') {
        lang = navigator.language.startsWith('es') ? 'es' : 'en';
      }
      const t = translations[lang] || translations.es;

      // Aplicar a elementos con data-i18n o selectores fijos
      document.querySelectorAll('[data-view="home"]').forEach(el => el.title = t.nav_home);
      document.querySelectorAll('[data-view="public"]').forEach(el => el.title = t.nav_public);
      document.querySelectorAll('[data-view="settings"]').forEach(el => el.title = t.nav_settings);
      document.querySelectorAll('[data-view="help"]').forEach(el => el.title = t.nav_help);
      
      document.querySelector('.tags-section h3').textContent = t.sidebar_tags;
      document.getElementById('search-input').placeholder = t.search_placeholder;
      document.getElementById('memo-input').placeholder = t.editor_placeholder;
      
      // Ajustes
      document.getElementById('tab-text-general').textContent = t.settings_general;
      document.getElementById('tab-text-branding').textContent = t.settings_server;
      document.getElementById('tab-text-language').textContent = t.settings_language;
      document.getElementById('tab-text-advanced').textContent = t.settings_advanced;
      
      // Traducir títulos con iconos
      document.getElementById('title-public').textContent = t.nav_public;
      document.getElementById('title-settings').textContent = t.nav_settings;
      document.getElementById('title-help').textContent = t.help_title;
      
      // Traducir labels de opciones
      if (lang === 'en') {
        const settingsUserLabel = document.getElementById('settings-user-label');
        const serverInfoNameLabel = document.getElementById('server-info-name-label');
        const serverInfoLogoLabel = document.getElementById('server-info-logo-label');
        const serverLogoPreviewLabel = document.getElementById('server-logo-preview-label');
        const languageSettingLabel = document.getElementById('language-setting-label');
        const diagnosticsSettingLabel = document.getElementById('diagnostics-setting-label');
        if (settingsUserLabel) settingsUserLabel.textContent = "Current User";
        if (serverInfoNameLabel) serverInfoNameLabel.textContent = "Server Name";
        if (serverInfoLogoLabel) serverInfoLogoLabel.textContent = "Logo URL";
        if (serverLogoPreviewLabel) serverLogoPreviewLabel.textContent = "Logo Preview";
        if (languageSettingLabel) languageSettingLabel.textContent = "Choose Language";
        if (diagnosticsSettingLabel) diagnosticsSettingLabel.textContent = "Diagnostic (Debug)";
        document.getElementById('btn-text-debug').textContent = "Go to Debug";
        document.getElementById('btn-text-logout').textContent = "Logout / Change User";
      } else {
        const settingsUserLabel = document.getElementById('settings-user-label');
        const serverInfoNameLabel = document.getElementById('server-info-name-label');
        const serverInfoLogoLabel = document.getElementById('server-info-logo-label');
        const serverLogoPreviewLabel = document.getElementById('server-logo-preview-label');
        const languageSettingLabel = document.getElementById('language-setting-label');
        const diagnosticsSettingLabel = document.getElementById('diagnostics-setting-label');
        if (settingsUserLabel) settingsUserLabel.textContent = "Usuario Actual";
        if (serverInfoNameLabel) serverInfoNameLabel.textContent = "Nombre del Servidor";
        if (serverInfoLogoLabel) serverInfoLogoLabel.textContent = "URL del Logo";
        if (serverLogoPreviewLabel) serverLogoPreviewLabel.textContent = "Previsualización del Logo";
        if (languageSettingLabel) languageSettingLabel.textContent = "Elegir Idioma";
        if (diagnosticsSettingLabel) diagnosticsSettingLabel.textContent = "Diagnóstico (Debug)";
        document.getElementById('btn-text-debug').textContent = "Ir a Debug";
        document.getElementById('btn-text-logout').textContent = "Cerrar Sesión / Cambiar Usuario";
      }

      // Traducir sección de ayuda
      const titleHelpSpan = document.getElementById('title-help');
      if (titleHelpSpan) titleHelpSpan.textContent = t.help_title;
      
      const helpHeaders = document.querySelectorAll('.help-section h3');
      if (helpHeaders.length >= 3) {
        helpHeaders[0].textContent = t.help_features;
        helpHeaders[1].textContent = t.help_shortcuts;
        helpHeaders[2].textContent = t.help_diagnostics;
      }
      
      const helpDebugSpan = document.getElementById('btn-text-help-debug');
      if (helpDebugSpan) helpDebugSpan.textContent = t.help_debug_btn;
    });
  }

  const workspaceTitle = document.getElementById('workspace-title');
  const userNameEl = document.getElementById('user-name');
  const userAvatarEl = document.getElementById('user-avatar');
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const tagsListEl = document.getElementById('tags-list');
  
  // Selectores Calendario
  const calendarMonthYear = document.getElementById('calendar-month-year');
  const calendarGrid = document.getElementById('calendar-grid');
  const prevMonthBtn = document.getElementById('prev-month-btn');
  const nextMonthBtn = document.getElementById('next-month-btn');
  const clearCalendarBtn = document.getElementById('clear-calendar-btn');

  let currentServerName = '';
  let currentServerLogo = '';
  let currentServerUrl = '';
  let currentAccessToken = '';
  let brandingFetchInFlight = null;
  let brandingLastFetchTs = 0;
  const BRANDING_CACHE_TTL_MS = 5 * 60 * 1000;
  let editingMemoId = null;
  let allMemos = []; // Para el buscador en vivo
  
  let mediaRecorder = null;
  let audioChunks = [];
  let recordingTimer = null;
  let recordingSeconds = 0;
  let audioCtx = null;
  let analyser = null;
  let animId = null;
  
  // Estado de Filtros
  let currentFilterQuery = '';
  let currentFilterDate = '';
  let currentFilterVisibility = 'ALL';
  let calendarCurrentDate = new Date();
  let currentUserId = null;
  const currentUserRefCandidates = new Set();
  let supportsServerCreatorFilter = null;
  const authorProfileCache = new Map();
  let activePublicThreadMemo = null;
  let currentThreadAllComments = [];
  let currentThreadVisibleCount = 0;
  const THREAD_PAGE_SIZE = 20;
  let lastPublicMemos = [];
  let editingThreadMemoId = null;
  let pendingMemoAttachments = [];
  let editingMemoAttachments = [];
  const publicReplyCountMemory = new Map();
  const seenPublicThreadRefs = new Set();
  const publicThreadReplyCountCache = new Map();
  let publicReplyHydrationSeq = 0;

  function normalizeAttachmentReference(attachmentLike, fallbackFile = null) {
    if (!attachmentLike || typeof attachmentLike !== 'object') return null;

    const name = String(attachmentLike.name || attachmentLike.id || '').trim();
    if (!name) return null;

    const sizeRaw = attachmentLike.size != null ? attachmentLike.size : (fallbackFile ? fallbackFile.size : 0);
    const size = Number(sizeRaw || 0);
    return {
      name,
      filename: attachmentLike.filename || (fallbackFile ? fallbackFile.name : ''),
      type: attachmentLike.type || (fallbackFile ? fallbackFile.type : ''),
      size: Number.isFinite(size) ? size : 0
    };
  }

  function mergeAttachmentReferences(...attachmentGroups) {
    const merged = new Map();
    attachmentGroups.forEach(group => {
      (group || []).forEach(item => {
        const normalized = normalizeAttachmentReference(item);
        if (!normalized || !normalized.name) return;
        merged.set(normalized.name, normalized);
      });
    });
    return Array.from(merged.values()).map(item => ({
      name: item.name,
      filename: item.filename || '',
      type: item.type || '',
      size: item.size || 0
    }));
  }

  function normalizeUserRef(userRef) {
    if (!userRef) return null;
    const value = String(userRef).trim();
    if (!value) return null;
    if (value.startsWith('users/')) return value;
    if (/^\d+$/.test(value)) return `users/${value}`;
    return value;
  }

  function clearCurrentUserRefCandidates() {
    currentUserRefCandidates.clear();
  }

  function setCurrentUserRef(refLike) {
    const normalized = normalizeUserRef(refLike);
    if (!normalized) return null;
    currentUserId = normalized;
    currentUserRefCandidates.add(normalized);
    return normalized;
  }

  function collectCurrentUserRefCandidates(...refLikes) {
    refLikes.forEach(refLike => {
      const normalized = normalizeUserRef(refLike);
      if (!normalized) return;
      currentUserRefCandidates.add(normalized);
      if (!currentUserId) {
        currentUserId = normalized;
      }
    });
  }

  function isOwnedByCurrentUser(memoLike) {
    const creator = normalizeUserRef(memoLike && memoLike.creator);
    if (!creator || currentUserRefCandidates.size === 0) return false;

    if (currentUserRefCandidates.has(creator)) return true;

    const creatorKey = creator.split('/').pop();
    if (!creatorKey) return false;

    for (const candidate of currentUserRefCandidates) {
      if (candidate === creator) return true;
      if (candidate.split('/').pop() === creatorKey) return true;
    }

    return false;
  }

  function buildCurrentUserMemoFilters() {
    const filters = [];
    const seen = new Set();

    const pushFilter = (value) => {
      const normalized = normalizeUserRef(value);
      if (!normalized || seen.has(normalized)) return;
      seen.add(normalized);
      filters.push(`creator == "${normalized}"`);
    };

    pushFilter('users/me');
    currentUserRefCandidates.forEach(pushFilter);
    return filters;
  }

  function getDisplayNameFromUserData(userData, fallback = 'Usuario') {
    if (!userData || typeof userData !== 'object') return fallback;
    return userData.displayName || userData.display_name || userData.nickname || userData.username || userData.name || fallback;
  }

  function resolveAvatarUrlFromUserData(userData) {
    if (!userData || typeof userData !== 'object') return '';
    let avatar = userData.avatarUrl || userData.avatar_url || (userData.profile && (userData.profile.avatarUrl || userData.profile.avatar_url));
    if (!avatar || typeof avatar !== 'string') return '';
    if (!avatar.startsWith('http') && !avatar.startsWith('data:')) {
      avatar = `${currentServerUrl}/${avatar.replace(/^\//, '')}`;
    }
    return avatar;
  }

  function resolveServerAssetUrl(rawUrl) {
    const value = String(rawUrl || '').trim();
    if (!value) return '';
    if (value.startsWith('http') || value.startsWith('data:')) return value;
    return `${currentServerUrl}/${value.replace(/^\//, '')}`;
  }

  function getServerHostLabel() {
    try {
      return new URL(currentServerUrl).hostname || 'Mis Notas';
    } catch (_) {
      return 'Mis Notas';
    }
  }

  function normalizeServerTitleCandidate(rawTitle) {
    const value = String(rawTitle || '').trim();
    if (!value) return '';
    const lower = value.toLowerCase();
    if (['memos', 'login', 'sign in', 'signin'].includes(lower)) return '';
    if (/^(users|memos)\//i.test(value)) return '';
    if (value.length > 120) return '';
    return value;
  }

  async function fetchWorkspaceBrandingFromWeb() {
    let title = '';
    let logoUrl = '';

    try {
      const htmlRes = await fetch(`${currentServerUrl}/`, {
        headers: { 'Authorization': `Bearer ${currentAccessToken}` }
      });
      if (htmlRes.ok) {
        const html = await htmlRes.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');

        const titleCandidates = [
          doc.querySelector('meta[property="og:site_name"]')?.getAttribute('content'),
          doc.querySelector('meta[name="application-name"]')?.getAttribute('content'),
          doc.querySelector('meta[name="apple-mobile-web-app-title"]')?.getAttribute('content'),
          doc.title
        ];

        for (const candidate of titleCandidates) {
          const normalized = normalizeServerTitleCandidate(candidate);
          if (normalized) {
            title = normalized;
            break;
          }
        }

        const logoCandidates = [
          doc.querySelector('meta[property="og:image"]')?.getAttribute('content'),
          doc.querySelector('link[rel="apple-touch-icon"]')?.getAttribute('href'),
          doc.querySelector('link[rel="shortcut icon"]')?.getAttribute('href'),
          doc.querySelector('link[rel="icon"]')?.getAttribute('href')
        ];

        for (const candidate of logoCandidates) {
          const resolved = resolveServerAssetUrl(candidate);
          if (resolved) {
            logoUrl = resolved;
            break;
          }
        }
      }
    } catch (_) {}

    if (!title || !logoUrl) {
      try {
        const manifestRes = await fetch(`${currentServerUrl}/manifest.webmanifest`, {
          headers: { 'Authorization': `Bearer ${currentAccessToken}` }
        });
        if (manifestRes.ok) {
          const manifest = await manifestRes.json().catch(() => null);
          if (manifest && typeof manifest === 'object') {
            if (!title) {
              title = normalizeServerTitleCandidate(manifest.name || manifest.short_name || '');
            }
            if (!logoUrl && Array.isArray(manifest.icons) && manifest.icons.length) {
              const icon = manifest.icons.find(i => i && typeof i.src === 'string' && i.src.trim()) || manifest.icons[0];
              logoUrl = resolveServerAssetUrl(icon && icon.src);
            }
          }
        }
      } catch (_) {}
    }

    return {
      title: title || '',
      logoUrl: logoUrl || ''
    };
  }

  async function fetchWorkspaceBrandingFromConnectRPC() {
    const candidates = [
      '/memos.api.v1.InstanceService/GetInstanceSetting',
      '/api/memos.api.v1.InstanceService/GetInstanceSetting',
      '/api/v1/memos.api.v1.InstanceService/GetInstanceSetting'
    ];

    const payloads = [
      { name: 'instance/settings/GENERAL' },
      { name: 'instance/settings/general' },
      { setting: { name: 'instance/settings/GENERAL' } }
    ];

    function extractFromGeneralSetting(root) {
      if (!root || typeof root !== 'object') return { title: '', logoUrl: '' };

      const directGeneral = root.generalSetting || root.general_setting || null;
      const wrappedGeneral =
        (root.setting && (root.setting.generalSetting || root.setting.general_setting)) ||
        (root.instanceSetting && (root.instanceSetting.generalSetting || root.instanceSetting.general_setting)) ||
        (root.value && (root.value.generalSetting || root.value.general_setting || root.value.general || null)) ||
        (root.setting && root.setting.value && (root.setting.value.generalSetting || root.setting.value.general_setting || root.setting.value.general || null)) ||
        (root.instanceSetting && root.instanceSetting.value && (root.instanceSetting.value.generalSetting || root.instanceSetting.value.general_setting || root.instanceSetting.value.general || null)) ||
        null;

      const general = directGeneral || wrappedGeneral;
      if (!general || typeof general !== 'object') return { title: '', logoUrl: '' };

      const customProfile = general.customProfile || general.custom_profile || null;
      if (!customProfile || typeof customProfile !== 'object') return { title: '', logoUrl: '' };

      const title = normalizeServerTitleCandidate(customProfile.title || customProfile.name || '');
      const logoUrl = String(customProfile.logoUrl || customProfile.logo_url || '').trim();
      return { title, logoUrl };
    }

    for (const path of candidates) {
      for (const body of payloads) {
        try {
          const res = await fetch(`${currentServerUrl}${path}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${currentAccessToken}`,
              'Content-Type': 'application/json',
              'Connect-Protocol-Version': '1'
            },
            body: JSON.stringify(body)
          });
          if (!res.ok) continue;

          const raw = await res.json().catch(() => null);
          const extracted = extractFromGeneralSetting(raw);
          if (extracted.title || extracted.logoUrl) {
            return extracted;
          }
        } catch (_) {}
      }
    }

    const httpGetCandidates = [
      '/api/v1/instance/settings/GENERAL',
      '/api/v1/instance/settings/general',
      '/api/v1/instance/setting/GENERAL',
      '/api/v1/instance/setting/general'
    ];

    for (const ep of httpGetCandidates) {
      try {
        const res = await fetch(`${currentServerUrl}${ep}`, {
          headers: {
            'Authorization': `Bearer ${currentAccessToken}`
          }
        });
        if (!res.ok) continue;
        const raw = await res.json().catch(() => null);
        const extracted = extractFromGeneralSetting(raw);
        if (extracted.title || extracted.logoUrl) {
          return extracted;
        }
      } catch (_) {}
    }

    return { title: '', logoUrl: '' };
  }

  function applyWorkspaceBrandingToUI(title, logo) {
    const workspaceLogo = document.getElementById('workspace-logo');
    const normalizedTitle = String(title || '').trim() || getServerHostLabel();
    const normalizedLogo = resolveServerAssetUrl(logo);

    currentServerName = normalizedTitle;
    currentServerLogo = normalizedLogo;

    workspaceTitle.textContent = normalizedTitle;
    if (workspaceLogo) {
      if (normalizedLogo) {
        workspaceLogo.src = normalizedLogo;
        workspaceLogo.style.display = 'block';
      } else {
        workspaceLogo.style.display = 'none';
      }
    }

    if (railWorkspaceLogoWrap && railWorkspaceLogo) {
      if (normalizedLogo) {
        railWorkspaceLogo.src = normalizedLogo;
        railWorkspaceLogoWrap.classList.remove('hidden');
      } else {
        railWorkspaceLogo.removeAttribute('src');
        railWorkspaceLogoWrap.classList.add('hidden');
      }
      railWorkspaceLogoWrap.title = normalizedTitle ? `Servidor: ${normalizedTitle}` : 'Servidor';
    }

    if (serverInfoName) {
      serverInfoName.textContent = normalizedTitle || 'No disponible';
    }
    if (serverInfoLogo) {
      serverInfoLogo.textContent = normalizedLogo || 'No disponible';
    }

    if (serverLogoPreviewWrap && serverLogoPreview) {
      if (normalizedLogo) {
        serverLogoPreview.src = normalizedLogo;
        serverLogoPreviewWrap.classList.remove('hidden');
      } else {
        serverLogoPreview.removeAttribute('src');
        serverLogoPreviewWrap.classList.add('hidden');
      }
    }
  }

  function getRelativeTimeLabel(dateInput) {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) return 'hace un momento';

    const diffMs = Date.now() - date.getTime();
    const sec = Math.max(1, Math.floor(diffMs / 1000));
    if (sec < 60) return 'ahora';
    const min = Math.floor(sec / 60);
    if (min < 60) return `hace ${min} min`;
    const hours = Math.floor(min / 60);
    if (hours < 24) return `hace ${hours} h`;
    const days = Math.floor(hours / 24);
    return `hace ${days} d`;
  }

  function getExploreVisibilityIcon(visibility) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('aria-hidden', 'true');

    const add = (tag, attrs) => {
      const node = document.createElementNS(ns, tag);
      Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, String(v)));
      svg.appendChild(node);
    };

    if (visibility === 'PUBLIC') {
      add('circle', { cx: 12, cy: 12, r: 10, stroke: 'currentColor', 'stroke-width': 1.8 });
      add('line', { x1: 2, y1: 12, x2: 22, y2: 12, stroke: 'currentColor', 'stroke-width': 1.8 });
      add('path', { d: 'M12 2C14.5 4.7 16 8.2 16 12C16 15.8 14.5 19.3 12 22', stroke: 'currentColor', 'stroke-width': 1.8 });
      add('path', { d: 'M12 2C9.5 4.7 8 8.2 8 12C8 15.8 9.5 19.3 12 22', stroke: 'currentColor', 'stroke-width': 1.8 });
      return svg;
    }
    if (visibility === 'PROTECTED') {
      add('path', { d: 'M16 19V17.7C16 16.2 14.2 15 12 15C9.8 15 8 16.2 8 17.7V19', stroke: 'currentColor', 'stroke-width': 1.8, 'stroke-linecap': 'round' });
      add('circle', { cx: 12, cy: 10, r: 3, stroke: 'currentColor', 'stroke-width': 1.8 });
      add('path', { d: 'M20 19V17.9C20 16.9 19.1 16 18 15.6', stroke: 'currentColor', 'stroke-width': 1.8, 'stroke-linecap': 'round' });
      add('path', { d: 'M4 19V17.9C4 16.9 4.9 16 6 15.6', stroke: 'currentColor', 'stroke-width': 1.8, 'stroke-linecap': 'round' });
      return svg;
    }
    add('rect', { x: 5, y: 11, width: 14, height: 10, rx: 2, stroke: 'currentColor', 'stroke-width': 1.8 });
    add('path', { d: 'M8 11V8.2C8 6 9.8 4.2 12 4.2C14.2 4.2 16 6 16 8.2V11', stroke: 'currentColor', 'stroke-width': 1.8 });
    return svg;
  }

  function toMemoRef(memo) {
    if (!memo) return null;
    return memo.name || (memo.id ? `memos/${memo.id}` : null);
  }

  function toMemoId(memo) {
    const ref = toMemoRef(memo);
    if (!ref) return null;
    return String(ref).split('/').pop();
  }

  function extractMemoIdFromRef(value) {
    const raw = String(value || '').trim();
    if (!raw) return null;

    if (/^[A-Za-z0-9_-]{6,}$/.test(raw) && !raw.includes('/')) {
      return raw;
    }

    const m = raw.match(/(?:^|\/)memos\/([^\/?#]+)/i);
    if (m && m[1]) return m[1];

    return null;
  }

  function formatDateTime(dateInput) {
    const d = dateInput ? new Date(dateInput) : null;
    if (!d || Number.isNaN(d.getTime())) return '-';
    return d.toLocaleString();
  }

  function renderInlineMarkdown(text) {
    if (!text) return '';

    const protectedChunks = [];
    const protect = (source, pattern) => source.replace(pattern, (match) => {
      const token = `__HTML_CHUNK_${protectedChunks.length}__`;
      protectedChunks.push(match);
      return token;
    });

    let rendered = String(text);
    rendered = protect(rendered, /<div class="audio-container">[\s\S]*?<\/div>/g);
    rendered = protect(rendered, /<div class="task-row[\s\S]*?<\/div>/g);
    rendered = protect(rendered, /<div class="memo-attachments-box">[\s\S]*?<\/div><\/div>/g);
    rendered = protect(rendered, /<img [^>]+>/g);

    const fencedCodeChunks = [];
    rendered = rendered.replace(/```(?:([A-Za-z0-9_-]+)\n)?([\s\S]*?)```/g, (match, language, codeText) => {
      const token = `__FENCED_CODE_CHUNK_${fencedCodeChunks.length}__`;
      const langAttr = language ? ` data-lang="${language}"` : '';
      fencedCodeChunks.push(`<pre class="memo-code-block"><code${langAttr}>${codeText.replace(/^\n+|\n+$/g, '')}</code></pre>`);
      return token;
    });

    const codeChunks = [];
    rendered = rendered.replace(/`([^`]+)`/g, (match, codeText) => {
      const token = `__CODE_CHUNK_${codeChunks.length}__`;
      codeChunks.push(`<code>${codeText}</code>`);
      return token;
    });

    rendered = rendered.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    rendered = rendered.replace(/\*\*([^*\n][\s\S]*?[^*\n]|[^*\n])\*\*/g, '<strong>$1</strong>');
    rendered = rendered.replace(/(^|[^*])\*([^*\n][\s\S]*?[^*\n]|[^*\n])\*(?!\*)/g, '$1<em>$2</em>');
    rendered = rendered.replace(/^(#{1,4})\s+(.+)$/gm, (match, hashes, title) => {
      const level = Math.min(hashes.length, 4);
      return `<h${level}>${title.trim()}</h${level}>`;
    });
    rendered = rendered.replace(/(^|\n)((?:(?:&gt;|>)[^\n]*(?:\n|$))+)/g, (match, prefix, block) => {
      const content = block
        .trim()
        .split('\n')
        .map(line => line.replace(/^(?:&gt;|>)\s?/, ''))
        .join('<br>');
      return `${prefix}<blockquote>${content}</blockquote>`;
    });
    rendered = rendered.replace(/(^|\n)((?:- [^\n]+(?:\n|$))+)/g, (match, prefix, block) => {
      const items = block.trim().split('\n').map(line => `<li>${line.replace(/^- /, '')}</li>`).join('');
      return `${prefix}<ul>${items}</ul>`;
    });
    rendered = rendered.replace(/(^|\n)((?:\d+\. [^\n]+(?:\n|$))+)/g, (match, prefix, block) => {
      const items = block.trim().split('\n').map(line => `<li>${line.replace(/^\d+\. /, '')}</li>`).join('');
      return `${prefix}<ol>${items}</ol>`;
    });

    rendered = rendered.replace(/__FENCED_CODE_CHUNK_(\d+)__/g, (match, index) => fencedCodeChunks[Number(index)] || match);
    rendered = rendered.replace(/__CODE_CHUNK_(\d+)__/g, (match, index) => codeChunks[Number(index)] || match);
    rendered = rendered.replace(/__HTML_CHUNK_(\d+)__/g, (match, index) => protectedChunks[Number(index)] || match);

    return rendered;
  }

  function sanitizeRenderedHtmlToFragment(html) {
    const wrapperHtml = `<div>${String(html || '')}</div>`;
    const parsed = new DOMParser().parseFromString(wrapperHtml, 'text/html');
    const root = parsed.body && parsed.body.firstElementChild;
    if (!root) return document.createDocumentFragment();

    const allowedTags = new Set([
      'A', 'AUDIO', 'BLOCKQUOTE', 'BR', 'CODE', 'DIV', 'EM', 'H1', 'H2', 'H3', 'H4',
      'IMG', 'INPUT', 'LI', 'OL', 'P', 'PRE', 'SPAN', 'STRONG', 'TABLE', 'TBODY', 'TD',
      'TH', 'THEAD', 'TR', 'UL'
    ]);

    const allowedAttrs = new Set([
      'alt', 'checked', 'class', 'controls', 'data-filename', 'data-memo-id',
      'data-src', 'data-task-idx', 'href', 'rel', 'src', 'target', 'type'
    ]);

    const urlAttrs = new Set(['href', 'src', 'data-src']);
    const isSafeUrl = (value) => /^(https?:|data:|blob:|\/)/i.test(String(value || '').trim());

    const sanitizeNode = (node) => {
      if (!node) return;
      if (node.nodeType === Node.TEXT_NODE) return;
      if (node.nodeType !== Node.ELEMENT_NODE) {
        node.remove();
        return;
      }

      const tag = node.tagName.toUpperCase();
      if (!allowedTags.has(tag)) {
        const parent = node.parentNode;
        if (parent) {
          while (node.firstChild) {
            parent.insertBefore(node.firstChild, node);
          }
          node.remove();
        }
        return;
      }

      Array.from(node.attributes).forEach((attr) => {
        const name = attr.name.toLowerCase();
        const value = attr.value;
        const allowed = allowedAttrs.has(name) || name.startsWith('data-');
        if (!allowed) {
          node.removeAttribute(attr.name);
          return;
        }
        if (urlAttrs.has(name) && !isSafeUrl(value)) {
          node.removeAttribute(attr.name);
          return;
        }
        if (name === 'target' && value === '_blank') {
          node.setAttribute('rel', 'noopener noreferrer');
        }
      });

      Array.from(node.childNodes).forEach(sanitizeNode);
    };

    Array.from(root.childNodes).forEach(sanitizeNode);

    const fragment = document.createDocumentFragment();
    while (root.firstChild) {
      fragment.appendChild(root.firstChild);
    }
    return fragment;
  }

  function setPublicThreadReplyButtonLabel(isEditing) {
    if (!publicThreadReplyBtn) return;

    if (isEditing) {
      publicThreadReplyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path></svg><span>Actualizar comentario</span>';
      return;
    }

    publicThreadReplyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg><span>Publicar comentario</span>';
  }

  function insertQuotedReplyFromMemo(memo) {
    if (!publicThreadReplyInput || !memo) return;
    const source = String(memo.content || '').trim();
    if (!source) return;

    const quoteBlock = source.split(/\r?\n/).map(line => `> ${line}`).join('\n');
    const needsGap = publicThreadReplyInput.value.trim() ? '\n\n' : '';
    insertTextAtSelection(publicThreadReplyInput, `${needsGap}${quoteBlock}\n\n`);
  }

  setPublicThreadReplyButtonLabel(false);

  function closePublicPostDetail() {
    const publicList = document.getElementById('public-memos-list');
    const publicView = document.getElementById('view-public');
    activePublicThreadMemo = null;
    currentThreadAllComments = [];
    currentThreadVisibleCount = 0;
    editingThreadMemoId = null;
    if (publicThreadReplyInput) publicThreadReplyInput.value = '';
    if (publicThreadReplyStatus) publicThreadReplyStatus.textContent = '';
    setPublicThreadReplyButtonLabel(false);
    if (publicThreadCancelEditBtn) publicThreadCancelEditBtn.classList.add('hidden');
    if (publicPostLoadMoreBtn) publicPostLoadMoreBtn.classList.add('hidden');
    if (publicPostOverlay) {
      publicPostOverlay.classList.add('hidden');
      publicPostOverlay.classList.remove('thread-page-mode');
    }
    if (publicView) publicView.classList.remove('thread-page-view');
    if (publicList) publicList.classList.remove('hidden');
    if (openPublicPostTabBtn) openPublicPostTabBtn.classList.remove('hidden');

    if (isTabMode) {
      threadPageModeEnabled = false;
      pendingThreadMemoId = null;
      syncPublicThreadUrl(null);
    }
  }

  function startThreadCommentEdit(memo) {
    if (!memo || !publicThreadReplyInput) return;
    editingThreadMemoId = toMemoId(memo);
    publicThreadReplyInput.value = memo.content || '';
    publicThreadReplyInput.focus();
    setPublicThreadReplyButtonLabel(true);
    if (publicThreadCancelEditBtn) publicThreadCancelEditBtn.classList.remove('hidden');
    if (publicThreadReplyStatus) publicThreadReplyStatus.textContent = 'Editando comentario';
  }

  function cancelThreadCommentEdit() {
    editingThreadMemoId = null;
    if (publicThreadReplyInput) publicThreadReplyInput.value = '';
    setPublicThreadReplyButtonLabel(false);
    if (publicThreadCancelEditBtn) publicThreadCancelEditBtn.classList.add('hidden');
    if (publicThreadReplyStatus) publicThreadReplyStatus.textContent = '';
  }

  async function ensureMemoVisibilityPublic(memoLike) {
    const memoId = memoLike ? toMemoId(memoLike) : null;
    if (!memoId) return;

    const currentVisibility = String((memoLike.visibility || '')).toUpperCase();
    if (currentVisibility === 'PUBLIC') return;

    try {
      await fetch(`${currentServerUrl}/api/v1/memos/${memoId}?updateMask=visibility`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${currentAccessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ visibility: 'PUBLIC' })
      });
    } catch (e) {}
  }

  async function promoteLatestPrivateReplyToPublic(parentMemo) {
    const parentRef = toMemoRef(parentMemo);
    if (!parentRef || !currentUserId) return;

    let list = [];
    try {
      const res = await fetch(`${currentServerUrl}/api/v1/memos?pageSize=60`, {
        headers: { 'Authorization': `Bearer ${currentAccessToken}` }
      });
      if (!res.ok) return;
      const data = await res.json().catch(() => ({}));
      list = data.memos || [];
    } catch (e) {
      return;
    }

    const ownId = currentUserId.split('/').pop();
    const candidates = list
      .filter(m => {
        const creator = normalizeUserRef(m.creator);
        const creatorId = creator ? creator.split('/').pop() : null;
        const own = creator && (creator === currentUserId || creatorId === ownId);
        if (!own) return false;
        const isReply = isThreadReplyMemo(m);
        if (!isReply) return false;
        if (String((m.visibility || '')).toUpperCase() === 'PUBLIC') return false;

        const parentFields = [m.parent, m.parentMemo, m.parentName, m.parentMemoName, m.memo];
        if (parentFields.some(v => String(v || '') === parentRef)) return true;

        const rels = [...(m.relations || []), ...(m.relationList || [])];
        return rels.some(rel => {
          const target = rel.relatedMemo || rel.memo || rel.memoName || rel.target;
          return String(target || '') === parentRef;
        });
      })
      .sort((a, b) => {
        const ta = new Date(a.createTime || (a.createdTs ? a.createdTs * 1000 : 0)).getTime();
        const tb = new Date(b.createTime || (b.createdTs ? b.createdTs * 1000 : 0)).getTime();
        return tb - ta;
      });

    if (candidates.length > 0) {
      await ensureMemoVisibilityPublic(candidates[0]);
    }
  }

  async function updatePublicThreadComment(memoId, content) {
    if (!memoId) return false;
    const attempts = [
      async () => fetch(`${currentServerUrl}/api/v1/memos/${memoId}?updateMask=content,visibility`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${currentAccessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, visibility: 'PUBLIC' })
      }),
      async () => fetch(`${currentServerUrl}/api/v1/memos/${memoId}?updateMask=content`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${currentAccessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      })
    ];

    for (const attempt of attempts) {
      try {
        const res = await attempt();
        if (!res.ok) continue;
        await ensureMemoVisibilityPublic({ id: memoId, visibility: 'PRIVATE' });
        return true;
      } catch (e) {}
    }
    return false;
  }

  function extractCommentsFromList(parentMemoRef, list) {
    if (!Array.isArray(list) || !parentMemoRef) return [];
    return list.filter(item => {
      if (!item || typeof item !== 'object') return false;
      const parentFields = [item.parent, item.parentMemo, item.parentName, item.parentMemoName, item.memo];
      if (parentFields.some(v => String(v || '') === parentMemoRef)) return true;

      if (Array.isArray(item.relations)) {
        return item.relations.some(rel => {
          const relTarget = rel.relatedMemo || rel.memo || rel.memoName || rel.target;
          return String(relTarget || '') === parentMemoRef;
        });
      }
      return false;
    });
  }

  function getParentMemoRefFromMemo(memo) {
    if (!memo || typeof memo !== 'object') return null;
    const parentFields = [memo.parent, memo.parentMemo, memo.parentName, memo.parentMemoName, memo.memo];
    for (const field of parentFields) {
      const value = String(field || '').trim();
      if (value.startsWith('memos/')) return value;
    }

    const rels = [...(memo.relations || []), ...(memo.relationList || [])];
    for (const rel of rels) {
      const type = String(rel.type || rel.relationType || '').toUpperCase();
      if (!(type === 'COMMENT' || type === 'REPLY')) continue;
      const target = String(rel.relatedMemo || rel.memo || rel.memoName || rel.target || '').trim();
      if (target.startsWith('memos/')) return target;
    }
    return null;
  }

  function getParentMemoRefsLoose(memo) {
    if (!memo || typeof memo !== 'object') return [];

    const selfRef = toMemoRef(memo);
    const refs = new Set();

    const parentFields = [memo.parent, memo.parentMemo, memo.parentName, memo.parentMemoName, memo.memo, memo.parentId];
    parentFields.forEach(field => {
      const value = String(field || '').trim();
      if (!value) return;
      if (value.startsWith('memos/') || value.includes('/memos/')) {
        refs.add(value);
      } else if (/^[A-Za-z0-9_-]{10,}$/.test(value)) {
        refs.add(`memos/${value}`);
      }
    });

    const rels = [...(memo.relations || []), ...(memo.relationList || [])];
    rels.forEach(rel => {
      const possible = [rel.relatedMemo, rel.memo, rel.memoName, rel.target, rel.parentMemo, rel.parent];
      possible.forEach(raw => {
        const value = String(raw || '').trim();
        if (!value) return;
        if (value.startsWith('memos/') || value.includes('/memos/')) {
          refs.add(value);
        }
      });
    });

    if (selfRef) refs.delete(selfRef);
    return Array.from(refs);
  }

  function isThreadReplyMemo(memo) {
    if (!memo || typeof memo !== 'object') return false;
    return !!getParentMemoRefFromMemo(memo);
  }

  function renderPublicThreadCommentsPage() {
    if (!publicPostCommentsList || !publicPostCommentsCount) return;

    const visible = currentThreadAllComments.slice(0, currentThreadVisibleCount);
    publicPostCommentsCount.textContent = `Comentarios (${currentThreadAllComments.length})`;

    if (visible.length === 0) {
      publicPostCommentsList.innerHTML = '<div class="loading">No hay comentarios todavía.</div>';
    } else {
      renderMemos(visible, publicPostCommentsList, { readOnly: true, enableThreadEdit: true });
    }

    if (publicPostLoadMoreBtn) {
      const hasMore = currentThreadVisibleCount < currentThreadAllComments.length;
      publicPostLoadMoreBtn.classList.toggle('hidden', !hasMore);
    }
  }

  async function fetchPublicThreadComments(parentMemo) {
    const memoId = toMemoId(parentMemo);
    const memoRef = toMemoRef(parentMemo);
    if (!memoId || !memoRef) return [];

    try {
      const res = await fetch(`${currentServerUrl}/api/v1/memos/${memoId}/comments`, {
        headers: { 'Authorization': `Bearer ${currentAccessToken}` }
      });
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        const comments = data.comments || data.memos || data.replyList || [];
        if (Array.isArray(comments)) return comments;
      }
    } catch (e) {}

    try {
      const res = await fetch(`${currentServerUrl}/api/v1/memos?pageSize=200&filter=parent == "${memoRef}"`, {
        headers: { 'Authorization': `Bearer ${currentAccessToken}` }
      });
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        const comments = data.memos || data.comments || [];
        if (Array.isArray(comments)) return comments;
      }
    } catch (e) {}

    try {
      const res = await fetch(`${currentServerUrl}/api/v1/memos?pageSize=200`, {
        headers: { 'Authorization': `Bearer ${currentAccessToken}` }
      });
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        const list = data.memos || [];
        return extractCommentsFromList(memoRef, list);
      }
    } catch (e) {}

    return [];
  }

  async function loadPublicThreadComments(parentMemo) {
    if (!publicPostCommentsList || !publicPostCommentsCount) return;

    const comments = (await fetchPublicThreadComments(parentMemo)).filter(c => (c.visibility || '').toUpperCase() === 'PUBLIC');
    comments.sort((a, b) => {
      const ta = new Date(a.createTime || (a.createdTs ? a.createdTs * 1000 : 0)).getTime();
      const tb = new Date(b.createTime || (b.createdTs ? b.createdTs * 1000 : 0)).getTime();
      return ta - tb;
    });

    currentThreadAllComments = comments;
    currentThreadVisibleCount = Math.min(THREAD_PAGE_SIZE, currentThreadAllComments.length);

    const parentMemoId = toMemoId(parentMemo);
    if (parentMemoId) {
      publicThreadReplyCountCache.set(parentMemoId, currentThreadAllComments.length);
    }

    const parentMemoRef = toMemoRef(parentMemo);
    if (parentMemoRef) {
      updateExploreBadgeForMemoRef(parentMemoRef, currentThreadAllComments.length, false);
    }

    renderPublicThreadCommentsPage();
  }

  async function postPublicThreadComment(parentMemo, content) {
    const memoId = toMemoId(parentMemo);
    const memoRef = toMemoRef(parentMemo);
    if (!memoId || !memoRef) return false;

    const visibility = 'PUBLIC';
    const attempts = [
      async () => fetch(`${currentServerUrl}/api/v1/memos/${memoId}/comments`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${currentAccessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      }),
      async () => fetch(`${currentServerUrl}/api/v1/memos`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${currentAccessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, visibility, parent: memoRef })
      }),
      async () => fetch(`${currentServerUrl}/api/v1/memos`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${currentAccessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, visibility, parentId: memoId })
      }),
      async () => fetch(`${currentServerUrl}/api/v1/memos`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${currentAccessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, visibility, relationList: [{ relatedMemo: memoRef, type: 'COMMENT' }] })
      }),
      async () => fetch(`${currentServerUrl}/api/v1/memos`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${currentAccessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, visibility, relations: [{ memo: memoRef, type: 'COMMENT' }] })
      })
    ];

    for (const attempt of attempts) {
      try {
        const res = await attempt();
        if (!res.ok) continue;
        const raw = await res.json().catch(() => null);
        const created = raw && (raw.memo || raw.data || raw);
        if (created && typeof created === 'object') {
          await ensureMemoVisibilityPublic(created);
        } else {
          await promoteLatestPrivateReplyToPublic(parentMemo);
        }
        return true;
      } catch (e) {}
    }
    return false;
  }

  async function openPublicPostDetail(memo) {
    if (!memo || !publicPostOverlay || !publicPostParent) return;
    const publicList = document.getElementById('public-memos-list');
    const publicView = document.getElementById('view-public');

    activePublicThreadMemo = memo;
    cancelThreadCommentEdit();
    publicPostOverlay.classList.remove('hidden');

    if (threadPageModeEnabled) {
      publicPostOverlay.classList.add('thread-page-mode');
      if (publicView) publicView.classList.add('thread-page-view');
      if (publicList) publicList.classList.add('hidden');
      if (openPublicPostTabBtn) openPublicPostTabBtn.classList.add('hidden');
    } else {
      if (publicView) publicView.classList.remove('thread-page-view');
    }

    publicPostParent.innerHTML = '';
    if (publicPostCommentsList) publicPostCommentsList.innerHTML = '<div class="loading">Cargando comentarios...</div>';
    if (publicPostCommentsCount) publicPostCommentsCount.textContent = 'Comentarios (0)';
    if (publicPostLoadMoreBtn) publicPostLoadMoreBtn.classList.add('hidden');

    if (publicPostCreatedAt) publicPostCreatedAt.textContent = formatDateTime(memo.createTime || (memo.createdTs ? memo.createdTs * 1000 : null));
    if (publicPostUpdatedAt) publicPostUpdatedAt.textContent = formatDateTime(memo.updateTime || (memo.updatedTs ? memo.updatedTs * 1000 : null));

    renderMemos([memo], publicPostParent, { readOnly: true });
    await loadPublicThreadComments(memo);
  }

  function markPublicMemoRepliesAsSeen(memo) {
    const ref = toMemoRef(memo);
    if (!ref) return;

    publicReplyCountMemory.set(ref, Number(memo.__replyCount || 0));
    seenPublicThreadRefs.add(ref);

    if (Array.isArray(lastPublicMemos)) {
      lastPublicMemos = lastPublicMemos.map(m => {
        const same = toMemoRef(m) === ref;
        if (!same) return m;
        return Object.assign({}, m, { __hasNewReplies: false, __isSeen: true });
      });
    }

    const cards = document.querySelectorAll('.memo-card');
    cards.forEach(card => {
      if (card.getAttribute('data-memo-ref') !== ref) return;
      const badge = card.querySelector('.explore-reply-badge');
      if (!badge) return;
      badge.classList.remove('is-new');
      badge.classList.add('is-seen');
    });
  }

  function openThreadForMemo(memo) {
    const memoId = toMemoId(memo);
    if (!memoId) return;

    markPublicMemoRepliesAsSeen(memo);

    if (isTabMode) {
      pendingThreadMemoId = memoId;
      threadPageModeEnabled = true;
      syncPublicThreadUrl(memoId);
      openPublicPostDetail(memo);
      return;
    }

    chrome.tabs.create({ url: chrome.runtime.getURL(`popup.html?mode=tab&view=public&thread=${encodeURIComponent(memoId)}`) });
  }

  function updateExploreBadgeForMemoRef(memoRef, count, markAsNew = false) {
    if (!memoRef) return;

    const cards = document.querySelectorAll('.memo-card');
    cards.forEach(card => {
      if (card.getAttribute('data-memo-ref') !== memoRef) return;

      const badgeBtn = card.querySelector('.explore-reply-badge');
      if (!badgeBtn) return;

      const badgeLabel = badgeBtn.querySelector('span');
      if (badgeLabel) {
        badgeLabel.textContent = `${count} ${count === 1 ? 'respuesta' : 'respuestas'}`;
      }

      badgeBtn.classList.toggle('is-empty', count === 0);

      if (markAsNew) {
        badgeBtn.classList.add('is-new');
        badgeBtn.classList.remove('is-seen');
      }
    });
  }

  async function hydratePublicReplyCounts(memos, hydrationSeq) {
    if (!Array.isArray(memos) || memos.length === 0) return;

    // Hidrata primero los que el cálculo local dejó en 0.
    const targets = memos.filter(m => Number(m.__replyCount || 0) === 0).slice(0, 20);

    const MAX_CONCURRENT_HYDRATIONS = 3;
    let cursor = 0;

    async function processTarget(memo) {
      if (hydrationSeq !== publicReplyHydrationSeq) return;

      const memoId = toMemoId(memo);
      const memoRef = toMemoRef(memo);
      if (!memoId || !memoRef) return;

      let comments = [];
      try {
        comments = await fetchPublicThreadComments(memo);
      } catch (e) {
        return;
      }

      if (hydrationSeq !== publicReplyHydrationSeq) return;

      const publicCount = comments.filter(c => String((c && c.visibility) || '').toUpperCase() === 'PUBLIC').length;
      const prevCached = Number(publicThreadReplyCountCache.get(memoId) || 0);
      const prevShown = Number(publicReplyCountMemory.get(memoRef) || 0);
      const nextCount = Math.max(publicCount, prevCached, prevShown);

      if (nextCount <= prevShown) return;

      publicThreadReplyCountCache.set(memoId, nextCount);
      publicReplyCountMemory.set(memoRef, nextCount);

      const shouldMarkAsNew = seenPublicThreadRefs.has(memoRef);
      if (shouldMarkAsNew) {
        seenPublicThreadRefs.delete(memoRef);
      }

      if (Array.isArray(lastPublicMemos)) {
        lastPublicMemos = lastPublicMemos.map(item => {
          if (toMemoRef(item) !== memoRef) return item;
          return Object.assign({}, item, {
            __replyCount: nextCount,
            __hasNewReplies: shouldMarkAsNew ? true : item.__hasNewReplies,
            __isSeen: shouldMarkAsNew ? false : item.__isSeen
          });
        });
      }

      updateExploreBadgeForMemoRef(memoRef, nextCount, shouldMarkAsNew);
    }

    async function worker() {
      while (true) {
        if (hydrationSeq !== publicReplyHydrationSeq) return;

        const index = cursor;
        cursor += 1;
        if (index >= targets.length) return;

        await processTarget(targets[index]);
      }
    }

    const workerCount = Math.min(MAX_CONCURRENT_HYDRATIONS, targets.length);
    await Promise.all(Array.from({ length: workerCount }, () => worker()));
  }

  function inferCurrentUserIdFromMemos(memos) {
    if (!Array.isArray(memos) || memos.length === 0) return null;

    // Solo PRIVATE es inequívocamente del usuario autenticado.
    // PROTECTED puede pertenecer a otros usuarios del espacio de trabajo.
    const privateLike = memos.find(m => {
      if (!m || !m.creator) return false;
      return String(m.visibility || '').toUpperCase() === 'PRIVATE';
    });
    if (privateLike) return normalizeUserRef(privateLike.creator);

    // Fallback: si todos tienen el mismo creator, usamos ese valor.
    const creators = new Set(memos.map(m => normalizeUserRef(m && m.creator)).filter(Boolean));
    if (creators.size === 1) return Array.from(creators)[0];

    return null;
  }

  async function probeCurrentUserIdByCreateDelete() {
    const probeContent = `<!-- memos-ext-probe:${Date.now()} -->`;
    let createdMemo = null;

    try {
      const createRes = await fetch(`${currentServerUrl}/api/v1/memos`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${currentAccessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: probeContent, visibility: 'PRIVATE' })
      });

      if (!createRes.ok) return null;
      const rawCreated = await createRes.json().catch(() => null);
      createdMemo = rawCreated && (rawCreated.data || rawCreated);
      if (!createdMemo) return null;

      const creator = normalizeUserRef(createdMemo.creator);
      return creator || null;
    } catch (e) {
      return null;
    } finally {
      const rawName = createdMemo && (createdMemo.name || createdMemo.id);
      if (!rawName) return;

      const memoName = String(rawName).trim();
      if (!memoName) return;

      const memoId = memoName.includes('/') ? memoName.split('/').pop() : memoName;
      const cleanupTargets = [
        `${currentServerUrl}/api/v1/${encodeURI(memoName)}`,
        `${currentServerUrl}/api/v1/memos/${encodeURIComponent(memoId)}`
      ];

      for (const cleanupUrl of cleanupTargets) {
        try {
          const cleanupRes = await fetch(cleanupUrl, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${currentAccessToken}` }
          });
          if (cleanupRes.ok || cleanupRes.status === 404) {
            break;
          }
        } catch (cleanupErr) {
          continue;
        }
      }
    }
  }

  // Inicialización y Detección de Modo
  const urlParams = new URLSearchParams(window.location.search);
  const isTabMode = urlParams.get('mode') === 'tab';
  let pendingThreadMemoId = urlParams.get('thread') || null;
  let threadPageModeEnabled = isTabMode && !!pendingThreadMemoId;

  function syncPublicThreadUrl(threadId) {
    if (!isTabMode) return;
    const params = new URLSearchParams(window.location.search);
    params.set('mode', 'tab');
    params.set('view', 'public');
    if (threadId) {
      params.set('thread', threadId);
    } else {
      params.delete('thread');
    }
    const nextUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', nextUrl);
  }
  
  if (!isTabMode) {
    document.body.classList.add('is-popup');
  }

  // Cargar datos de nombre y logo guardados
  chrome.storage.local.get(['memosServerUrl', 'memosAccessToken'], (result) => {
    if (result.memosServerUrl && result.memosAccessToken) {
      currentServerUrl = result.memosServerUrl;
      currentAccessToken = result.memosAccessToken;
      currentServerName = '';
      currentServerLogo = '';
      showMemosView();
    } else {
      showLoginView();
    }
  });

  // Vistas
  function showLoginView() {
    currentUserId = null;
    clearCurrentUserRefCandidates();
    supportsServerCreatorFilter = null;
    allMemos = [];
    loginView.classList.remove('hidden');
    memosView.classList.add('hidden');
  }

  function showMemosView() {
    currentUserId = null;
    clearCurrentUserRefCandidates();
    supportsServerCreatorFilter = null;
    loginView.classList.add('hidden');
    memosView.classList.remove('hidden');
    
    // Cargar datos asíncronos en paralelo
    applyTranslations();
    applyBranding();
    fetchUserInfo().finally(() => {
      fetchMemos();
    });
    
    // Versión de la app
    if (appVersionEl) {
      appVersionEl.textContent = `v${chrome.runtime.getManifest().version}`;
    }

    const targetView = urlParams.get('view');
    if (targetView === 'public' || pendingThreadMemoId) {
      switchView('public');
    }
  }

  function resetUserAvatar() {
    userAvatarEl.style.backgroundImage = '';
    userAvatarEl.style.backgroundColor = '';
  }

  function applyUserProfileUI(userData) {
    if (!userData || typeof userData !== 'object') return;

    const name = getDisplayNameFromUserData(userData, 'Usuario');
    if (name) {
      userNameEl.textContent = name;
    }

    const avatar = resolveAvatarUrlFromUserData(userData);
    if (avatar) {
      userAvatarEl.style.backgroundImage = `url(${avatar})`;
      userAvatarEl.style.backgroundColor = 'transparent';
    } else {
      resetUserAvatar();
    }
  }

  async function fetchUserProfileByRef(userRef) {
    const normalizedRef = normalizeUserRef(userRef);
    if (!normalizedRef) return null;

    const idOnly = normalizedRef.split('/').pop();
    const candidates = [
      `/api/v1/${normalizedRef}`,
      `/api/v1/users/${idOnly}`,
      `/api/v1/user/${idOnly}`
    ];

    for (const path of candidates) {
      try {
        const res = await fetch(`${currentServerUrl}${path}`, {
          headers: { 'Authorization': `Bearer ${currentAccessToken}` }
        });
        if (!res.ok) continue;
        const raw = await res.json().catch(() => null);
        const data = raw && (raw.data || raw.user || raw);
        if (data && typeof data === 'object') {
          return data;
        }
      } catch (e) {}
    }

    return null;
  }

  async function resolveAuthorProfile(userRef) {
    const normalizedRef = normalizeUserRef(userRef) || String(userRef || '').trim();
    if (!normalizedRef) {
      return { name: 'Usuario', avatarUrl: '' };
    }

    if (authorProfileCache.has(normalizedRef)) {
      return authorProfileCache.get(normalizedRef);
    }

    const pending = (async () => {
      const data = await fetchUserProfileByRef(normalizedRef);
      const fallbackName = normalizedRef;
      if (!data) {
        return { name: fallbackName, avatarUrl: '' };
      }
      return {
        name: getDisplayNameFromUserData(data, fallbackName),
        avatarUrl: resolveAvatarUrlFromUserData(data)
      };
    })();

    authorProfileCache.set(normalizedRef, pending);
    return pending;
  }

  async function fetchUserInfo() {
    try {
      resetUserAvatar();

      // 1. Intentar obtener el usuario actual directamente (v0.22+)
      let userRes = await fetch(`${currentServerUrl}/api/v1/users/me`, {
        headers: { 'Authorization': `Bearer ${currentAccessToken}` }
      });
      
      let userData = null;
      if (userRes.ok) {
        const rawUserData = await userRes.json().catch(() => null);
        userData = rawUserData && (rawUserData.data || rawUserData.user || rawUserData);
      } else {
        // 2. Fallback para versiones anteriores: intentar /auth/status
        userRes = await fetch(`${currentServerUrl}/api/v1/auth/status`, {
          headers: { 'Authorization': `Bearer ${currentAccessToken}` }
        });
        if (userRes.ok) {
          const authData = await userRes.json();
          userData = authData.data || authData;
        } else {
          // 3. Fallback final: identificar creator actual desde memos con filtro users/me
          // Nota: no inferimos usuario desde memos SIN filtro porque puede mezclar creadores.
          const memoRes = await fetch(`${currentServerUrl}/api/v1/memos?pageSize=1&filter=creator == "users/me"`, {
            headers: { 'Authorization': `Bearer ${currentAccessToken}` }
          });

          if (memoRes.ok) {
            const memoData = await memoRes.json();
            const memos = memoData.memos || [];
            if (memos.length > 0) {
              const creator = memos[0].creator;
              setCurrentUserRef(creator);
              userRes = await fetch(`${currentServerUrl}/api/v1/${creator}`, {
                headers: { 'Authorization': `Bearer ${currentAccessToken}` }
              });
              if (userRes.ok) {
                const rawData = await userRes.json();
                userData = rawData.data || rawData;
              }
            }
          }
        }
      }

      if (!currentUserId) {
        const probedUser = await probeCurrentUserIdByCreateDelete();
        if (probedUser) {
          setCurrentUserRef(probedUser);
        }
      }

      if (!userData && currentUserId) {
        userData = await fetchUserProfileByRef(currentUserId);
      }

      if (userData) {
        const nestedUser = userData.user && typeof userData.user === 'object' ? userData.user : null;
        collectCurrentUserRefCandidates(
          userData.name,
          userData.username,
          userData.id,
          userData.userId,
          nestedUser && nestedUser.name,
          nestedUser && nestedUser.username,
          nestedUser && nestedUser.id,
          currentUserId
        );
        applyUserProfileUI(userData);
      } else if (currentUserId) {
        // Cuando no hay endpoint de perfil, mostramos el identificador real detectado del token.
        userNameEl.textContent = currentUserId;
      } else {
        userNameEl.textContent = 'Usuario no detectado';
      }
    } catch (e) { console.log('Error User Info', e); }
  }

  function applyBranding() {
    applyWorkspaceBrandingToUI(currentServerName, currentServerLogo);
    fetchWorkspaceInfo(false);
  }

  async function fetchWorkspaceInfo(force = false) {
    const cacheStillValid = Date.now() - brandingLastFetchTs < BRANDING_CACHE_TTL_MS;
    if (!force && cacheStillValid && currentServerName && currentServerLogo) {
      return;
    }
    if (brandingFetchInFlight) {
      return brandingFetchInFlight;
    }

    brandingFetchInFlight = (async () => {
    try {
      let title = '';
      let logoUrl = '';

      const connectCandidate = await fetchWorkspaceBrandingFromConnectRPC();
      if (connectCandidate.title) title = connectCandidate.title;
      if (connectCandidate.logoUrl) logoUrl = connectCandidate.logoUrl;

      const endpoints = [
        '/api/v1/workspace/settings/custom_profile',
        '/api/v1/workspace/profile',
        '/api/v1/workspaces/profile',
        '/api/v1/system/info'
      ];
      
      function findValueByKeys(obj, keyList) {
        if (!obj || typeof obj !== 'object') return '';
        const normalized = new Set((keyList || []).map(k => String(k).toLowerCase()));
        const stack = [obj];
        while (stack.length) {
          const node = stack.pop();
          if (!node || typeof node !== 'object') continue;
          for (const [key, value] of Object.entries(node)) {
            if (value && typeof value === 'string' && normalized.has(String(key).toLowerCase())) {
              const trimmed = value.trim();
              if (trimmed) return trimmed;
            }
            if (value && typeof value === 'object') stack.push(value);
          }
        }
        return '';
      }

      function looksLikeUrl(value) {
        const text = String(value || '').trim();
        if (!text) return false;
        return text.startsWith('http') || text.startsWith('/') || text.startsWith('assets/') || text.startsWith('resources/') || text.startsWith('logo/');
      }

      function extractBrandingCandidate(raw) {
        if (!raw || typeof raw !== 'object') return { title: '', logoUrl: '' };

        const titleCandidate = findValueByKeys(raw, [
          'title', 'workspaceTitle', 'workspace_title', 'displayName', 'display_name', 'siteName', 'site_name', 'instanceName', 'instance_name', 'name'
        ]);

        const logoCandidate = findValueByKeys(raw, [
          'logoUrl', 'logo_url', 'logo', 'iconUrl', 'icon_url', 'icon', 'avatarUrl', 'avatar_url'
        ]);

        const safeTitle = normalizeServerTitleCandidate(titleCandidate);
        const safeLogo = looksLikeUrl(logoCandidate) ? logoCandidate : '';
        return { title: safeTitle, logoUrl: safeLogo };
      }

      if (!title || !logoUrl) {
        for (const ep of endpoints) {
          try {
            const res = await fetch(`${currentServerUrl}${ep}`, {
              headers: { 'Authorization': `Bearer ${currentAccessToken}` }
            });
            if (res.ok) {
              const raw = await res.json();
              const candidate = extractBrandingCandidate(raw);
              if (!title && candidate.title) title = candidate.title;
              if (!logoUrl && candidate.logoUrl) logoUrl = candidate.logoUrl;
            }
          } catch (e) {}
        }
      }

      if (!title || !logoUrl) {
        const webCandidate = await fetchWorkspaceBrandingFromWeb();
        if (!title && webCandidate.title) title = webCandidate.title;
        if (!logoUrl && webCandidate.logoUrl) logoUrl = webCandidate.logoUrl;
      }

      applyWorkspaceBrandingToUI(title, logoUrl);
      brandingLastFetchTs = Date.now();
    } catch (e) { console.log('Error Workspace Info', e); }
    })().finally(() => {
      brandingFetchInFlight = null;
    });

    return brandingFetchInFlight;
  }

  // Login y Logout
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = serverUrlInput.value.trim().replace(/\/$/, '');
    const token = accessTokenInput.value.trim();

    try {
      // 1. Intentar validar contra el endpoint moderno (v0.22+)
      let response = await fetch(`${url}/api/v1/users/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      let userData = null;
      let hasValidAuth = false;
      if (response.ok) {
        const rawData = await response.json();
        userData = rawData.data || rawData;
        hasValidAuth = true;
      } else if (response.status === 404 || response.status === 405) {
        // 2. Fallback para versiones intermedias
        response = await fetch(`${url}/api/v1/auth/status`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const authData = await response.json();
          userData = authData.data || authData;
          hasValidAuth = true;
        } else {
          // 3. Fallback robusto: si el token puede leer memos, es válido
          const memoRes = await fetch(`${url}/api/v1/memos?pageSize=1`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (memoRes.ok) {
            const memoData = await memoRes.json().catch(() => ({}));
            if (memoData && (Array.isArray(memoData.memos) || typeof memoData.nextPageToken === 'string')) {
              hasValidAuth = true;
            }
          }
        }
      } else if (response.status !== 401 && response.status !== 403) {
        // 4. Para respuestas no autorizadas distintas a 401/403, probar memos como última opción
        const memoRes = await fetch(`${url}/api/v1/memos?pageSize=1`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (memoRes.ok) {
          const memoData = await memoRes.json().catch(() => ({}));
          if (memoData && (Array.isArray(memoData.memos) || typeof memoData.nextPageToken === 'string')) {
            hasValidAuth = true;
          }
        }
      }

      // Si alguno de los endpoints respondió de forma compatible, aceptamos autenticación
      if (!hasValidAuth && (!userData || typeof userData !== 'object')) {
        throw new Error('Token inválido o servidor no compatible');
      }

      chrome.storage.local.set({
        memosServerUrl: url,
        memosAccessToken: token
      }, () => {
        currentServerUrl = url;
        currentAccessToken = token;
        currentServerName = '';
        currentServerLogo = '';
        loginError.classList.add('hidden');
        showMemosView();
      });
    } catch (error) {
      loginError.classList.remove('hidden');
      loginError.textContent = 'Error al conectar. Verifica URL y Token.';
    }
  });

  // NAVEGACIÓN ENTRE VISTAS (NAV RAIL)
  function switchView(viewId) {
    // 1. Update Rail Icons
    railItems.forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-view') === viewId);
    });

    // 2. Show/Hide Views
    mainViews.forEach(view => {
      view.classList.toggle('hidden', view.id !== `view-${viewId}`);
    });

    // 3. Sidebar handling
    if (viewId === 'home') {
      mainSidebar.classList.remove('hidden');
    } else {
      mainSidebar.classList.add('hidden');
      mainSidebar.classList.remove('active'); 
      if (sidebarOverlay) sidebarOverlay.classList.remove('active');
    }

    // 4. Specific View Logic
    if (viewId === 'public') {
      fetchPublicMemos();
    } else if (viewId === 'settings') {
      loadSettingsView();
    }
  }

  railItems.forEach(item => {
    item.addEventListener('click', () => {
      switchView(item.getAttribute('data-view'));
    });
  });

  // SISTEMA DE PESTAÑAS (SETTINGS)
  tabItems.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      tabItems.forEach(t => t.classList.toggle('active', t === tab));
      tabContents.forEach(c => c.classList.toggle('hidden', c.id !== `tab-${target}`));
    });
  });

  function loadSettingsView() {
    settingsUserInfo.textContent = `${userNameEl.textContent} (${currentServerUrl})`;
    if (serverInfoName) serverInfoName.textContent = currentServerName || 'No disponible';
    if (serverInfoLogo) serverInfoLogo.textContent = currentServerLogo || 'No disponible';
    fetchWorkspaceInfo(false);
    
    chrome.storage.local.get(['memosLanguage'], (result) => {
      if (result.memosLanguage) setLanguage.value = result.memosLanguage;
    });
  }

  settingsLogoutBtn.addEventListener('click', () => logoutBtn.click());

  if (railLogoutBtn) {
    railLogoutBtn.addEventListener('click', () => logoutBtn.click());
  }

  if (sidebarToggleBtn) {
    sidebarToggleBtn.addEventListener('click', () => {
      mainSidebar.classList.toggle('active');
      if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      mainSidebar.classList.remove('active');
      sidebarOverlay.classList.remove('active');
    });
  }

  goDebugBtn.addEventListener('click', () => {
    window.open('debug.html', '_blank');
  });

  if (helpGoDebugBtn) {
    helpGoDebugBtn.addEventListener('click', () => {
      window.open('debug.html', '_blank');
    });
  }

  if (closePublicPostBtn) {
    closePublicPostBtn.addEventListener('click', closePublicPostDetail);
  }
  if (publicPostBackdrop) {
    publicPostBackdrop.addEventListener('click', closePublicPostDetail);
  }
  if (publicPostLoadMoreBtn) {
    publicPostLoadMoreBtn.addEventListener('click', () => {
      currentThreadVisibleCount = Math.min(currentThreadVisibleCount + THREAD_PAGE_SIZE, currentThreadAllComments.length);
      renderPublicThreadCommentsPage();
    });
  }
  if (openPublicPostTabBtn) {
    openPublicPostTabBtn.addEventListener('click', () => {
      if (!activePublicThreadMemo) return;
      const memoId = toMemoId(activePublicThreadMemo);
      if (!memoId) return;
      chrome.tabs.create({ url: chrome.runtime.getURL(`popup.html?mode=tab&view=public&thread=${encodeURIComponent(memoId)}`) });
    });
  }
  if (publicThreadReplyBtn) {
    publicThreadReplyBtn.addEventListener('click', async () => {
      if (!activePublicThreadMemo || !publicThreadReplyInput) return;
      const content = publicThreadReplyInput.value.trim();
      if (!content) return;
      const wasEditing = !!editingThreadMemoId;

      publicThreadReplyBtn.disabled = true;
      if (publicThreadReplyStatus) publicThreadReplyStatus.textContent = wasEditing ? 'Actualizando...' : 'Publicando...';
      const ok = wasEditing
        ? await updatePublicThreadComment(editingThreadMemoId, content)
        : await postPublicThreadComment(activePublicThreadMemo, content);
      if (!ok) {
        if (publicThreadReplyStatus) publicThreadReplyStatus.textContent = wasEditing ? 'No se pudo actualizar el comentario.' : 'No se pudo publicar el comentario.';
        publicThreadReplyBtn.disabled = false;
        return;
      }

      cancelThreadCommentEdit();
      if (publicThreadReplyStatus) publicThreadReplyStatus.textContent = wasEditing ? 'Comentario actualizado.' : 'Comentario publicado.';
      await loadPublicThreadComments(activePublicThreadMemo);
      fetchPublicMemos();
      publicThreadReplyBtn.disabled = false;
      setTimeout(() => {
        if (publicThreadReplyStatus) publicThreadReplyStatus.textContent = '';
      }, 1800);
    });
  }

  if (publicThreadCancelEditBtn) {
    publicThreadCancelEditBtn.addEventListener('click', cancelThreadCommentEdit);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && publicPostOverlay && !publicPostOverlay.classList.contains('hidden')) {
      closePublicPostDetail();
    }
  });

  setLanguage.addEventListener('change', () => {
    const lang = setLanguage.value;
    chrome.storage.local.set({ memosLanguage: lang }, () => {
      applyTranslations();
      console.log('Idioma cambiado a:', lang);
    });
  });

  // VISTA PÚBLICA (EXPLORAR)
  async function fetchPublicMemos() {
    const publicList = document.getElementById('public-memos-list');
    publicList.innerHTML = '<div class="loading">Cargando comunidad...</div>';
    
    try {
      // En Explorar mostramos solo mensajes PUBLIC.
      const res = await fetch(`${currentServerUrl}/api/v1/memos?pageSize=300`, {
        headers: { 'Authorization': `Bearer ${currentAccessToken}` }
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      const allFetchedMemos = data.memos || [];
      const publicMemos = allFetchedMemos
        .filter(m => String((m.visibility || '')).toUpperCase() === 'PUBLIC');

      const replyCountByParent = new Map();
      const rootMemoIds = new Set(publicMemos.map(m => toMemoId(m)).filter(Boolean));

      allFetchedMemos.forEach(m => {
        const candidateId = toMemoId(m);
        const parentRefs = getParentMemoRefsLoose(m);
        if (!parentRefs.length) return;

        parentRefs.forEach(parentRef => {
          const parentId = extractMemoIdFromRef(parentRef);
          if (!parentId || !rootMemoIds.has(parentId)) return;
          if (candidateId && candidateId === parentId) return;
          replyCountByParent.set(parentId, (replyCountByParent.get(parentId) || 0) + 1);
        });
      });

      const memos = publicMemos
        .filter(m => !isThreadReplyMemo(m))
        .map(m => {
          const ref = toMemoRef(m);
          const memoId = toMemoId(m);
          const countedReplyCount = memoId ? (replyCountByParent.get(memoId) || 0) : 0;
          const cachedThreadCount = memoId ? (publicThreadReplyCountCache.get(memoId) || 0) : 0;
          const replyCount = Math.max(countedReplyCount, cachedThreadCount);
          const prevCount = publicReplyCountMemory.get(ref);
          const hasNewReplies = prevCount !== undefined && replyCount > prevCount;
          if (hasNewReplies && ref) {
            seenPublicThreadRefs.delete(ref);
          }
          const isSeen = !!(ref && seenPublicThreadRefs.has(ref));
          return Object.assign({}, m, { __replyCount: replyCount, __hasNewReplies: hasNewReplies, __isSeen: isSeen });
        })
        .sort((a, b) => {
          const ta = new Date(a.createTime || (a.createdTs ? a.createdTs * 1000 : 0)).getTime();
          const tb = new Date(b.createTime || (b.createdTs ? b.createdTs * 1000 : 0)).getTime();
          return tb - ta;
        });

      lastPublicMemos = memos;

      memos.forEach(m => {
        const ref = toMemoRef(m);
        if (ref) publicReplyCountMemory.set(ref, Number(m.__replyCount || 0));
      });
      
      renderMemos(memos, publicList, { readOnly: true, openThreadOnClick: true, emptyText: 'No hay memos públicos.' });

      publicReplyHydrationSeq += 1;
      hydratePublicReplyCounts(memos, publicReplyHydrationSeq);

      if (pendingThreadMemoId) {
        const pendingMemo = memos.find(m => toMemoId(m) === pendingThreadMemoId);
        if (pendingMemo) {
          openPublicPostDetail(pendingMemo);
          pendingThreadMemoId = null;
        }
      }
    } catch (e) {
      publicList.innerHTML = '<div class="error-msg">No se pudieron cargar los memos públicos.</div>';
    }
  }

  logoutBtn.addEventListener('click', () => {
    chrome.storage.local.remove(['memosServerUrl', 'memosAccessToken', 'memosServerName', 'memosServerLogo'], () => {
      currentServerUrl = '';
      currentAccessToken = '';
      currentServerName = '';
      currentServerLogo = '';
      brandingLastFetchTs = 0;
      brandingFetchInFlight = null;
      currentUserId = null;
      supportsServerCreatorFilter = null;
      allMemos = [];
      publicReplyCountMemory.clear();
      seenPublicThreadRefs.clear();
      serverUrlInput.value = '';
      accessTokenInput.value = '';
      showLoginView();
    });
  });

  // Expandir a pestaña independiente
  if (expandBtn) {
    expandBtn.addEventListener('click', () => {
      chrome.tabs.create({ url: chrome.runtime.getURL("popup.html?mode=tab") });
    });
  }

  // Buscador y Etiquetas en vivo
  searchInput.addEventListener('input', (e) => {
    currentFilterQuery = e.target.value.toLowerCase();
    applyFilters();
    if (currentFilterQuery) clearSearchBtn.classList.remove('hidden');
    else clearSearchBtn.classList.add('hidden');
  });

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      currentFilterQuery = '';
      applyFilters();
      clearSearchBtn.classList.add('hidden');
    });
  }

  function extractTags(memos) {
    const tagRegex = /#([\w\u00C0-\u017F]+)/g;
    const tags = new Set();
    memos.forEach(m => {
      let match;
      while ((match = tagRegex.exec(m.content)) !== null) {
        tags.add(match[0]);
      }
    });
    
    tagsListEl.innerHTML = '';
    if (tags.size === 0) {
      tagsListEl.innerHTML = '<span style="color:var(--text-muted);font-size:12px">No hay etiquetas</span>';
      return;
    }
    
    tags.forEach(tag => {
      const div = document.createElement('div');
      div.className = 'tag-item';
      div.textContent = tag;
      div.onclick = () => {
        searchInput.value = tag;
        currentFilterQuery = tag.toLowerCase();
        applyFilters();
        clearSearchBtn.classList.remove('hidden');
      };
      tagsListEl.appendChild(div);
    });
  }

  function applyFilters() {
    const cards = memosList.querySelectorAll('.memo-card');
    cards.forEach(card => {
      const text = card.getAttribute('data-content').toLowerCase();
      const date = card.getAttribute('data-date');
      const visibility = card.getAttribute('data-visibility');
      
      const matchesQuery = !currentFilterQuery || text.includes(currentFilterQuery);
      const matchesDate = !currentFilterDate || date === currentFilterDate;
      const matchesVisibility = currentFilterVisibility === 'ALL' || visibility === currentFilterVisibility;
      
      if (matchesQuery && matchesDate && matchesVisibility) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  // --- LOGICA DE CALENDARIO ---
  if (prevMonthBtn && nextMonthBtn) {
    prevMonthBtn.addEventListener('click', () => {
      calendarCurrentDate.setMonth(calendarCurrentDate.getMonth() - 1);
      renderCalendar(allMemos);
    });
    nextMonthBtn.addEventListener('click', () => {
      calendarCurrentDate.setMonth(calendarCurrentDate.getMonth() + 1);
      renderCalendar(allMemos);
    });
  }

  if (clearCalendarBtn) {
    clearCalendarBtn.addEventListener('click', () => {
      currentFilterDate = '';
      clearCalendarBtn.classList.add('hidden');
      renderCalendar(allMemos);
      applyFilters();
    });
  }

  function getMemoDates(memos) {
    const dates = new Set();
    memos.forEach(m => {
      const ts = m.createTime ? new Date(m.createTime) : new Date(m.createdTs * 1000);
      const ds = ts.getFullYear() + '-' + String(ts.getMonth()+1).padStart(2, '0') + '-' + String(ts.getDate()).padStart(2, '0');
      dates.add(ds);
    });
    return dates;
  }

  function renderCalendar(memos) {
    if (!calendarGrid) return;
    const memoDates = getMemoDates(memos);
    
    const year = calendarCurrentDate.getFullYear();
    const month = calendarCurrentDate.getMonth();
    
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    if (calendarMonthYear) {
      calendarMonthYear.textContent = `${monthNames[month]} ${year}`;
    }
    
    calendarGrid.innerHTML = '';
    
    const firstDay = new Date(year, month, 1).getDay();
    const startDay = firstDay === 0 ? 6 : firstDay - 1; 
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Celdas vacías
    for (let i = 0; i < startDay; i++) {
      const div = document.createElement('div');
      div.className = 'calendar-day empty';
      calendarGrid.appendChild(div);
    }
    
    // Días del mes
    for (let i = 1; i <= daysInMonth; i++) {
      const div = document.createElement('div');
      div.className = 'calendar-day';
      div.textContent = i;
      
      const ds = year + '-' + String(month+1).padStart(2, '0') + '-' + String(i).padStart(2, '0');
      
      if (memoDates.has(ds)) {
        div.classList.add('has-memos');
      }
      if (currentFilterDate === ds) {
        div.classList.add('selected');
      }
      
      div.onclick = () => {
        if (currentFilterDate === ds) {
          currentFilterDate = ''; 
          div.classList.remove('selected');
          if (clearCalendarBtn) clearCalendarBtn.classList.add('hidden');
        } else {
          currentFilterDate = ds;
          if (clearCalendarBtn) clearCalendarBtn.classList.remove('hidden');
          renderCalendar(memos); 
        }
        applyFilters();
      };
      
      calendarGrid.appendChild(div);
    }
  }

  // Barra de Formato
  formatBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.id === 'attach-img-btn') return;
      e.preventDefault();
      insertFormat(memoInput, btn.dataset.format);
    });
  });

  publicThreadFormatBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!publicThreadReplyInput) return;
      e.preventDefault();
      insertFormat(publicThreadReplyInput, btn.dataset.format);
    });
  });

  function insertFormat(targetInput, format) {
    if (!targetInput) return;

    const start = targetInput.selectionStart;
    const end = targetInput.selectionEnd;
    const text = targetInput.value;
    const selected = text.substring(start, end);
    let replacement = '';

    if (format === 'heading') replacement = `\n## ${selected || 'Titulo'}\n`;
    else if (format === 'quote') replacement = `\n> ${selected || 'Cita'}\n`;
    else if (format === 'bold') replacement = `**${selected || 'texto'}**`;
    else if (format === 'italic') replacement = `*${selected || 'texto'}*`;
    else if (format === 'code') replacement = `\`${selected || 'código'}\``;
    else if (format === 'list') replacement = `\n- ${selected}`;
    else if (format === 'olist') replacement = `\n1. ${selected || 'Elemento'}`;
    else if (format === 'todo') replacement = `\n- [ ] ${selected || 'Tarea'}`;
    else if (format === 'codeblock') replacement = `\n\`\`\`\n${selected || 'código'}\n\`\`\`\n`;
    else if (format === 'table') replacement = `\n| Col1 | Col2 |\n| ---- | ---- |\n| ${selected || 'Valor'} |      |\n`;

    targetInput.value = text.substring(0, start) + replacement + text.substring(end);
    targetInput.focus();
    targetInput.selectionStart = start + replacement.length;
    targetInput.selectionEnd = start + replacement.length;
  }

  function toggleListPrefix(targetInput, remove = false) {
    if (!targetInput) return;

    const text = targetInput.value;
    const start = targetInput.selectionStart;
    const end = targetInput.selectionEnd;
    const lineStart = text.lastIndexOf('\n', Math.max(0, start - 1)) + 1;
    let lineEnd = text.indexOf('\n', end);
    if (lineEnd === -1) lineEnd = text.length;

    const block = text.slice(lineStart, lineEnd);
    const lines = block.split('\n');
    const updatedLines = lines.map(line => {
      if (remove) {
        if (line.startsWith('- [ ] ')) return line.slice(6);
        if (line.startsWith('- ')) return line.slice(2);
        return line;
      }
      if (!line.trim()) return '- ';
      if (line.startsWith('- ')) return line;
      return `- ${line}`;
    });

    const replacement = updatedLines.join('\n');
    targetInput.value = text.slice(0, lineStart) + replacement + text.slice(lineEnd);
    targetInput.focus();
    targetInput.selectionStart = lineStart;
    targetInput.selectionEnd = lineStart + replacement.length;
  }

  function toggleOrderedListPrefix(targetInput, remove = false) {
    if (!targetInput) return;

    const text = targetInput.value;
    const start = targetInput.selectionStart;
    const end = targetInput.selectionEnd;
    const lineStart = text.lastIndexOf('\n', Math.max(0, start - 1)) + 1;
    let lineEnd = text.indexOf('\n', end);
    if (lineEnd === -1) lineEnd = text.length;

    const block = text.slice(lineStart, lineEnd);
    const lines = block.split('\n');
    const updatedLines = lines.map((line, index) => {
      if (remove) {
        return line.replace(/^\d+\.\s+/, '');
      }
      if (!line.trim()) return `${index + 1}. `;
      if (/^\d+\.\s+/.test(line)) return line;
      return `${index + 1}. ${line}`;
    });

    const replacement = updatedLines.join('\n');
    targetInput.value = text.slice(0, lineStart) + replacement + text.slice(lineEnd);
    targetInput.focus();
    targetInput.selectionStart = lineStart;
    targetInput.selectionEnd = lineStart + replacement.length;
  }

  function handleEditorShortcut(targetInput, e, submitAction) {
    if (!targetInput) return false;

    const isMod = e.ctrlKey || e.metaKey;
    if (isMod && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      insertFormat(targetInput, 'bold');
      return true;
    }

    if (isMod && e.key.toLowerCase() === 'i') {
      e.preventDefault();
      insertFormat(targetInput, 'italic');
      return true;
    }

    if (isMod && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const selected = targetInput.value.substring(targetInput.selectionStart, targetInput.selectionEnd).trim();
      const label = selected || 'enlace';
      insertTextAtSelection(targetInput, `[${label}](https://)`);
      return true;
    }

    if (isMod && e.shiftKey && e.key === '7') {
      e.preventDefault();
      toggleListPrefix(targetInput, false);
      return true;
    }

    if (isMod && e.shiftKey && e.key === '8') {
      e.preventDefault();
      insertFormat(targetInput, 'todo');
      return true;
    }

    if (isMod && e.shiftKey && e.key === '9') {
      e.preventDefault();
      toggleOrderedListPrefix(targetInput, false);
      return true;
    }

    if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      insertFormat(targetInput, 'codeblock');
      return true;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      toggleListPrefix(targetInput, e.shiftKey);
      return true;
    }

    if (e.key === 'Enter' && (e.altKey || e.ctrlKey) && typeof submitAction === 'function') {
      e.preventDefault();
      submitAction();
      return true;
    }

    return false;
  }

  function insertTextAtSelection(targetInput, replacement) {
    if (!targetInput) return;
    const start = targetInput.selectionStart;
    const end = targetInput.selectionEnd;
    const text = targetInput.value;
    targetInput.value = text.substring(0, start) + replacement + text.substring(end);
    targetInput.focus();
    targetInput.selectionStart = start;
    targetInput.selectionEnd = start + replacement.length;
  }

  // Atajos de teclado en el editor
  memoInput.addEventListener('keydown', (e) => {
    handleEditorShortcut(memoInput, e, () => saveMemoBtn.click());
  });

  if (publicThreadReplyInput) {
    publicThreadReplyInput.addEventListener('keydown', (e) => {
      handleEditorShortcut(publicThreadReplyInput, e, () => {
        if (publicThreadReplyBtn) publicThreadReplyBtn.click();
      });
    });
  }

  // --- LÓGICA DE SUBIDA DE RECURSOS (Imágenes, Archivos, Audio) ---
  async function uploadGenericResource(file) {
    editorStatus.textContent = 'Subiendo...';
    
    // Preparar Base64 para posibles fallbacks
    const base64Promise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });
    const base64String = await base64Promise;

    // Estrategia: Intentar múltiples métodos hasta que uno funcione
    const attempts = [
      // 1. API V1 moderna (JSON + Base64) - Recomendado para v0.22+
      async () => {
        const res = await fetch(`${currentServerUrl}/api/v1/attachments`, {
          method: 'POST', 
          headers: { 'Authorization': `Bearer ${currentAccessToken}`, 'Content-Type': 'application/json' }, 
          body: JSON.stringify({ filename: file.name, type: file.type || 'application/octet-stream', content: base64String })
        });
        if (!res.ok) throw new Error();
        return await res.json();
      },
      // 2. API V1 moderna (Multipart/FormData) - resources (plural)
      async () => {
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch(`${currentServerUrl}/api/v1/resources`, {
          method: 'POST', headers: { 'Authorization': `Bearer ${currentAccessToken}` }, body: fd
        });
        if (!res.ok) throw new Error();
        return await res.json();
      },
      // 3. API V1 antigua (Multipart/FormData) - resource (singular)
      async () => {
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch(`${currentServerUrl}/api/v1/resource`, {
          method: 'POST', headers: { 'Authorization': `Bearer ${currentAccessToken}` }, body: fd
        });
        if (!res.ok) throw new Error();
        return await res.json();
      }
    ];

    for (const attempt of attempts) {
      try {
        const data = await attempt();
        const result = data.data || data;
        if (result.name || result.id) {
          editorStatus.textContent = 'Subido';
          setTimeout(() => editorStatus.textContent = '', 2000);
          return result;
        }
      } catch (e) { continue; }
    }

    editorStatus.textContent = 'Error al subir';
    return null;
  }

  function insertResourceInEditor(file, resource) {
    const resourceName = resource.name || `resources/${resource.id}`;
    const idPart = resourceName.split('/').pop();
    const encodedFilename = encodeURIComponent(file.name);
    const attachmentRef = normalizeAttachmentReference(Object.assign({}, resource, { name: resourceName, filename: resource.filename || file.name, type: resource.type || file.type, size: resource.size || file.size }), file);
    if (attachmentRef) {
      pendingMemoAttachments = mergeAttachmentReferences(pendingMemoAttachments, [attachmentRef]);
    }
    
    // Memos modernos usan /file/{resourceName}/{filename}. Antiguos /o/r/{id}/{filename}
    let resourceUrl = '';
    if (resourceName.includes('resources/') || resourceName.includes('attachments/')) {
      resourceUrl = `${currentServerUrl}/file/${resourceName}/${encodedFilename}`;
    } else {
      resourceUrl = `${currentServerUrl}/o/r/${idPart}/${encodedFilename}`;
    }

    const isImage = file.type.startsWith('image/');
    const isAudio = file.type.includes('audio') || file.name.match(/\.(webm|mp3|wav|ogg|m4a)$/i);
    
    // Todos los recursos se insertan como markdown para asegurar vinculación en el servidor
    let markdown = '';
    if (isImage) {
      markdown = `\n![${file.name}](${resourceUrl})\n`;
    } else if (isAudio) {
      markdown = `\n[audio](${resourceUrl})\n`;
    } else {
      markdown = `\n[file](${resourceUrl})\n`; // Usamos [file] para distinguir adjuntos
    }

    const start = memoInput.selectionStart;
    const end = memoInput.selectionEnd;
    memoInput.value = memoInput.value.substring(0, start) + markdown + memoInput.value.substring(end);
    memoInput.focus();
  }

  // Eliminar UI de adjuntos pendientes ya que ahora van al texto
  function renderPendingAttachments() {
    const listEl = document.getElementById('editor-attachments-list');
    if (listEl) listEl.classList.add('hidden');
  }

  // Handlers para botones de adjuntos
  if (attachImgBtn) {
    attachImgBtn.addEventListener('click', (e) => { e.preventDefault(); imageUpload.click(); });
  }
  if (attachFileBtn) {
    attachFileBtn.addEventListener('click', (e) => { e.preventDefault(); fileUpload.click(); });
  }

  if (imageUpload) {
    imageUpload.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const result = await uploadGenericResource(file);
      if (result) insertResourceInEditor(file, result);
    });
  }

  if (fileUpload) {
    fileUpload.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const result = await uploadGenericResource(file);
      if (result) insertResourceInEditor(file, result);
    });
  }

  // Fetch Memos
  async function fetchMemos() {
    memosList.innerHTML = '<div class="loading">Cargando notas...</div>';
    try {
      // 1. Si el servidor soporta filtro creator==users/me, usarlo.
      // 2. Si no lo soporta, usar listado base sin mostrar warnings repetitivos.
      let response;
      let usedServerSideCreatorFilter = false;
      let prefetchedMemos = null;
      if (supportsServerCreatorFilter !== false) {
        const creatorFilters = buildCurrentUserMemoFilters();
        for (const filter of creatorFilters) {
          const filteredRes = await fetch(`${currentServerUrl}/api/v1/memos?pageSize=100&filter=${encodeURIComponent(filter)}`, {
            headers: { 'Authorization': `Bearer ${currentAccessToken}` }
          });

          if (filteredRes.ok) {
            supportsServerCreatorFilter = true;
            const filteredData = await filteredRes.json().catch(() => null);
            const filteredMemos = (filteredData && filteredData.memos) || [];

            // Algunas instancias responden 200 para users/me pero con lista vacía.
            // Solo aceptamos este filtro si realmente devolvió memos.
            if (filteredMemos.length > 0) {
              response = filteredRes;
              prefetchedMemos = filteredMemos;
              usedServerSideCreatorFilter = true;
              break;
            }

            continue;
          }

          if (filteredRes.status === 400 || filteredRes.status === 404 || filteredRes.status === 405) {
            supportsServerCreatorFilter = false;
            response = null;
            break;
          }
        }
      }

      if (!response || !response.ok) {
        response = await fetch(`${currentServerUrl}/api/v1/memos?pageSize=100`, {
          headers: { 'Authorization': `Bearer ${currentAccessToken}` }
        });
      }

      if (!response.ok) {
        if (response.status === 401) { logoutBtn.click(); return; }
        throw new Error('Error al cargar memos');
      }

      const data = prefetchedMemos ? null : await response.json();
      let memos = prefetchedMemos || ((data && data.memos) || []);

      if (!currentUserId) {
        const inferredUserRef = inferCurrentUserIdFromMemos(memos);
        if (inferredUserRef) {
          setCurrentUserRef(inferredUserRef);
        }
      }

      // Si el backend ya filtró por el usuario actual, podemos usar ese resultado aunque no hayamos
      // resuelto todavía el resource name exacto del usuario.
      if (!currentUserId && !usedServerSideCreatorFilter) {
        // Último fallback seguro: los privados visibles para el token pertenecen al usuario autenticado.
        const privateMemos = memos.filter(m => String((m.visibility || '')).toUpperCase() === 'PRIVATE');
        if (privateMemos.length > 0) {
          allMemos = privateMemos.filter(m => !isThreadReplyMemo(m));
          extractTags(allMemos);
          renderCalendar(allMemos);
          renderMemos(allMemos);
          return;
        }

        allMemos = [];
        extractTags(allMemos);
        renderCalendar(allMemos);
        renderMemos(allMemos, memosList, { emptyText: 'No se pudo identificar el usuario del token.' });
        return;
      }
      
      // Filtrado manual siempre que tengamos creator actual; evita mezcla en servidores legacy.
      if (currentUserId) {
        memos = memos.filter(m => isOwnedByCurrentUser(m));
      }

      // Las respuestas/comentarios de hilos públicos no se muestran en la página principal.
      memos = memos.filter(m => !isThreadReplyMemo(m));

      allMemos = memos;
      extractTags(allMemos);
      renderCalendar(allMemos);
      renderMemos(allMemos);
    } catch (error) {
      memosList.innerHTML = '<div class="error-msg">Error de conexión al cargar notas.</div>';
    }
  }

  function renderMemos(memos, targetList = memosList, options = {}) {
    const readOnly = options.readOnly === true;
    const openThreadOnClick = options.openThreadOnClick === true;
    const enableThreadEdit = options.enableThreadEdit === true;
    const emptyText = options.emptyText || 'No hay notas todavía.';
    targetList.replaceChildren();
    if (memos.length === 0) {
      const emptyNode = document.createElement('div');
      emptyNode.className = 'loading';
      emptyNode.textContent = emptyText;
      targetList.appendChild(emptyNode);
      return;
    }

    memos.forEach(memo => {
      const card = document.createElement('div');
      card.className = 'memo-card';
      const memoRef = toMemoRef(memo);
      if (memoRef) {
        card.setAttribute('data-memo-ref', memoRef);
      }
      card.setAttribute('data-content', memo.content); // Para el buscador
      card.setAttribute('data-visibility', memo.visibility || 'PRIVATE'); // Para el filtro de visibilidad
      
      const ts = memo.createTime ? new Date(memo.createTime) : new Date(memo.createdTs * 1000);
      const ds = ts.getFullYear() + '-' + String(ts.getMonth()+1).padStart(2, '0') + '-' + String(ts.getDate()).padStart(2, '0');
      card.setAttribute('data-date', ds); // Para el filtro de calendario
      
      const content = document.createElement('div');
      content.className = 'memo-content';

      if (readOnly) {
        const header = document.createElement('div');
        header.className = 'explore-memo-header';

        const authorWrap = document.createElement('div');
        authorWrap.className = 'explore-author-wrap';

        const avatarEl = document.createElement('div');
        avatarEl.className = 'explore-author-avatar';

        const authorInfo = document.createElement('div');
        authorInfo.className = 'explore-author-info';

        const normalizedCreator = normalizeUserRef(memo.creator) || memo.creator || 'Usuario';
        const authorNameEl = document.createElement('div');
        authorNameEl.className = 'explore-author-name';
        authorNameEl.textContent = normalizedCreator;

        const timeEl = document.createElement('div');
        timeEl.className = 'explore-memo-time';
        timeEl.textContent = getRelativeTimeLabel(ts);

        const avatarFallback = (authorNameEl.textContent || 'U').trim().charAt(0).toUpperCase();
        avatarEl.textContent = avatarFallback;

        const visEl = document.createElement('div');
        visEl.className = 'explore-visibility';
        visEl.appendChild(getExploreVisibilityIcon((memo.visibility || '').toUpperCase()));
        visEl.title = memo.visibility === 'PROTECTED' ? 'Espacio de trabajo' : (memo.visibility === 'PUBLIC' ? 'Público' : 'Privado');

        let threadEditBtn = null;
        let threadQuoteBtn = null;

        if (enableThreadEdit) {
          threadQuoteBtn = document.createElement('button');
          threadQuoteBtn.className = 'thread-quote-btn';
          threadQuoteBtn.title = 'Citar comentario';
          threadQuoteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5H4v8h4"></path><path d="M14 21c3 0 7-1 7-8V5h-6v8h4"></path></svg>';
          threadQuoteBtn.addEventListener('click', (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            insertQuotedReplyFromMemo(memo);
          });

          const memoCreator = normalizeUserRef(memo.creator);
          if (memoCreator && isOwnedByCurrentUser(memo)) {
            threadEditBtn = document.createElement('button');
            threadEditBtn.className = 'thread-edit-btn';
            threadEditBtn.title = 'Editar comentario';
            threadEditBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>';
            threadEditBtn.addEventListener('click', (ev) => {
              ev.preventDefault();
              ev.stopPropagation();
              startThreadCommentEdit(memo);
            });
          }
        }

        authorInfo.appendChild(authorNameEl);
        authorInfo.appendChild(timeEl);
        authorWrap.appendChild(avatarEl);
        authorWrap.appendChild(authorInfo);
        header.appendChild(authorWrap);

        const actionsWrap = document.createElement('div');
        actionsWrap.className = 'explore-actions-wrap';
        header.appendChild(actionsWrap);

        if (openThreadOnClick) {
          const replyBadge = document.createElement('button');
          replyBadge.type = 'button';
          replyBadge.className = 'explore-reply-badge';
          const n = Number(memo.__replyCount || 0);
          if (n === 0) {
            replyBadge.classList.add('is-empty');
          }
          if (memo.__hasNewReplies) {
            replyBadge.classList.add('is-new');
          } else if (memo.__isSeen) {
            replyBadge.classList.add('is-seen');
          }
          const ns = 'http://www.w3.org/2000/svg';
          const badgeIcon = document.createElementNS(ns, 'svg');
          badgeIcon.setAttribute('width', '12');
          badgeIcon.setAttribute('height', '12');
          badgeIcon.setAttribute('viewBox', '0 0 24 24');
          badgeIcon.setAttribute('fill', 'none');
          badgeIcon.setAttribute('stroke', 'currentColor');
          badgeIcon.setAttribute('stroke-width', '2');
          badgeIcon.setAttribute('stroke-linecap', 'round');
          badgeIcon.setAttribute('stroke-linejoin', 'round');
          const badgePath = document.createElementNS(ns, 'path');
          badgePath.setAttribute('d', 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z');
          badgeIcon.appendChild(badgePath);
          const badgeText = document.createElement('span');
          badgeText.textContent = `${n} ${n === 1 ? 'respuesta' : 'respuestas'}`;
          replyBadge.appendChild(badgeIcon);
          replyBadge.appendChild(badgeText);
          replyBadge.title = 'Abrir respuestas';
          replyBadge.addEventListener('click', (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            openThreadForMemo(memo);
          });
          actionsWrap.appendChild(replyBadge);
        }

        actionsWrap.appendChild(visEl);
        if (threadQuoteBtn) {
          actionsWrap.appendChild(threadQuoteBtn);
        }
        if (threadEditBtn) {
          actionsWrap.appendChild(threadEditBtn);
        }
        card.appendChild(header);

        resolveAuthorProfile(normalizedCreator)
          .then((profile) => {
            if (!profile) return;
            if (profile.name) {
              authorNameEl.textContent = profile.name;
              avatarEl.textContent = (profile.name || 'U').trim().charAt(0).toUpperCase();
            }
            if (profile.avatarUrl) {
              avatarEl.style.backgroundImage = `url(${profile.avatarUrl})`;
              avatarEl.textContent = '';
            }
          })
          .catch(() => {});

        if (openThreadOnClick) {
          card.classList.add('explore-clickable-card');
          card.addEventListener('click', (ev) => {
            const blockedTarget = ev.target && ev.target.closest('a,button,input,textarea,audio');
            if (blockedTarget) return;
            openThreadForMemo(memo);
          });
        }
      }
      
      let safeText = memo.content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      
      const groupedAttachments = [];
      const resourcesArray = memo.attachments || memo.resources || memo.relations || memo.resourceList || [];
      
      // 1. Identificar y "limpiar" enlaces de archivos del texto
      safeText = safeText.replace(/\[file\]\(([^)]+)\)/g, (match, url) => {
        // Extraemos el nombre del archivo de la URL o usamos el meta del recurso si coincide
        const filename = decodeURIComponent(url.split('/').pop());
        groupedAttachments.push({ filename: filename, url: url });
        return ''; // Eliminamos del texto
      });

      // 2. Reemplazar markdown de audio por componentes con Auth
      safeText = safeText.replace(/\[audio\]\(([^)]+)\)/g, (match, url) => {
        let fullUrl = url;
        if (!fullUrl.startsWith('http')) {
          fullUrl = `${currentServerUrl}/${fullUrl.replace(/^\//, '')}`;
        }
        return `<div class="audio-container"><audio data-src="${fullUrl}" controls class="memo-audio auth-audio"></audio></div>`;
      });

      // Reemplazar markdown de imagen por etiquetas con Auth
      safeText = safeText.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
        let fullUrl = url;
        if (!fullUrl.startsWith('http')) {
          fullUrl = `${currentServerUrl}/${fullUrl.replace(/^\//, '')}`;
        }
        return `<img data-src="${fullUrl}" alt="${alt}" class="memo-img auth-img" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" />`;
      });
      
      // Reemplazar tareas [-] o [x] por componentes interactivos
      let taskIdx = 0;
      safeText = safeText.replace(/^([\s]*)- \[([ xX])\] (.*)$/gm, (match, indent, char, taskContent) => {
        const isChecked = char.toLowerCase() === 'x';
        const idx = taskIdx++;
        return `${indent}<div class="task-row ${isChecked ? 'is-done' : ''}" data-task-idx="${idx}">
          <input type="checkbox" class="task-checkbox" ${isChecked ? 'checked' : ''} data-memo-id="${memo.name || memo.id}">
          <span class="task-text">${taskContent}</span>
        </div>`;
      });
      
      // Parsear recursos ocultos y agrupar adjuntos
      if (Array.isArray(resourcesArray)) {
        resourcesArray.forEach(res => {
          const resId = res.name || res.id;
          if (!resId) return;
          
          let resUrl = '';
          const idStr = String(resId);
          const encodedFilename = encodeURIComponent(res.filename || '');
          if (idStr.includes('resources/') || idStr.includes('attachments/')) {
            resUrl = `${currentServerUrl}/file/${idStr}/${encodedFilename}`;
          } else {
            const numId = idStr.split('/').pop();
            resUrl = `${currentServerUrl}/o/r/${numId}/${encodedFilename}`;
          }
          
          const isImage = (res.type && res.type.startsWith('image/')) || (res.filename && res.filename.match(/\.(jpeg|jpg|gif|png|webp)$/i));
          const isAudio = (res.type && res.type.startsWith('audio/')) || (res.filename && res.filename.match(/\.(webm|mp3|wav|ogg|m4a)$/i));
          
          // Si no está ya incrustado manualmente en el markdown
          const idPart = idStr.split('/').pop();
          if (!safeText.includes(idPart)) {
            if (isImage) {
              safeText += `\n<img data-src="${resUrl}" alt="${res.filename || 'img'}" class="memo-img auth-img" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" />`;
            } else if (isAudio) {
              safeText += `\n<div class="audio-container"><audio data-src="${resUrl}" controls class="memo-audio auth-audio"></audio></div>`;
            } else {
              groupedAttachments.push({ filename: res.filename, url: resUrl, size: res.size, type: res.type });
            }
          }
        });
      }

      // Si hay adjuntos agrupados, crear la caja estilo servidor
      if (groupedAttachments.length > 0) {
        let attachHtml = `<div class="memo-attachments-box">
          <div class="attachments-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.51a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
            Attachments (${groupedAttachments.length})
          </div>
          <div class="attachment-list">`;
        
        groupedAttachments.forEach(att => {
          const ext = att.filename.split('.').pop().toUpperCase();
          const sizeKb = att.size ? (att.size / 1024).toFixed(1) + ' KB' : 'N/A';
          attachHtml += `
            <a href="${att.url}" target="_blank" class="attachment-item auth-link" data-filename="${att.filename}">
              <div class="attachment-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              </div>
              <div class="attachment-info">
                <span class="attachment-name">${att.filename}</span>
                <span class="attachment-meta">${ext} • ${sizeKb}</span>
              </div>
            </a>`;
        });
        attachHtml += `</div></div>`;
        safeText += attachHtml;
      }

      const renderedHtml = renderInlineMarkdown(safeText);
      const renderedFragment = sanitizeRenderedHtmlToFragment(renderedHtml);
      content.replaceChildren(renderedFragment);

      const meta = document.createElement('div');
      meta.className = 'memo-meta';
      
      const dateStr = new Date(memo.createTime || memo.createdTs * 1000).toLocaleDateString(undefined, { 
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
      });
      
      const metaLeft = document.createElement('div');
      metaLeft.style.display = 'flex';
      metaLeft.style.alignItems = 'center';
      
      const visibilityStr = memo.visibility || 'PRIVATE';
      const visibilityBadge = document.createElement('span');
      visibilityBadge.className = 'memo-visibility-badge';
      visibilityBadge.textContent = visibilityStr === 'PUBLIC' ? '🌍 Público' : visibilityStr === 'PROTECTED' ? '🔒 Protegido' : '👤 Privado';
      
      const dateSpan = document.createElement('span');
      dateSpan.textContent = dateStr;

      metaLeft.appendChild(visibilityBadge);
      metaLeft.appendChild(dateSpan);

      const actions = document.createElement('div');
      actions.className = 'memo-actions';
      
      const editBtn = document.createElement('button');
      editBtn.className = 'btn-icon';
      editBtn.title = 'Editar';
      editBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>';
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn-icon delete-btn';
      deleteBtn.title = 'Borrar';
      deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>';

      const duplicateBtn = document.createElement('button');
      duplicateBtn.className = 'btn-icon';
      duplicateBtn.title = 'Duplicar';
      duplicateBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';

      const memoId = memo.name ? memo.name.split('/').pop() : memo.id;
      
      editBtn.onclick = () => {
        startEditing(memo);
        if (memo.visibility) memoVisibility.value = memo.visibility;
      };

      deleteBtn.onclick = () => {
        deleteMemo(memoId);
      };

      duplicateBtn.onclick = () => {
        cancelEditing(); // Resetear estado de edición
        memoInput.value = memo.content;
        if (memo.visibility) memoVisibility.value = memo.visibility;
        
        // Hacer scroll suave hacia arriba para ver el editor
        const scrollTarget = document.querySelector('.memos-list') || window;
        scrollTarget.scrollTo({ top: 0, behavior: 'smooth' });
        
        memoInput.focus();
        editorStatus.textContent = 'Copiado al editor';
        setTimeout(() => editorStatus.textContent = '', 2000);
      };

      if (!readOnly) {
        actions.appendChild(duplicateBtn);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
      }
      
      meta.appendChild(metaLeft);
      if (!readOnly) {
        meta.appendChild(actions);
      }

      card.appendChild(content);
      if (!readOnly) {
        card.appendChild(meta);
      }
      targetList.appendChild(card);
      
      // Cargar imágenes con autenticación
      const authImages = card.querySelectorAll('.auth-img');
      authImages.forEach(img => {
        const src = img.getAttribute('data-src');
        if (src) {
          fetch(src, { headers: { 'Authorization': `Bearer ${currentAccessToken}` } })
            .then(res => res.ok ? res.blob() : Promise.reject(res.status))
            .then(blob => {
              img.src = URL.createObjectURL(blob);
              img.classList.remove('auth-img');
            })
            .catch(e => {
              console.error("Failed to load authenticated image", src, e);
              img.src = src; // Fallback por si la imagen es pública y no necesita token
            });
        }
      });
      // Cargar audios con autenticación (usando Base64 para evitar interceptores como IDM)
      const authAudios = card.querySelectorAll('.auth-audio');
      authAudios.forEach(async (audio) => {
        const url = audio.getAttribute('data-src');
        try {
          const res = await fetch(url, {
            headers: { 'Authorization': `Bearer ${currentAccessToken}` }
          });
          if (res.ok) {
            let blob = await res.blob();
            
            // Si el blob es genérico (octet-stream), intentamos darle un tipo de audio real
            // Esto es vital para que el reproductor se active si subimos como "application/octet-stream"
            if (blob.type === 'application/octet-stream' || blob.type === '') {
              const ext = url.split('.').pop().toLowerCase().split('?')[0];
              const mimeMap = { 'webm': 'audio/webm', 'mp3': 'audio/mpeg', 'ogg': 'audio/ogg', 'wav': 'audio/wav', 'm4a': 'audio/mp4' };
              if (mimeMap[ext]) {
                blob = new Blob([blob], { type: mimeMap[ext] });
              }
            }

            const reader = new FileReader();
            reader.onloadend = () => {
              audio.src = reader.result; // Data URI (Base64)
              audio.load(); // Forzar carga
            };
            reader.readAsDataURL(blob);
          }
        } catch (e) {
          console.error("Error loading auth audio:", e);
        }
      });
    });
  }

  // Guardar/Crear Memo
  saveMemoBtn.addEventListener('click', async () => {
    const content = memoInput.value.trim();
    if (!content) return;

    editorStatus.textContent = 'Guardando...';
    saveMemoBtn.disabled = true;

    try {
      let url = `${currentServerUrl}/api/v1/memos`;
      let method = 'POST';
      const mergedAttachments = mergeAttachmentReferences(editingMemoAttachments, pendingMemoAttachments);
      let body = { 
        content: content,
        visibility: memoVisibility.value 
      };

      if (mergedAttachments.length > 0) {
        body.attachments = mergedAttachments;
      }

      if (editingMemoId) {
        const updateMask = ['content', 'visibility'];
        if (mergedAttachments.length > 0) {
          updateMask.push('attachments');
        }
        url = `${currentServerUrl}/api/v1/memos/${editingMemoId}?updateMask=${updateMask.join(',')}`;
        method = 'PATCH';
      }

      const response = await fetch(url, {
        method: method,
        headers: { 'Authorization': `Bearer ${currentAccessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error('Error al guardar');

      pendingMemoAttachments = [];
      editingMemoAttachments = [];
      memoInput.value = '';
      cancelEditing();
      editorStatus.textContent = '¡Guardado!';
      setTimeout(() => editorStatus.textContent = '', 2000);
      
      // Limpiar buscador al guardar
      searchInput.value = '';
      
      fetchMemos();
    } catch (error) {
      editorStatus.textContent = 'Error al guardar';
    } finally {
      saveMemoBtn.disabled = false;
    }
  });

  function startEditing(memo) {
    const memoId = memo && (memo.name ? memo.name.split('/').pop() : memo.id);
    editingMemoId = memoId;
    memoInput.value = (memo && memo.content) || '';
    editingMemoAttachments = mergeAttachmentReferences(memo && memo.attachments);
    pendingMemoAttachments = [];
    memoInput.focus();
    cancelEditBtn.classList.remove('hidden');
    deleteEditBtn.classList.remove('hidden');
    saveBtnText.textContent = 'Actualizar';
    saveBtnIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    editorStatus.textContent = 'Editando nota';
  }

  function cancelEditing() {
    editingMemoId = null;
    pendingMemoAttachments = [];
    editingMemoAttachments = [];
    memoInput.value = '';
    memoVisibility.value = 'PRIVATE';
    cancelEditBtn.classList.add('hidden');
    deleteEditBtn.classList.add('hidden');
    saveBtnText.textContent = 'Guardar';
    saveBtnIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>';
    editorStatus.textContent = '';
  }



  async function deleteMemo(id) {
    if (!confirm('¿Estás seguro de que quieres borrar esta nota?')) return;
    
    try {
      editorStatus.textContent = 'Borrando...';
      const res = await fetch(`${currentServerUrl}/api/v1/memos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${currentAccessToken}` }
      });
      
      if (res.ok) {
        editorStatus.textContent = 'Nota borrada';
        setTimeout(() => editorStatus.textContent = '', 2000);
        if (editingMemoId === id) cancelEditing();
        fetchMemos();
      } else {
        throw new Error('Error al borrar');
      }
    } catch (e) {
      editorStatus.textContent = 'Error al borrar';
    }
  }


  cancelEditBtn.addEventListener('click', cancelEditing);

  deleteEditBtn.addEventListener('click', () => {
    if (editingMemoId) deleteMemo(editingMemoId);
  });

  // Manejar clics en checkboxes de tareas (Delegación de eventos)
  memosList.addEventListener('change', async (e) => {
    if (e.target.classList.contains('task-checkbox')) {
      const checkbox = e.target;
      const memoId = checkbox.getAttribute('data-memo-id');
      const isChecked = checkbox.checked;
      const taskRow = checkbox.closest('.task-row');
      const taskIdx = parseInt(taskRow.getAttribute('data-task-idx'));
      
      // Encontrar el memo en nuestro set de datos
      const memo = allMemos.find(m => (m.name || m.id) == memoId);
      if (!memo) return;
      
      // Calcular el nuevo contenido
      let currentIdx = 0;
      const newContent = memo.content.replace(/^([\s]*)- \[([ xX])\] (.*)$/gm, (match, indent, char, content) => {
        if (currentIdx === taskIdx) {
          currentIdx++;
          return `${indent}- [${isChecked ? 'x' : ' '}] ${content}`;
        }
        currentIdx++;
        return match;
      });

      // Actualización optimista de la UI
      taskRow.classList.toggle('is-done', isChecked);
      
      try {
        const id = memo.name ? memo.name.split('/').pop() : memo.id;
        const res = await fetch(`${currentServerUrl}/api/v1/memos/${id}?updateMask=content`, {
          method: 'PATCH',
          headers: { 
            'Authorization': `Bearer ${currentAccessToken}`,
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({ content: newContent })
        });
        
        if (res.ok) {
          memo.content = newContent; // Actualizar caché local
        } else {
          throw new Error('Error al actualizar en servidor');
        }
      } catch (err) {
        console.error("Task update failed:", err);
        // Revertir si hay error
        checkbox.checked = !isChecked;
        taskRow.classList.toggle('is-done', !isChecked);
      }
    }
  });

  // --- LÓGICA DE NOTAS DE VOZ (GRABACIÓN) ---
  async function startRecording() {
    try {
      // Intentar encontrar el formato más compatible
      const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/mp4'];
      const supportedType = types.find(t => MediaRecorder.isTypeSupported(t)) || 'audio/webm';
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream, { mimeType: supportedType });
      audioChunks = [];
      recordingSeconds = 0;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.push(e.data);
      };
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: supportedType });
        const extension = supportedType.includes('ogg') ? 'ogg' : 'webm';
        
        // Crear el archivo con tipo genérico y metadatos completos para máxima compatibilidad
        const cleanFile = new File([audioBlob], `voice_${Date.now()}.${extension}`, { 
          type: 'application/octet-stream', 
          lastModified: Date.now() 
        });
        
        // Subir al servidor usando el sistema de adjuntos general
        const resource = await uploadGenericResource(cleanFile);
        if (resource) {
          insertResourceInEditor(cleanFile, resource);
        }
        
        // Limpiar stream y audio context
        stream.getTracks().forEach(track => track.stop());
        if (audioCtx) audioCtx.close();
        cancelAnimationFrame(animId);
      };

      // Visualizador (Onda senoidal / Waveform)
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioCtx.createMediaStreamSource(stream);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const ctx = voiceVisualizer.getContext('2d');
      
      function draw() {
        animId = requestAnimationFrame(draw);
        analyser.getByteTimeDomainData(dataArray); // Usamos TimeDomain para la onda real
        
        ctx.fillStyle = '#0f0f11';
        ctx.fillRect(0, 0, voiceVisualizer.width, voiceVisualizer.height);
        
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ff4e4e';
        ctx.beginPath();
        
        const sliceWidth = voiceVisualizer.width * 1.0 / bufferLength;
        let x = 0;
        
        for(let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = v * voiceVisualizer.height / 2;
          
          if(i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          
          x += sliceWidth;
        }
        
        ctx.lineTo(voiceVisualizer.width, voiceVisualizer.height / 2);
        ctx.stroke();
      }
      
      draw();

      mediaRecorder.start();
      voiceBtn.classList.add('recording');
      recordingStatus.classList.remove('hidden');
      voiceVisualizer.classList.remove('hidden');
      
      recordingTimer = setInterval(() => {
        recordingSeconds++;
        const mins = Math.floor(recordingSeconds / 60).toString().padStart(2, '0');
        const secs = (recordingSeconds % 60).toString().padStart(2, '0');
        recordingStatus.textContent = `REC ${mins}:${secs}`;
      }, 1000);

    } catch (err) {
      console.error("Error micro:", err);
      alert("No se pudo acceder al micrófono. Verifica los permisos en la configuración de la extensión.");
    }
  }

  function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      clearInterval(recordingTimer);
      voiceBtn.classList.remove('recording');
      recordingStatus.classList.add('hidden');
      voiceVisualizer.classList.add('hidden');
      recordingStatus.textContent = "REC 00:00";
    }
  }
  if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        stopRecording();
      } else {
        startRecording();
      }
    });
  }

  // Manejar clics en píldoras de visibilidad
  document.addEventListener('click', (e) => {
    const pill = e.target.closest('.vis-pill');
    if (pill) {
      const pills = document.querySelectorAll('.vis-pill');
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      
      currentFilterVisibility = pill.getAttribute('data-vis');
      applyFilters();
    }
  });

});
