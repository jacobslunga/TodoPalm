import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextProps {
  theme: Theme;
  effectiveTheme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? (storedTheme as Theme) : "system";
  });
  const [effectiveTheme, setEffectiveTheme] = useState<Theme>("light");

  const themes: Theme[] = ["light", "dark", "system"];

  useEffect(() => {
    const root = window.document.documentElement;
    const body = document.body;

    const applyTheme = (theme: Theme) => {
      if (theme === "system") {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        const appliedTheme = prefersDark ? "dark" : "light";
        setEffectiveTheme(appliedTheme);
        root.className = appliedTheme;
        body.className = appliedTheme;
      } else {
        setEffectiveTheme(theme);
        root.className = theme;
        body.className = theme;
      }
    };

    applyTheme(theme);

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        const appliedTheme = e.matches ? "dark" : "light";
        setEffectiveTheme(appliedTheme);
        root.className = appliedTheme;
        body.className = appliedTheme;
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme]);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, effectiveTheme, setTheme: changeTheme, themes }}
    >
      <div className={effectiveTheme}>{children}</div>
    </ThemeContext.Provider>
  );
};
