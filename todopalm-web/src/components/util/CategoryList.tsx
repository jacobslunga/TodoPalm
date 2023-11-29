import { shouldBeBlackText } from "@/lib/util/theme";
import { Listbox, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import { Check, Hash } from "react-feather";

interface CategoryListProps {
  category: any;
  setCategory: any;
  user: any;
}

const CategoryList: FC<CategoryListProps> = ({
  category,
  setCategory,
  user,
}) => {
  const userTheme = user.theme;
  const blackText = shouldBeBlackText(userTheme);

  return (
    <div className="w-72">
      <Listbox value={category} onChange={(e) => setCategory(e)}>
        <div className="relative mt-1">
          <Listbox.Button
            className={`relative w-full cursor-default rounded-lg ${
              userTheme === "default"
                ? "bg-white dark:bg-black"
                : blackText
                ? "bg-white"
                : "bg-black"
            } py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm`}
          >
            <span
              className={`block truncate ${
                userTheme === "default"
                  ? "text-black dark:text-white"
                  : blackText
                  ? "text-black"
                  : "text-white"
              }`}
            >
              {category}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <Hash className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={`absolute mt-1 max-h-60 w-full overflow-auto rounded-md ${
                userTheme === "defualt"
                  ? "bg-white dark:bg-black"
                  : blackText
                  ? "bg-white"
                  : "bg-black"
              } py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm`}
            >
              {user.categories.map((category: any, idx: number) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
                        : userTheme === "default"
                        ? "text-gray-900 dark:text-gray-100"
                        : blackText
                        ? "text-gray-900"
                        : "text-gray-100"
                    }`
                  }
                  value={category.name}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {category.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-300">
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

export default CategoryList;
