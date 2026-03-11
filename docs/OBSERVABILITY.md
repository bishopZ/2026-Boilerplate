# Observability

This boilerplate includes structured server logging from day one.

## What is included

- Request ID attachment middleware (`x-request-id`)
- Request completion logs with duration/status
- Global error logs with request context
- Auth-focused audit event hooks (login/logout/session/rate-limit events)

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
