import { User } from "../screens/project-list/search-panel";
import { useAsync } from "./use-async";
import { useHttp } from "./http";
import { useEffect } from "react";

export const useUsers = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();
  //拿到项目列表
  useEffect(() => {
    run(client("user/v1/users").then((res) => res.data));
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
  console.log(result);
  return result;
};
