# Project Decisions

## Environment Configuration
- Frontend API URL uses VITE_API_URL
- Frontend Socket.IO URL uses VITE_SOCKET_URL
- Backend CORS uses CLIENT_URL
- Authentication cookies use:
  - development: httpOnly + SameSite=Lax + secure=false
  - production: httpOnly + SameSite=None + secure=true
- Cookie configuration is centralized in ackend/src/lib/cookieOptions.js
- Socket.IO JWT authentication has NOT been implemented yet

## Development Workflow
- Complete one focused task at a time
- Test before committing
- Do not modify unrelated files
- Do not commit .env or secrets
- Avoid unnecessary dependency changes
