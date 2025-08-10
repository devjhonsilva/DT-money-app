import { FormLoginParams } from "@/screens/Login/LoginForm";
import { FormRegisterParams } from "@/screens/Register/RegisterForm";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import * as authService from "@/shared/services/dt-money/auth.service";
import { set } from "react-hook-form";
import { IUser } from "@/shared/interfaces/https/user-interface";

type AuthContextType = {
  user: IUser | null;
  token: string | null;
  handleAutenticate: (params: FormLoginParams) => Promise<void>;
  handleRegister: (params: FormRegisterParams) => Promise<void>;
  handleLogout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleAutenticate = async (userData: FormLoginParams) => {
    const { token, user } = await authService.autenticate(userData);
    console.log(token, user);
    setToken(token);
    setUser(user);
  };

  const handleRegister = async (formData: FormRegisterParams) => {
    const { token, user } = await authService.registerUser(formData);
    setToken(token);
    setUser(user);
  };

  const handleLogout = () => {};

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleLogout,
        handleRegister,
        handleAutenticate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  return context;
};
