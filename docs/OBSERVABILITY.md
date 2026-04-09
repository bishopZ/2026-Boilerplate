# Observability

This boilerplate includes structured server logging from day one. Implementation lives under **`src/server/observability/`** (the observability pack): config (`REQUEST_ID_HEADER`), **`log`** (structured JSON lines), **`getRequestId`**, request middleware, and **`writeAuditEvent`** for auth scaffolding.

## What is included

- Request ID attachment middleware (`x-request-id`) — `observability/middleware/request-id.ts`
- Request completion logs with duration/status — `observability/middleware/request-logger.ts`
- Global error logs with request context — `middleware/error-handler.ts` uses `log` from the pack
- Auth-focused audit event hooks (login/logout/session/rate-limit events) — `observability/audit.ts` and `controllers/auth.ts`

## Request ID behavior

- Incoming `x-request-id` is preserved when provided.
- Otherwise, the server generates a UUID.
- The response always includes `x-request-id`.

## Log format

Logs are JSON lines with common fields:

- `timestamp`
- `level`
- `event`
- request context fields (`requestId`, `method`, `path`, `statusCode`, etc.)

This makes logs easy to ingest in platforms like Datadog, Elastic, or CloudWatch.

## Auth audit hooks

Audit events are emitted for:

- legacy login success/failure
- REST session create success/failure
- session delete
- legacy logout
- login rate-limit trigger

## Extension guidance

- Add domain-specific audit events near critical state transitions.
- Keep event names stable and machine-friendly (for dashboards/alerts).
- Avoid logging secrets, tokens, passwords, or raw personal data.
