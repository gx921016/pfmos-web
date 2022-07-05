import { useCallback, useEffect } from "react";
import { cleanObject } from "./index";
import { useAsync } from "./use-async";
import { Project } from "../screens/project-list/list";
import { useHttp } from "./http";

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();
  const fetchProjects = useCallback(
    () =>
      client("project/v1/projects", { data: cleanObject(param || {}) }).then(
        (res) => res.data.records
      ),
    [param, client]
  );
  //拿到项目列表
  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
  }, [param, fetchProjects, run]);
  console.log(result);
  return result;
};

export interface PinParam {
  pinId: string;
  projectId: number;
  pin: boolean;
}

export const useEditProject = () => {
  const { run, ...result } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<PinParam>) => {
    return run(
      client(`project/v1/updatePin`, { data: params, method: "PATCH" })
    );
  };

  console.log(result);
  return {
    mutate,
    ...result,
  };
};
