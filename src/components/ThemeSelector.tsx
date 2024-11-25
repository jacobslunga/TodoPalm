import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { FC } from "react";

const ThemeSelector: FC = () => {
  const { setTheme, effectiveTheme, themes } = useTheme();

  const themeIcons = {
    light: Sun,
    dark: Moon,
  };

  const Icon = themeIcons[effectiveTheme as keyof typeof themeIcons];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="active:outline-none focus:outline-none">
        <Icon className="w-6 h-6" style={{ zIndex: 10000 }} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((t) => (
          <DropdownMenuItem key={t} onClick={() => setTheme(t)}>
            {capitalizeFirstLetter(t)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

function capitalizeFirstLetter(val: string) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

export default ThemeSelector;
