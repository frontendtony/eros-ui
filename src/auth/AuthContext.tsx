import UserSchema from "@/schemas/auth/UserSchema";
import { Preferences } from "@capacitor/preferences";
import { createContext, useEffect, useState } from "react";
import { z } from "zod";

type User = z.infer<typeof UserSchema>;

export interface AuthContextType {
  user: User | null;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      setLoading(true);

      const user = await Preferences.get({ key: "user" });
      setUser(user.value ? JSON.parse(user.value) : null);

      setLoading(false);
    }

    loadUser();
  }, []);

  function logout() {
    setUser(null);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
