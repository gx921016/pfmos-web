import { User } from "./screens/project-list/search-panel";

const apiUrl = process.env.REACT_APP_API_URL;
export const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ data }: { data: User }) => {
  console.log(data);
  window.localStorage.setItem(localStorageKey, data.token || "");
  // window.location.reload();
  return data;
};

export const login = (params: { username: string; password: string }) => {
  console.log("调用了login");
  return fetch(`${apiUrl}user/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.code === 200) {
        console.log(data.data);
        return handleUserResponse(data);
      } else {
        return Promise.reject(new Error(data.msg));
      }
    });
};

export const register = (params: { username: string; password: string }) => {
  return fetch(`${apiUrl}user/v1/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.code === 200) {
        console.log(data.data);
        // return Promise.resolve;
      } else {
        return Promise.reject(data.msg);
      }
    });
};

export const logout = async () => {
  let token;
  token = window.localStorage.getItem(localStorageKey);
  fetch(`${apiUrl}user/v1/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "sa-token": token ? token.toString() : "",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.code === 200) {
        console.log("退出登录成功");
        window.localStorage.removeItem(localStorageKey);
      } else {
        console.log(data.msg);
        return Promise.reject(data.msg);
      }
    });
};
