import React from "react";
import { useAuthInitialization } from "./hooks/useAuthInitialization";
import { AuthWrapperProps } from "./types";

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  useAuthInitialization();
  return <>{children}</>;
};

export default AuthWrapper;
