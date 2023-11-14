import { userService } from "@/api/users";
import Header from "@/components/Header";
import SettingsList from "@/components/Settings/SettingsList";
import { authOptions } from "@/lib/util/authOptions";
import { getServerSession } from "next-auth";
import { FC } from "react";

interface SettingsProps {}

const Settings: FC<SettingsProps> = async ({}) => {
  const session: any = await getServerSession(authOptions);

  const userData = await userService.getOrCreate(session.accessToken);

  return (
    <main
      className={`flex min-h-screen flex-col ${
        userData.theme === "default"
          ? "bg-light_bg dark:bg-dark_bg"
          : `bg-${userData.theme}`
      } items-center justify-center`}
    >
      <Header user={userData} />
      <SettingsList user={userData} />
    </main>
  );
};

export default Settings;
