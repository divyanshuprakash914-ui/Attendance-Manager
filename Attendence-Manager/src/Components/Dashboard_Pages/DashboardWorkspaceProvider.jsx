import DashboardWorkspaceContext from "./DashboardWorkspaceContext";

export default function DashboardWorkspaceProvider({ value, children }) {
  return <DashboardWorkspaceContext.Provider value={value}>{children}</DashboardWorkspaceContext.Provider>;
}
