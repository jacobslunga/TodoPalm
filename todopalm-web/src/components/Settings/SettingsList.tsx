"use client";

import { FC } from "react";

interface SettingsListProps {
  user: any;
}

const SettingsList: FC<SettingsListProps> = ({ user }) => {
  return (
    <div
      className={`h-[80vh] absolute bottom-0 px-[5%] sm:px-[10%] md:px-[20%] lg:px-[25%] w-full justify-start flex flex-col`}
    ></div>
  );
};

export default SettingsList;
