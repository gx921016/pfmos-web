import qs from "qs";
// import * as auth from "../auth-provider";
import { useAuth } from "../context/auth-context";
import { localStorageKey } from "../auth-provider";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      "sa-token": token ? token : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  async function logout() {
    // await auth.logout();
    window.localStorage.removeItem(localStorageKey);
    window.location.reload();
    return Promise.reject({ message: "请重新登录" });
  }

  return window.fetch(`${apiUrl}${endpoint}`, config).then(async (response) => {
    if (response.ok) {
      let data = await response.json();
      if (data.code === 200) {
        return data;
      } else if (data.code === 403) {
        return await logout();
      } else {
        return Promise.reject(data);
      }
    }
    if (response.status === 403) {
      return await logout();
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
