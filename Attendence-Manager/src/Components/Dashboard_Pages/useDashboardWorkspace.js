import { useContext } from "react";

import DashboardWorkspaceContext from "./DashboardWorkspaceContext";

export default function useDashboardWorkspace() {
  const context = useContext(DashboardWorkspaceContext);

  if (!context) {
    throw new Error("useDashboardWorkspace must be used inside DashboardWorkspaceProvider.");
  }

  return context;
}
