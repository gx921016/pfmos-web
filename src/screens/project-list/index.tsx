import React, { useEffect, useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import qs from "qs";
import "../../utils/";
import { cleanObject, useDebounce, useMount } from "../../utils";

const apiUrl = process.env.REACT_APP_API_URL;

function ProjectListScreen() {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 200);

  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  //拿到项目列表
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`)
      .then((res) => res.json())
      .then((data) => setList(data));
  }, [debouncedParam]);
  //拿到用户列表
  useMount(() => {
    fetch(`${apiUrl}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  });
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </div>
  );
}

export default ProjectListScreen;
