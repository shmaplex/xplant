"use client";

import { FC } from "react";

interface CategoryWithSub {
  name: string;
  subcategories?: string[];
}

interface Props {
  categories: CategoryWithSub[];
  filteredCategories: string[]; // includes both categories and subcategories
  scrollToCategory: (cat: string) => void;
}

const CategoryNav: FC<Props> = ({
  categories,
  filteredCategories,
  scrollToCategory,
}) => {
  return (
    <nav className="hidden md:flex flex-col w-auto pr-4 sticky top-24 self-start space-y-4 border-r border-black/10">
      <h2 className="text-sm uppercase font-semibold tracking-wide text-black/20">
        Categories
      </h2>

      {categories.map(({ name, subcategories }) => {
        // Only show category if it appears in filteredCategories
        if (!filteredCategories.includes(name)) return null;

        return (
          <div key={name}>
            <button
              onClick={() => scrollToCategory(name)}
              className="
                relative z-10
                text-left text-sm font-medium text-[var(--moss-shadow)] hover:text-[var(--psybeam-purple)]
                px-[2px] py-[2px] rounded-full
                transition
                bg-[var(--milk-bio)]
                before:absolute before:inset-0 before:rounded-full before:z-[-1]
                before:bg-gradient-to-r before:from-[var(--future-lime)] before:to-[var(--psybeam-purple)]
                before:opacity-0 hover:before:opacity-100
                before:p-[1px] before:transition-opacity
                ease-in-out duration-300
              "
              type="button"
            >
              <span className="block bg-[var(--milk-bio)] hover:bg-white uppercase rounded-full px-4 py-0.5 transition ease-in-out duration-300">
                {name}
              </span>
            </button>

            {subcategories && (
              <div className="ml-6 mt-2 flex flex-col space-y-1.5">
                {subcategories.map((subcat) => {
                  if (!filteredCategories.includes(subcat)) return null;
                  return (
                    <button
                      key={subcat}
                      onClick={() => scrollToCategory(subcat)}
                      className="
                        group
                        text-left text-xs font-medium
                        text-[var(--moss-shadow)]
                        hover:text-[var(--psybeam-purple)]
                        transition-colors duration-300
                        rounded-full
                      "
                      type="button"
                    >
                      <span
                        className="
                          inline-block
                          px-3 py-1
                          bg-[var(--milk-bio)]
                          rounded-full
                          group-hover:bg-white
                          transition-colors duration-300
                        "
                      >
                        {subcat}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default CategoryNav;
