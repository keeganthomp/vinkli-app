import React, { useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@lib/supabase';
import { router } from 'expo-router';

type AuthContextT = {
  session?: Session | null;
  setSession: (session: Session | null) => void;
  isLoading: boolean;
};

const AuthContext = React.createContext<AuthContextT | null>(null);

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext) as AuthContextT;
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [session, setSession] = React.useState<Session | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => {
        const existingSession = data?.session;
        if (existingSession) {
          setSession(existingSession);
        }
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setSession,
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
