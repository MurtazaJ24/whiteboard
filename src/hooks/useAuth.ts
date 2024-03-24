import Keycloak from "keycloak-js";
import { useEffect, useRef, useState } from "react";
import useLocalStorage from "./useLocalStorage";

const useAuth = () => {
  const isInitialized = useRef(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [_, setUser] = useLocalStorage("user", {});

  useEffect(() => {
    if (isInitialized.current) return;

    isInitialized.current = true;
    const client = new Keycloak({
      url: import.meta.env.VITE_KEYCLOAK_URL,
      realm: import.meta.env.VITE_KEYCLOAK_REALM,
      clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
    });

    client.init({ onLoad: "login-required" }).then((authenticated) => {
      console.log(client);
      setIsLoggedIn(authenticated);
      setUser({
        
        id: client.tokenParsed?.sub ?? "",
        name: (client.tokenParsed?.name ?? ""),
        username: client.tokenParsed?.preferred_username ?? "",
      })
    });
  }, []);

  return { isLoggedIn };
};

export default useAuth;
