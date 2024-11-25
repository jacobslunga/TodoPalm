import ProfileDialog from "@/components/ProfileDialog";
import ThemeSelector from "@/components/ThemeSelector";
import { FC } from "react";
import { Link } from "react-router-dom";

const Header: FC = () => {
  return (
    <nav className="flex flex-row items-center justify-between bg-background h-20 sticky top-0 w-full">
      <Link
        to="/"
        className="flex flex-row select-none items-end justify-center space-x-2"
      >
        <img
          src="/todopalm-logo.png"
          alt="Logo"
          className="w-10 h-10 rounded-full"
        />
        <h1 className="text-xl font-bold">TodoPalm</h1>
      </Link>

      <div className="flex flex-row items-center justify-center space-x-4">
        <ProfileDialog />
        <ThemeSelector />
      </div>
    </nav>
  );
};

export default Header;
