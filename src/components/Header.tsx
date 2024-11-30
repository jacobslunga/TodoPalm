import HistoryDialog from "@/components/HistoryDialog";
import ThemeSelector from "@/components/ThemeSelector";
import { format } from "date-fns/format";
import { FC, useEffect, useState } from "react";

const Header: FC = () => {
  const [pageTitle, setPageTitle] = useState<string>("");
  const today = new Date().toISOString().split("T")[0];
  const formattedDate = format(today, "EEEE, dd MMMM yyyy");

  useEffect(() => {
    const storedTitle = localStorage.getItem("pageTitle");
    if (storedTitle) {
      setPageTitle(storedTitle);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pageTitle", pageTitle);
  }, [pageTitle]);

  return (
    <nav className="flex flex-row items-center justify-between bg-background p-3 z-50 fixed top-0 w-screen md:w-5/6 lg:w-2/3 px-4">
      {/* Editable Page Title */}
      <div className="flex flex-row select-none items-center justify-center space-x-5">
        <div className="flex flex-row items-center justify-center space-x-2">
          <img
            src="/TodoPalm/todopalm-logo.png"
            alt="Logo"
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-lg font-semibold">TodoPalm.</h1>
        </div>

        <p className="text-foreground/50 hidden md:flex">\</p>

        <div className="text-xs font-medium hidden md:flex rounded-xl bg-foreground/5 p-3 border mesh">
          {formattedDate}
        </div>
      </div>

      {/* Profile and Theme */}
      <div className="flex flex-row items-center justify-center space-x-4">
        <HistoryDialog />
        <ThemeSelector />
      </div>
    </nav>
  );
};

export default Header;
