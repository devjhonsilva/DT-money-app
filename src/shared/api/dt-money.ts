import axios from "axios";
import { Platform } from "react-native";
import { AppError } from "../helpers/AppError";
import { addTokenToRequest } from "../helpers/axios.helper";

const baseURL = Platform.select({
  ios: "http://localhost:3001",
  android: "http://192.168.10.10:3001",

  // se for utilizar o emulador de android, utilizar ip "http://10.0.2.2:3001"
  // se utilizar dispositivo fisico, utilizar "http://192.168.10.13:3001" verificar o ip do computador
});

export const dtMoneyApi = axios.create({
  baseURL,
});

addTokenToRequest(dtMoneyApi);

dtMoneyApi.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(new AppError("Falha na requisição."));
    }
  }
);
