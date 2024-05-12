import STORAGE_KEYS from "@/constants/storageKeys";
import TokenClaims from "@/schemas/auth/TokenClaims";
import UserSchema from "@/schemas/auth/UserSchema";
import { Preferences } from "@capacitor/preferences";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { z } from "zod";

type User = z.infer<typeof UserSchema>;

export interface AuthContextType {
  user: User | null;
  tokenClaims: z.infer<typeof TokenClaims> | null;
  authenticate: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
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
  const [tokenClaims, setTokenClaims] = useState<z.infer<
    typeof TokenClaims
  > | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const user = await Preferences.get({ key: STORAGE_KEYS.USER });
        const token = await Preferences.get({ key: STORAGE_KEYS.TOKEN });

        setUser(user.value ? UserSchema.parse(JSON.parse(user.value)) : null);
        setTokenClaims(
          token.value ? TokenClaims.parse(jwtDecode(token.value)) : null
        );
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function logout() {
    setUser(null);
    setTokenClaims(null);

    await Preferences.remove({ key: STORAGE_KEYS.USER });
    await Preferences.remove({ key: STORAGE_KEYS.TOKEN });
  }

  async function authenticate(token: string, user: User) {
    const decodedToken = jwtDecode(token);

    const claims = TokenClaims.parse(decodedToken);

    setUser(user);
    setTokenClaims(claims);

    await Preferences.set({
      key: STORAGE_KEYS.USER,
      value: JSON.stringify(user),
    });
    await Preferences.set({ key: STORAGE_KEYS.TOKEN, value: token });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, logout, tokenClaims, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
}
