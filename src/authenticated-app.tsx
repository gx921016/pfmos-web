import React from "react";
import { useAuth } from "./context/auth-context";
import ProjectListScreen from "./screens/project-list";
import styled from "@emotion/styled";
import { Button, Dropdown, Image, Menu } from "antd";
import { Row } from "./components/lib";
import Logo from "./assets/logo_a.png";
const AuthenticatedApp = () => {
  // const { logout, user } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <Image preview={false} style={{ height: "25rem" }} src={Logo} />
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <User />
        </HeaderRight>
      </Header>

      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};
const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={<Menu items={[{ key: "1", label: "退出", onClick: logout }]} />}
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

// temporal dead zone(暂时性死区)
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  //height: 10rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;
export default AuthenticatedApp;
