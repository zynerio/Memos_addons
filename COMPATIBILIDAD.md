# Matriz de compatibilidad - Memos Extension v1.3

Fecha: 2026-04-22
Scope: carga de memos, deteccion de usuario, branding y adjuntos

## Resumen ejecutivo

La extension v1.3 usa una estrategia por capas para evitar roturas entre instancias Memos con diferencias de API.
No rompe rutas antiguas: primero intenta rutas modernas y, si fallan o devuelven vacio, cae a rutas o criterios alternativos.

## Matriz rapida

| Area | Memos 0.26.x | Memos 0.27.x | Estrategia en Extension 1.3 |
|---|---|---|---|
| Deteccion de usuario | Puede responder en `/api/v1/users/me` o `/api/v1/auth/status` segun despliegue | En algunas instancias ambos endpoints devuelven 404 | Fallback encadenado: `users/me` -> `auth/status` -> inferencia desde memos -> probe create/delete (silencioso) |
| Filtro de memos propios | Suele funcionar `filter=creator == "users/me"` | Puede devolver 200 con lista vacia | Solo acepta filtro server-side si trae memos. Si trae vacio, prueba aliases y luego listado general |
| Formato de creator | Puede venir como `users/{id}` | Puede venir como `users/{username}` | Normalizacion por referencia completa y por ultimo segmento (id/username) |
| Visibilidad y propiedad | PRIVATE propio, PROTECTED puede variar por permisos | Igual, con mayor exposicion de PROTECTED de terceros | Inferencia de propietario solo desde PRIVATE (no desde PROTECTED) |
| Branding de workspace | `/workspace/*` puede existir o no | En muchos casos 404 en `/workspace/*` | Fallback a `/api/v1/instance/settings/GENERAL` y ConnectRPC `InstanceService/GetInstanceSetting` |
| Adjuntos upload | Puede aceptar `/api/v1/attachments` JSON | Igual, pero `/resources` puede no existir | Cadena de intentos, priorizando `/api/v1/attachments` JSON |

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

## Riesgos residuales conocidos

- Instancias muy antiguas o personalizadas pueden usar campos no estandar para `creator`.
- Instancias con politicas ACL no convencionales pueden mezclar visibilidad de forma distinta.

## Checklist recomendada antes de publicar

- [ ] Login con token valido en instancia 0.26.x
- [ ] Login con token valido en instancia 0.27.x
- [ ] Ver memos PRIVATE en Home
- [ ] Ver memos PUBLIC en Explorar
- [ ] Crear y editar memo PRIVATE
- [ ] Subir adjunto y verificar render
- [ ] Branding visible (nombre/logo) o fallback a hostname

## Notas de release sugeridas (v1.3)

- Mejora de compatibilidad entre APIs Memos 0.26.x y 0.27.x.
- Correccion de carga de memos privados en instancias sin `users/me`.
- Endurecimiento de fallback de filtros `creator` cuando devuelven lista vacia.
- Mejoras en limpieza de probe de usuario para evitar ruido en consola.
