import React, { useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import "../../utils/";
import { useDebounce, useDocumentTitle } from "../../utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";

function ProjectListScreen() {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 500);

  const { isLoading, error, data: list } = useProjects(debouncedParam);
  const { data: users } = useUsers();

  useDocumentTitle("项目列表", false);
  //拿到用户列表
  // useMount(() => {
  //   client("user/v1/users").then((res) => setUsers(res.data));
  // });
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List dataSource={list || []} loading={isLoading} users={users || []} />
    </Container>
  );
}

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListScreen;
