import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({ loggedIn: false, loading: true, isDemo: false });
const DEMO_MODE_KEY = "revleet_demo_mode";

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem(DEMO_MODE_KEY) === "1");
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(() => sessionStorage.getItem(DEMO_MODE_KEY) === "1");

  const refreshAuth = async () => {
    setLoading(true);
    const demoActive = sessionStorage.getItem(DEMO_MODE_KEY) === "1";
    if (demoActive) {
      setLoggedIn(true);
      setIsDemo(true);
      setLoading(false);
      return;
    }
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

  const enterDemo = async () => {
    try {
      await fetch("/api/demo-login", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Continue with local demo mode fallback.
    }
    sessionStorage.setItem(DEMO_MODE_KEY, "1");
    setIsDemo(true);
    setLoggedIn(true);
    setLoading(false);
  };

  const exitDemo = () => {
    sessionStorage.removeItem(DEMO_MODE_KEY);
    setIsDemo(false);
    setLoggedIn(false);
    setLoading(false);
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, loading, isDemo, refreshAuth, enterDemo, exitDemo }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
