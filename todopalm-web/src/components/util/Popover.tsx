import { Popover as PopoverComponent } from "@headlessui/react";
import { MoreVertical } from "react-feather";

function Popover() {
  return (
    <PopoverComponent className="relative">
      <PopoverComponent.Button>
        <MoreVertical
          size={20}
          className="text-[rgba(0,0,0,0.5)] hover:text-black transition-colors ml-5 duration-200 ease-linear dark:text-[rgba(255,255,255,0.5)] dark:hover:text-white m-0 p-0"
        />
      </PopoverComponent.Button>

      <PopoverComponent.Panel className="absolute z-10 p-3 rounded-xl bg-white dark:bg-black">
        <div className="grid grid-cols-2">
          <a href="/analytics">Analytics</a>
          <a href="/engagement">Engagement</a>
          <a href="/security">Security</a>
          <a href="/integrations">Integrations</a>
        </div>

        <img src="/solutions.jpg" alt="" />
      </PopoverComponent.Panel>
    </PopoverComponent>
  );
}

export default Popover;
