import React from "react";
import "./App.css";
// import { LoginScreen } from "./unauthenticated-app/login";
import { useAuth } from "./context/auth-context";
import AuthenticatedApp from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";
import { ErrorBoundary } from "./components/error-boundary";
import { FullPageErrorFallback } from "./components/lib";
// import ProjectListScreen from "./screens/project-list";

function App() {
  const { user } = useAuth();

  return (
    <div className={"App"}>
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
