import React from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import "../../utils/";
import { useDebounce, useDocumentTitle } from "../../utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
// import { useUrlQueryParam } from "../../utils/url";
import { useProjcetSearchParams } from "./util";

function ProjectListScreen() {
  const [projectParam, setParam] = useProjcetSearchParams();

  const {
    isLoading,
    error,
    retry,
    data: list,
  } = useProjects(useDebounce(projectParam, 200));
  const { data: users } = useUsers();

  useDocumentTitle("项目列表", false);
  //拿到用户列表
  // useMount(() => {
  //   client("user/v1/users").then((res) => setUsers(res.data));
  // });
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        users={users || []}
        param={projectParam}
        setParam={setParam}
      />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        dataSource={list || []}
        loading={isLoading}
        users={users || []}
      />
    </Container>
  );
}

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListScreen;
