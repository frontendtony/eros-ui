import STORAGE_KEYS from "@/constants/storageKeys";
import TokenClaims from "@/schemas/auth/TokenClaims";
import UserSchema from "@/schemas/auth/UserSchema";
import EstateSchema from "@/schemas/estate/EstateSchema";
import apiClient from "@/utils/apiClient";
import { Preferences } from "@capacitor/preferences";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { z } from "zod";

type User = z.infer<typeof UserSchema>;
type Estate = z.infer<typeof EstateSchema>;

export interface AuthContextType {
  user: User | null;
  tokenClaims: z.infer<typeof TokenClaims> | null;
  authenticate: (token: string, user: User) => Promise<void>;
  estate: Estate | null;
  setEstate: (estate: Estate) => Promise<void>;
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
  const [estate, setEstateDispatch] = useState<Estate | null>(null);
  const [tokenClaims, setTokenClaims] = useState<z.infer<
    typeof TokenClaims
  > | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const user = await Preferences.get({ key: STORAGE_KEYS.USER });
        const token = await Preferences.get({ key: STORAGE_KEYS.TOKEN });
        const estateResult = await Preferences.get({
          key: STORAGE_KEYS.ESTATE,
        });

        const estate = estateResult.value
          ? EstateSchema.parse(JSON.parse(estateResult.value))
          : null;

        apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
        apiClient.defaults.headers.common["EstateId"] = estate?.id;

        setUser(user.value ? UserSchema.parse(JSON.parse(user.value)) : null);
        setEstateDispatch(estate);
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
    setEstateDispatch(null);
    setTokenClaims(null);

    await Preferences.remove({ key: STORAGE_KEYS.USER });
    await Preferences.remove({ key: STORAGE_KEYS.TOKEN });
    await Preferences.remove({ key: STORAGE_KEYS.ESTATE });
  }

  async function authenticate(token: string, user: User) {
    const decodedToken = jwtDecode(token);

    const claims = TokenClaims.parse(decodedToken);

    setUser(user);
    setTokenClaims(claims);

    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;

    await Preferences.set({
      key: STORAGE_KEYS.USER,
      value: JSON.stringify(user),
    });
    await Preferences.set({ key: STORAGE_KEYS.TOKEN, value: token });
  }

  async function setEstate(estate: Estate) {
    apiClient.defaults.headers.common["EstateId"] = estate.id;

    setEstateDispatch(estate);
    await Preferences.set({
      key: STORAGE_KEYS.ESTATE,
      value: JSON.stringify(estate),
    });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ user, estate, logout, tokenClaims, authenticate, setEstate }}
    >
      {children}
    </AuthContext.Provider>
  );
}
