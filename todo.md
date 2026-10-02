# Chatlly TODO

## Phase 1 — Security & Correctness

### Group Authorization
- [x] Group admin authorization fix
- [x] Group membership authorization
- [x] Prevent password hash exposure
- [x] Group message access protection
- [x] Group deletion message cleanup
- [x] Group/member ID validation

### Environment Configuration
- [x] Environment-based API URLs
- [x] Environment-based Socket.IO URL
- [x] Environment-based backend CORS
- [x] Environment-aware cookie settings
- [ ] Shared backend config
- [x] Backend .env.example
- [x] Frontend .env.example
- [x] Frontend development environment config

### Socket.IO Security
- [x] Socket.IO JWT authentication
- [x] Remove trust in client-supplied userId
- [x] Multiple-socket/multi-tab handling
- [x] Verify socket authentication with local integration testing

### Remaining Phase 1 Work
- [ ] Auth middleware status-code fixes
- [ ] Cloudinary group image upload
- [ ] Group message routing fix
- [ ] Group sender information
- [ ] 
ewMessages bug fix
- [ ] Input validation
- [ ] Rate limiting
- [ ] Frontend correctness fixes
- [ ] Remove plaintext password logs

## Phase 2

- [ ] Cursor-based message pagination
- [ ] MongoDB indexes
- [ ] User search
- [ ] Central error handling
- [ ] Helmet
- [ ] Group message cleanup improvements
- [ ] Correct HTTP status codes

## Phase 3

- [ ] Jest/Supertest tests
- [ ] Socket.IO integration tests
- [ ] GitHub Actions CI
- [ ] Professional README
- [ ] Architecture diagram
- [ ] Repository cleanup

## Current Status

Phase 1 security work completed to the extent needed for the current release.

Further hardening and remaining features can be continued after the current application submission.
