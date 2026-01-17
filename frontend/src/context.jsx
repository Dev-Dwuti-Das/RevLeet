import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({ loggedIn: false, loading: true });

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/me", { credentials: "include" })
      .then(res => setLoggedIn(res.ok))
      .catch(() => setLoggedIn(false))
      .finally(() => setLoading(false)); 
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}