import Header from "@/components/Header";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const MainLayout: FC = () => {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center bg-background px-32">
      <Header />
      <Outlet />
    </main>
  );
};

export default MainLayout;
