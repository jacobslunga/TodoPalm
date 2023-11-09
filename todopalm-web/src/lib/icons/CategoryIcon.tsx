import { FC, SVGAttributes } from "react";
import {
  Activity,
  BarChart,
  Book,
  Coffee,
  Map,
  ShoppingCart,
  Sun,
  User,
  Users,
} from "react-feather";

type IconType = FC<SVGAttributes<SVGElement> & { size?: number | string }>;

export const ICON_MAP: { [key: string]: IconType } = {
  School: Book,
  Work: Coffee,
  Personal: User,
  Shopping: ShoppingCart,
  Travel: Map,
  Family: Users,
  Health: Activity,
  Finance: BarChart,
  Hobbies: Sun,
};

interface CategoryIconProps extends SVGAttributes<SVGElement> {
  iconName: string;
  size?: number | string;
}

const CategoryIcon: FC<CategoryIconProps> = ({ iconName, size, ...props }) => {
  const IconComponent = ICON_MAP[iconName];
  return IconComponent ? <IconComponent size={size} {...props} /> : null;
};

export default CategoryIcon;
