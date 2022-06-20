import React, { useEffect, useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import "../../utils/";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { localStorageKey } from "../../auth-provider";
import { useHttp } from "../../utils/http";

const apiUrl = process.env.REACT_APP_API_URL;

function ProjectListScreen() {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 500);

  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  const client = useHttp();
  //拿到项目列表
  useEffect(() => {
    client("project/v1/projects", { data: cleanObject(debouncedParam) }).then(
      (res) => {
        setList(res.data.records);
      }
    );
  }, [debouncedParam]); // eslint-disable-line react-hooks/exhaustive-deps
  //拿到用户列表
  useMount(() => {
    let token = window.localStorage.getItem(localStorageKey);
    fetch(`${apiUrl}user/v1/users`, {
      headers: {
        "sa-token": token ? token.toString() : "",
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data.data));
  });
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </div>
  );
}

export default ProjectListScreen;
