import axios from "axios";
import { Platform } from "react-native";

const baseURL = Platform.select({
  ios: "http://localhost:3001",
  android: "http://192.168.10.13:3001",

  // se for utilizar o emulador de android, utilizar ip "http://10.0.2.2:3001"
});

export const dtMoneyApi = axios.create({
  baseURL,
});
