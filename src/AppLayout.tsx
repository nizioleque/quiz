import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return <div className="h-full flex flex-col p-4">{children}</div>;
}

export default AppLayout;
