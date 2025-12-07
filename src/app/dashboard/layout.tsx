import UserSync from "@/components/UserSync";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <UserSync />
      {children}
    </>
  );
};

export default Layout;
