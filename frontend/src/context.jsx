import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({ loggedIn: false, loading: true, isDemo: false });

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  const refreshAuth = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/me", { credentials: "include" });
      setLoggedIn(res.ok);
      if (!res.ok) {
        setIsDemo(false);
        return;
      }
      const data = await res.json();
      setIsDemo(Boolean(data?.demo));
    } catch {
      setLoggedIn(false);
      setIsDemo(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, loading, isDemo, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
