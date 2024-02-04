import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

interface AuthContextProps {
  userToken: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getAccessTokenSilently, getAccessTokenWithPopup, isAuthenticated } =
    useAuth0();
  const [userToken, setUserToken] = useState<string>("");
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    let token: string | undefined;
    const fetchToken = async () => {
      try {
        token = await getAccessTokenSilently({
          authorizationParams: { audience: audience },
        });
      } catch (error) {
        token = await getAccessTokenWithPopup({
          authorizationParams: { audience: audience },
        });
      }

      if (token) {
        setUserToken(token);
      } else {
        throw new Error("No token found");
      }
    };

    fetchToken();
  }, [
    getAccessTokenSilently,
    getAccessTokenWithPopup,
    audience,
    isAuthenticated,
  ]);

  return (
    <AuthContext.Provider value={{ userToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
