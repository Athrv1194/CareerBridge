import { createContext, useState, useEffect, useContext } from 'react';

// ─────────────────────────────────────────────────────────────
// 1. Create the Auth Context
//    This is the shared "state container" that any component
//    in the app can subscribe to via the useAuth() hook.
// ─────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

// ─────────────────────────────────────────────────────────────
// 2. Helper: Decode a JWT payload without a library
//    JWTs are base64url-encoded JSON split into 3 parts by dots.
//    We only need the middle "payload" section.
// ─────────────────────────────────────────────────────────────
function decodeJwtPayload(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────
// 3. AuthProvider Component
//    Wrap your entire application with this to expose auth
//    state to every child without prop-drilling.
//    Usage in main.jsx:
//      <AuthProvider><App /></AuthProvider>
// ─────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  // user stores the decoded identity: { name, email, role }
  const [user, setUser] = useState(null);
  // token stores the raw JWT string for Authorization headers
  const [token, setToken] = useState(null);

  // ───────────────────────────────────────────────────────────
  // Hydrate state from localStorage on initial app load.
  // This keeps the user "logged in" across browser refreshes.
  // ───────────────────────────────────────────────────────────
  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      const payload = decodeJwtPayload(storedToken);
      if (payload) {
        setToken(storedToken);
        setUser({
          // ASP.NET Core uses full claim-type URIs in the JWT payload
          name:  payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']  || payload.name  || '',
          email: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || payload.email || '',
          role:  payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || payload.role  || 'student',
        });
      } else {
        // Corrupt token — clear storage
        localStorage.removeItem('jwtToken');
      }
    }
  }, []);

  // ───────────────────────────────────────────────────────────
  // login(responseToken)
  //   Call this after a successful POST /api/auth/login.
  //   It saves the JWT to localStorage and decodes the user
  //   identity from the token payload.
  //
  //   Example usage in Login.jsx:
  //     const { login } = useAuth();
  //     const res = await apiClient.post('/auth/login', credentials);
  //     login(res.data.Token);
  // ───────────────────────────────────────────────────────────
  const login = (responseToken) => {
    localStorage.setItem('jwtToken', responseToken);
    const payload = decodeJwtPayload(responseToken);
    if (payload) {
      setToken(responseToken);
      setUser({
        name:  payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']  || payload.name  || '',
        email: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || payload.email || '',
        role:  payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || payload.role  || 'student',
      });
    }
  };

  // ───────────────────────────────────────────────────────────
  // logout()
  //   Clears the JWT from browser memory, resets state, and
  //   lets ProtectedRoute redirect the user to /login.
  // ───────────────────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem('jwtToken');
    setToken(null);
    setUser(null);
  };

  // The value object is what every useAuth() consumer receives
  const contextValue = {
    user,   // { name, email, role } | null
    token,  // JWT string            | null
    login,  // (responseToken) => void
    logout, // () => void
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. useAuth — Custom Hook
//    Gives any component one-line access to auth state.
//
//    Usage anywhere in the app:
//      const { user, login, logout, isAuthenticated } = useAuth();
// ─────────────────────────────────────────────────────────────
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an <AuthProvider>. Wrap your app in <AuthProvider> in main.jsx.');
  }
  return context;
}

export default AuthContext;
