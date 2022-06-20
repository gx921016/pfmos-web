import React from "react";
import "./App.css";
// import { LoginScreen } from "./unauthenticated-app/login";
import { useAuth } from "./context/auth-context";
import AuthenticatedApp from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";
// import ProjectListScreen from "./screens/project-list";

function App() {
  const { user } = useAuth();

  return (
    <div className={"App"}>
      {user?.token ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
