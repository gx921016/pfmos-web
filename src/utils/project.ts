import { useEffect } from "react";
import { cleanObject } from "./index";
import { useAsync } from "./use-async";
import { Project } from "../screens/project-list/list";
import { useHttp } from "./http";

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();
  //拿到项目列表
  useEffect(() => {
    run(
      client("project/v1/projects", { data: cleanObject(param || {}) }).then(
        (res) => res.data.records
      )
    );
  }, [param]); //eslint-disable-line react-hooks/exhaustive-deps
  console.log(result);
  return result;
};
