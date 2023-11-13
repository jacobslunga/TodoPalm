"use client";

import { categoriesService } from "@/api/categories";
import { userService } from "@/api/users";
import CategoryIcon, { ICON_MAP } from "@/lib/icons/CategoryIcon";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { ArrowRight } from "react-feather";
import OccupationList from "../util/OccupationList";

interface ChooseCategoriesModalProps {
  accessToken: string;
}

const categories = [
  "School",
  "Work",
  "Personal",
  "Shopping",
  "Travel",
  "Family",
  "Health",
  "Finance",
  "Hobbies",
  "Other",
];

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

interface Category {
  name: string;
  icon: string;
}

const ChooseCategoriesModal: FC<ChooseCategoriesModalProps> = ({
  accessToken,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    categories.map((c) => {
      return {
        name: c,
        icon: c,
      };
    })
  );

  const [occupation, setOccupation] = useState<{ occupation: string }>({
    occupation: occupations[0].occupation,
  });

  const isValidSubmit =
    occupation.occupation !== "" && selectedCategories.length > 0;

  const handleSubmit = () => {
    setLoading(true);

    userService.updateBasicInfo(accessToken, occupation.occupation);
    categoriesService.createCategories(accessToken, selectedCategories);

    setTimeout(() => {
      router.replace("/me");
    }, 1000);
  };

  return (
    <dialog
      id="choose_categories_modal"
      className="modal modal-bottom backdrop-blur-sm transition-all duration-200 sm:modal-middle rounded-lg shadow-lg"
      open
    >
      <div className="modal-box transition-all duration-200 bg-white dark:bg-[#1B1C1D] border dark:border-[rgba(255,255,255,0.1)]">
        <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
          Welcome, great to have you here!
        </h2>
        <p className="text-[rgba(0,0,0,0.5)] text-sm mb-6 dark:text-[rgba(255,255,255,0.5)]">
          Here you can choose what categories you want to use for your todos.
          You can always change this later.
        </p>

        <div className="space-y-4">
          <p className="text-black dark:text-white text-sm font-medium">
            What describes you best?
          </p>
          <OccupationList
            occupation={occupation}
            setOccupation={setOccupation}
          />

          <p className="text-black dark:text-white text-sm font-medium mt-3">
            Categories
          </p>
          <div
            className="grid w-full max-h-[70%] overflow-auto grid-flow-row gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            }}
          >
            {categories.map((category) => (
              <li
                key={category}
                className="flex flex-row items-center bg-white dark:bg-[rgba(255,255,255,0.1)] justify-between px-10 grid-flow-col p-2 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm"
              >
                <CategoryIcon
                  iconName={category}
                  className="text-gray-500 dark:text-gray-300"
                  size={20}
                />
                <p className="text-xs text-black dark:text-white">{category}</p>

                <input
                  type="checkbox"
                  checked={
                    selectedCategories.find((c) => c.name === category)
                      ? true
                      : false
                  }
                  className="checkbox checkbox-sm checkbox-success"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories([
                        ...selectedCategories,
                        {
                          name: category,
                          icon: ICON_MAP[category] ? category : "Other",
                        },
                      ]);
                    } else {
                      setSelectedCategories(
                        selectedCategories.filter((c) => c.name !== category)
                      );
                    }
                  }}
                />
              </li>
            ))}
          </div>
          <button
            disabled={!isValidSubmit}
            className="rounded-full cursor-pointer disabled:cursor-not-allowed disabled:text-gray-300 dark:disabled:text-gray-700 disabled:hover:no-underline hover:underline flex flex-row items-center justify-start text-black dark:text-white group duration-300 ease-in-out font-medium mt-4"
            onClick={() => {
              if (isValidSubmit) handleSubmit();
            }}
          >
            Alright, let's go!{" "}
            {!loading ? (
              <ArrowRight className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 ml-1 duration-300 ease-in-out" />
            ) : (
              <span className="loading loading-dots loading-xs ml-2"></span>
            )}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ChooseCategoriesModal;
