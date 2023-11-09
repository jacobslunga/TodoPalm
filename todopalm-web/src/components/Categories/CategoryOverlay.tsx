import { authOptions } from "@/lib/util/authOptions";
import { getServerSession } from "next-auth";
import { FC } from "react";
import ChooseCategoriesModal from "./ChooseCategoriesModal";

interface CategoryOverlayProps {}

const CategoryOverlay: FC<CategoryOverlayProps> = async ({}) => {
  const session: any = await getServerSession(authOptions);

  return (
    <div className="flex flex-row bg-gradient-radial bg-[rgba(247,248,243,0.4)] dark:bg-[rgba(19,20,21,0.7)] items-center justify-center z-50 w-full h-full fixed top-0 left-0">
      <ChooseCategoriesModal accessToken={session.accessToken} />
    </div>
  );
};

export default CategoryOverlay;
