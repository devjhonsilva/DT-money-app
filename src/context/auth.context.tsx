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
import { IUser } from "@/shared/interfaces/https/user-interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAuthenticateResponse } from "@/shared/interfaces/https/authenticate-response";

type AuthContextType = {
  user: IUser | null;
  token: string | null;
  handleAutenticate: (params: FormLoginParams) => Promise<void>;
  handleRegister: (params: FormRegisterParams) => Promise<void>;
  handleLogout: () => void;
  restoreUserSession: () => Promise<string | null>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleAutenticate = async (userData: FormLoginParams) => {
    const { token, user } = await authService.autenticate(userData);
    await AsyncStorage.setItem(
      "dt-money-user",
      JSON.stringify({ user, token })
    );
    setToken(token);
    setUser(user);
  };

  const handleRegister = async (formData: FormRegisterParams) => {
    const { token, user } = await authService.registerUser(formData);
    await AsyncStorage.setItem(
      "dt-money-user",
      JSON.stringify({ user, token })
    );
    setToken(token);
    setUser(user);
  };

  const restoreUserSession = async () => {
    const userdata = await AsyncStorage.getItem("dt-money-user");
    if (userdata) {
      const { token, user } = JSON.parse(userdata) as IAuthenticateResponse;
      setToken(token);
      setUser(user);
    }
    return userdata;
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleLogout,
        handleRegister,
        handleAutenticate,
        restoreUserSession,
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
