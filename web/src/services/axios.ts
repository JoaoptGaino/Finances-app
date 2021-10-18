import axios from "axios";
import { parseCookies } from "nookies";
export function getApiClient(ctx?: any) {
  const { finances_token: token } = parseCookies(ctx);
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  if (token) {
    api.defaults.headers!.authorization = `Bearer ${token}`;
  }
  return api;
}
