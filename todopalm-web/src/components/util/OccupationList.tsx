import { Listbox, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import { Check, Link2 } from "react-feather";

interface OccupationListProps {
  occupation: any;
  setOccupation: any;
}

const occupations = [
  { occupation: "Student" },
  { occupation: "Developer" },
  { occupation: "Designer" },
  { occupation: "Educator" },
  { occupation: "Entrepreneur" },
  { occupation: "Researcher" },
  { occupation: "Healthcare Professional" },
  { occupation: "Engineer" },
  { occupation: "Artist" },
  { occupation: "Freelancer" },
  { occupation: "Other" },
];

const OccupationList: FC<OccupationListProps> = ({
  occupation,
  setOccupation,
}) => {
  return (
    <div className="w-72">
      <Listbox value={occupation} onChange={(e) => setOccupation(e)}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate text-black dark:text-white">
              {occupation.occupation}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <Link2 className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {occupations.map((occupation, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200"
                        : "text-gray-900 dark:text-gray-100"
                    }`
                  }
                  value={occupation}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {occupation.occupation}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-300">
                          <Check className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default OccupationList;
