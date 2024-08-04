import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      {children}
    </div>
  );
}

export default AppLayout;
