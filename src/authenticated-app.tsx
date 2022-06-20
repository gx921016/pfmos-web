import React from "react";
import { useAuth } from "./context/auth-context";
import ProjectListScreen from "./screens/project-list";
import styled from "@emotion/styled";
import { Button } from "antd";
import { Row } from "./components/lib";

const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h3>Logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <Button onClick={logout}>登出</Button>
        </HeaderRight>
      </Header>

      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

// const PageHeader = styled.header`
//   height: 6rem;
//   background-color: aqua;
// `;
// const Main = styled.main`
//   height: calc(100vh - 6rem);
// `;

// temporal dead zone(暂时性死区)
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)``;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;
export default AuthenticatedApp;
