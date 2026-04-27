# Memos Addon

ES: Extension para navegador para conectarte a tu instancia autohospedada de Memos y gestionar notas desde popup o pestana.

EN: Browser extension to connect to your self-hosted Memos instance and manage notes from a popup or full tab.

<img width="1901" height="947" alt="Captura de pantalla 2026-04-22 185137" src="https://github.com/user-attachments/assets/0a4d992b-8ee9-4e80-afbd-06877c53c5ae" />

## Funcionalidades / Features

### ES
- Edicion rapida de notas (crear, actualizar, borrar, duplicar).
- Soporte de visibilidad: PRIVATE, PROTECTED y PUBLIC.
- Subida de imagenes y archivos desde el editor con render autenticado.
- Notas de voz y reproduccion integrada.
- Tareas interactivas (check/uncheck) sin abrir modo de edicion completo.
- Busqueda en vivo, etiquetas y filtro por calendario.
- Vista Explorar para contenido publico y respuestas en hilo.

### EN
- Fast note editing (create, update, delete, duplicate).
- Visibility support: PRIVATE, PROTECTED and PUBLIC.
- Image and file upload from the editor with authenticated rendering.
- Voice notes and built-in playback.
- Interactive tasks (check/uncheck) without full edit mode.
- Live search, tags and calendar filtering.
- Explore view for public content and thread replies.

## Novedades v1.4 / What's new in v1.4

### ES
- Login mas robusto en Firefox con mensajes de error mas claros (token/permisos vs red/CORS/certificado).
- Nuevo boton para abrir el login en una pestana y evitar perdida de datos al cerrarse el popup.
- Persistencia de borrador de login (URL y token) entre aperturas del popup.
- Diagnostico accesible sin sesion previa, con entrada manual de URL/token y autocompletado desde borrador.
- Mejoras de compatibilidad mantenidas para Memos 0.26.x y 0.27.x (deteccion de usuario, filtros creator y branding fallback).

### EN
- More robust Firefox login with clearer error messages (token/permissions vs network/CORS/certificate).
- New button to open login in a full tab to avoid popup data loss.
- Login draft persistence (URL and token) across popup reopen.
- Diagnostics can now run without prior login, with manual URL/token input and draft autofill.
- Kept compatibility improvements for Memos 0.26.x and 0.27.x (user detection, creator filters, branding fallback).

## Novedades v1.3 / What's new in v1.3

### ES
- Compatibilidad reforzada con servidores Memos 0.26.x y 0.27.x.
- Corregida la carga de memos privados en instancias donde users/me o auth/status no estan disponibles.
- Fallbacks por capas para evitar listas vacias en Home cuando creator==users/me responde 200 sin datos.
- Normalizacion de creator para formatos por id y por username.
- Limpieza del memo probe endurecida para reducir ruido en consola.

### EN
- Improved compatibility with Memos 0.26.x and 0.27.x servers.
- Fixed private memo loading on instances where users/me or auth/status are unavailable.
- Layered fallbacks to avoid empty Home lists when creator==users/me returns 200 with empty results.
- Creator normalization for both id-based and username-based formats.
- Hardened probe memo cleanup to reduce console noise.

## Compatibilidad / Compatibility

ES: Consulta la matriz tecnica en [COMPATIBILIDAD.md](COMPATIBILIDAD.md).

EN: Check the technical matrix in [COMPATIBILIDAD.md](COMPATIBILIDAD.md).

## Atajos / Shortcuts

### ES
- Alt + Enter o Ctrl + Enter: guarda o actualiza la nota actual.

### EN
- Alt + Enter or Ctrl + Enter: save or update the current note.

## Notas importantes / Important notes

### ES
>[!TIP]
> Si haces clic fuera del popup durante una grabacion, se detiene.
> Debes conceder permisos de microfono la primera vez.

>[!IMPORTANT]
> Requiere un servidor [usememos](https://usememos.com/) en funcionamiento.

>[!NOTE] 
>Este complemento soporta espanol e ingles y usa el idioma del navegador por defecto.
>

> [!IMPORTANT]
> Firefox bloquea peticiones desde extensiones hacia servidores HTTP locales o HTTPS con certificado no valido.
> Este bloqueo es de seguridad del navegador y no se puede desactivar desde la extension.
> Recomendado para Firefox: usar HTTPS con certificado valido (no autofirmado) o una instancia publica con TLS correcto.

### EN
>[!TIP]
> If you click outside the popup while recording, recording stops.
> You must grant microphone permissions on first use.

>[!IMPORTANT]
> Requires a running [usememos](https://usememos.com/) server.

>[!NOTE] 
>This addon supports Spanish and English and uses the browser default language.

>[!IMPORTANT]
> Firefox may block extension requests to local HTTP servers or HTTPS endpoints with invalid certificates.
> This is a browser security restriction and cannot be bypassed by the extension.
> Recommended for Firefox: use HTTPS with a valid certificate (not self-signed) or a public instance with proper TLS.

</br>
<img width="493" height="426" alt="Captura de pantalla secundaria" src="https://github.com/user-attachments/assets/b30aee6b-b0f8-4476-979f-59824aa5a0d4" />
</br>

## Distribucion / Store links

| Firefox add-ons | Opera add-ons |
| :---: | :---: |
| <a href="https://addons.mozilla.org/es-ES/firefox/addon/memos-extension/"> <img width="182" height="75" alt="Firefox add-ons" src="https://github.com/user-attachments/assets/f0c1498a-7093-4b36-9cd7-c443b2ad4928" /> </a> | <img width="182" height="75" alt="Opera add-ons" src="https://github.com/user-attachments/assets/2bec7285-845a-448a-9767-c2957749e886" /> |

<a target="_blank" href="https://icons8.com/icon/0Jj2OFqGGRVZ/note">Memo</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

 
