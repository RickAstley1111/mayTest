import axios, { type InternalAxiosRequestConfig } from "axios";
import CryptoJS from "crypto-js";

function generateSign(
  method: string,
  path: string,
  body: any,
  secret: string
): string {
  let bodyStr = "";
  if (body && (method === "POST" || method === "PATCH")) {
    bodyStr = JSON.stringify(body);
  }

  const signStr = method + path + bodyStr + secret;
  return CryptoJS.MD5(signStr).toString();
}

export const API = axios.create({
  baseURL: "https://lavina.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const key = localStorage.getItem("key") || "";
  const secret = localStorage.getItem("secret") || "";

  const method = config.method?.toUpperCase() || "GET";

  const url = config.url || "/";
  const base = config.baseURL || API.defaults.baseURL || "";
  const path = new URL(url, base).pathname;

  const sign = generateSign(method, path, config.data, secret);

  config.headers["Key"] = key;
  config.headers["Sign"] = sign;

  return config;
});