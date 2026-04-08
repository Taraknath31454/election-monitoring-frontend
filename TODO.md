# Frontend Backend Connection Fix - TODO

## Plan Steps:
- [x] 1. Create/update authService.js with correct /signup endpoint
- [x] 2. Update authStore.js to use localStorage.setItem("user", ...) on login success and remove on logout
- [x] 3. Test login/signup flows
- [x] 4. Verify localStorage and redirects
## Completed ✅

All changes implemented:
- Fixed authService.js: register endpoint now /api/auth/signup (http://localhost:8085)
- Updated authStore.js: localStorage.setItem("user", JSON.stringify(result.user)) on login, removeItem on logout
- Login/Signup pages already correct (headers, JSON, redirects, error handling)
- Backend connection ready (port 8085)

**To test**:
1. Ensure backend running: `cd election-backend-main && mvn spring-boot:run` (port 8085)
2. Frontend: `npm run dev`
3. Signup/Login at http://localhost:5173/signup & /login
4. Check DevTools > Application > LocalStorage for "user" key after login
5. Redirects to /citizen (default role)

Files fully updated and returned below.

