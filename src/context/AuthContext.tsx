import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { getCookie, setCookie } from '../utils/storage';

// Демо-учётка администратора.
const ADMIN_LOGIN = 'admin';
const ADMIN_PASSWORD = 'admin';
const AUTH_COOKIE = 'rental.auth';

interface AuthContextValue {
  isAdmin: boolean;
  login: (login: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(
    () => getCookie(AUTH_COOKIE) === '1',
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      isAdmin,
      login: (login, password) => {
        const ok = login === ADMIN_LOGIN && password === ADMIN_PASSWORD;
        if (ok) {
          setIsAdmin(true);
          setCookie(AUTH_COOKIE, '1', 7);
        }
        return ok;
      },
      logout: () => {
        setIsAdmin(false);
        setCookie(AUTH_COOKIE, '0', -1);
      },
    }),
    [isAdmin],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth должен использоваться внутри AuthProvider');
  return ctx;
}
