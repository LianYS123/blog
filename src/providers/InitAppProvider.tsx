import React from "react";
import { useInitApp } from "hooks/app";

export const InitAppProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  useInitApp();
  return <>{children}</>;
};
