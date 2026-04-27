# Matriz de compatibilidad - Memos Extension v1.4

Fecha: 2026-04-27
Scope: carga de memos, deteccion de usuario, branding, adjuntos y robustez de login/diagnostico

## Resumen ejecutivo

La extension v1.4 mantiene la estrategia por capas para evitar roturas entre instancias Memos con diferencias de API y añade mejoras de UX para Firefox.
No rompe rutas antiguas: primero intenta rutas modernas y, si fallan o devuelven vacio, cae a rutas o criterios alternativos.
Ademas, conserva borrador de login y habilita diagnostico sin sesion para investigar bloqueos de red/CORS/TLS.

## Matriz rapida

| Area | Memos 0.26.x | Memos 0.27.x | Estrategia en Extension 1.4 |
|---|---|---|---|
| Deteccion de usuario | Puede responder en `/api/v1/users/me` o `/api/v1/auth/status` segun despliegue | En algunas instancias ambos endpoints devuelven 404 | Fallback encadenado: `users/me` -> `auth/status` -> inferencia desde memos -> probe create/delete (silencioso) |
| Filtro de memos propios | Suele funcionar `filter=creator == "users/me"` | Puede devolver 200 con lista vacia | Solo acepta filtro server-side si trae memos. Si trae vacio, prueba aliases y luego listado general |
| Formato de creator | Puede venir como `users/{id}` | Puede venir como `users/{username}` | Normalizacion por referencia completa y por ultimo segmento (id/username) |
| Visibilidad y propiedad | PRIVATE propio, PROTECTED puede variar por permisos | Igual, con mayor exposicion de PROTECTED de terceros | Inferencia de propietario solo desde PRIVATE (no desde PROTECTED) |
| Branding de workspace | `/workspace/*` puede existir o no | En muchos casos 404 en `/workspace/*` | Fallback a `/api/v1/instance/settings/GENERAL` y ConnectRPC `InstanceService/GetInstanceSetting` |
| Adjuntos upload | Puede aceptar `/api/v1/attachments` JSON | Igual, pero `/resources` puede no existir | Cadena de intentos, priorizando `/api/v1/attachments` JSON |
| Login UX en popup | Popup se puede cerrar al perder foco | Igual | Boton para abrir login en pestana + borrador persistente (URL/token) |
| Diagnostico | Dependia de credenciales ya guardadas por sesion | Igual | Debug ejecutable sin sesion previa con entrada manual y autocompletado desde borrador |
| Red en Firefox (local) | Puede bloquear HTTP local o TLS invalido | Igual | Mensajes de error diferenciados y guia al flujo de debug |

## Flujo real usado por la extension (Home)

1. Intenta listar memos con filtros de creator candidatos.
2. Si una respuesta es 200 pero sin memos, no se da por valida y continua con el siguiente candidato.
3. Si no hay filtro valido, cae a listado general de memos.
4. Intenta resolver propietario actual:
   - por endpoints de usuario,
   - por inferencia desde memos PRIVATE,
   - y por probe controlado como ultimo recurso.
5. Aplica filtrado local de memos propios solo cuando ya hay referencia confiable.
6. Excluye replies/comentarios de hilo en Home.

## Decisiones de compatibilidad importantes

- No se asume que `users/me` exista.
- No se asume que `creator == users/me` devuelva resultados aunque el server responda 200.
- No se infiere propietario desde PROTECTED para evitar falsos positivos.
- La limpieza del memo probe intenta mas de un target y no rompe flujo si falla.
- El diagnostico puede iniciarse sin sesion activa para depurar problemas de conectividad en el propio login.
- Se persiste borrador de credenciales para evitar perdida de datos cuando Firefox cierra el popup por cambio de foco.

## Limitacion conocida en Firefox (importante)

- Firefox puede bloquear peticiones desde extensiones hacia servidores en HTTP local o HTTPS con certificado no valido.
- Este bloqueo es de seguridad del navegador y no se puede desactivar ni saltar desde la extension.
- Recomendacion: usar HTTPS con certificado valido y cadena completa, o una instancia publica con TLS correcto.

## Riesgos residuales conocidos

- Instancias muy antiguas o personalizadas pueden usar campos no estandar para `creator`.
- Instancias con politicas ACL no convencionales pueden mezclar visibilidad de forma distinta.
- En Firefox, un servidor local sin TLS valido puede devolver `NetworkError when attempting to fetch resource.` para todos los endpoints.

## Checklist recomendada antes de publicar

- [ ] Login con token valido en instancia 0.26.x
- [ ] Login con token valido en instancia 0.27.x
- [ ] Login en Firefox con HTTPS y certificado valido
- [ ] Probar boton "Abrir login en una pestana" y verificar que conserva borrador
- [ ] Ejecutar debug sin sesion previa (con URL/token manual)
- [ ] Ver memos PRIVATE en Home
- [ ] Ver memos PUBLIC en Explorar
- [ ] Crear y editar memo PRIVATE
- [ ] Subir adjunto y verificar render
- [ ] Branding visible (nombre/logo) o fallback a hostname

## Notas de release sugeridas (v1.4)

- Login mas robusto en Firefox con mensajes de error diferenciados (auth vs red/CORS/TLS).
- Nuevo flujo de login en pestana para evitar perdida de datos por cierre automatico del popup.
- Persistencia de borrador de login (URL y token) entre aperturas.
- Diagnostico ejecutable sin sesion previa con campos manuales y autocompletado desde borrador.
- Compatibilidad mantenida con Memos 0.26.x y 0.27.x en deteccion de usuario, filtros creator y branding fallback.
