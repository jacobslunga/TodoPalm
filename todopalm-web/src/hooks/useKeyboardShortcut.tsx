import { useEffect } from "react";

const useKeyboardShortcut = (keyCombination: string, callback: () => void) => {
  useEffect(() => {
    const handler = (event: any) => {
      if ((event.ctrlKey || event.metaKey) && event.key === keyCombination) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [keyCombination, callback]);
};

export { useKeyboardShortcut };
