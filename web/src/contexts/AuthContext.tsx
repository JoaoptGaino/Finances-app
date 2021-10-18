import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/router";

import { api } from "../services/api";

type SignInData = {
  email: string;
  password: string;
};
type ResponseData = {
  data: {
    token: string;
    user: {
      username: string;
      email: string;
    };
  };
};
type User = {
  username: string;
  email: string;
};
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;
  const router = useRouter();

  useEffect(() => {
    const { finances_token: token } = parseCookies();

    if (!token) {
      router.push("/");
    } else {
      verifyJwt(token);
    }
  }, []);
  async function verifyJwt(token: string) {
    const {
      data: { user },
    }: ResponseData = await api.post("/auth/verify-jwt", { token });
    setUser(user);
  }
  async function signIn({ email, password }: SignInData) {
    const {
      data: { token, user },
    }: ResponseData = await api.post("/auth/login", {
      email,
      password,
    });
    setCookie(undefined, "finances_token", token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    api.defaults.headers!.authorization = `Bearer ${token}`;
    setUser(user);

    router.push("/dashboard");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
