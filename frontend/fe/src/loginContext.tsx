import { createContext, useState, ReactNode } from "react";
import Cookies from "js-cookie";

interface LoginProviderProps {
  children: ReactNode;
}

interface User {
  email: string;
}

interface LoginContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

// Define a custom interface for cookie options
interface CookieOptions {
  secure?: boolean;
  expires?: number | Date;
  domain?: string;
  path?: string;
  sameSite?: "strict" | "lax" | "none";
}

const defaultUser: User = {
  email: "",
};

const defaultContext: LoginContextProps = {
  user: defaultUser,
  setUser: () => {},
};

export const LoginContext = createContext(defaultContext);

export function LoginProvider({ children }: LoginProviderProps) {
  const [user, setUser] = useState<User>(() =>
    JSON.parse(Cookies.get("user") || JSON.stringify(defaultUser))
  );

  // Adjust cookie settings to include 'secure' and 'SameSite' attributes
  const cookieOptions: CookieOptions = {
    secure: true, // Ensures cookies are sent over secure HTTPS connections
    sameSite: "strict", // Controls when cookies are sent in cross-site requests
  };

  // Set the cookie with the adjusted options
  const setUserCookie = (user: User) => {
    Cookies.set("user", JSON.stringify(user), cookieOptions);
  };

  return (
    <LoginContext.Provider
      value={{
        user,
        setUser: (newUser) => {
          setUser((prevState) => {
            const updatedUser =
              typeof newUser === "function" ? newUser(prevState) : newUser;
            setUserCookie(updatedUser);
            return updatedUser;
          });
        },
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
