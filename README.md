# Memos Addon

ES: Extension para navegador para conectarte a tu instancia autohospedada de Memos y gestionar notas desde popup o pestana.

EN: Browser extension to connect to your self-hosted Memos instance and manage notes from a popup or full tab.

<img width="1899" height="935" alt="Captura de pantalla principal" src="https://github.com/user-attachments/assets/0a95e8e8-f647-4d3f-968b-50ada466f050" />

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
> Si haces clic fuera del popup durante una grabacion, se detiene.
> Debes conceder permisos de microfono la primera vez.

### EN
> If you click outside the popup while recording, recording stops.
> You must grant microphone permissions on first use.

> Requiere un servidor [usememos](https://usememos.com/) en funcionamiento.
>
> Requires a running [usememos](https://usememos.com/) server.

Este complemento soporta espanol e ingles y usa el idioma del navegador por defecto.

This addon supports Spanish and English and uses the browser default language.

<img width="493" height="426" alt="Captura de pantalla secundaria" src="https://github.com/user-attachments/assets/b30aee6b-b0f8-4476-979f-59824aa5a0d4" />

## Distribucion / Store links

| Firefox add-ons | Opera add-ons |
| :---: | :---: |
| <img width="182" height="75" alt="Firefox add-ons" src="https://github.com/user-attachments/assets/f0c1498a-7093-4b36-9cd7-c443b2ad4928" /> | <img width="182" height="75" alt="Opera add-ons" src="https://github.com/user-attachments/assets/2bec7285-845a-448a-9767-c2957749e886" /> |

<a target="_blank" href="https://icons8.com/icon/0Jj2OFqGGRVZ/note">Memo</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

 
