import React from "react";
import { useAuth } from "./context/auth-context";
import ProjectListScreen from "./screens/project-list";
import styled from "@emotion/styled";
import { Button } from "antd";

const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <header>
        <Button onClick={logout}>登出</Button>
      </header>
      <main>
        <ProjectListScreen />
      </main>
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

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem calc(100vh - 6rem);
`;

export default AuthenticatedApp;
