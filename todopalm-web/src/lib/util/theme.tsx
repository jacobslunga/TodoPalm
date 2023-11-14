export function shouldBeBlackText(theme: string): boolean {
  switch (theme) {
    case "polar-bg":
      return true;
    case "vintage-bg":
      return true;
    case "sakura-bg":
      return true;
  }

  return false;
}
