// @ts-nocheck
"use client";

import { SelectorChips } from "@/components/ui/selector-chips";
import { InteractiveList } from "@/components/ui/interactive-list";
import { useState } from "react";

export function ResourcesFilter({ resources, filterOptions }) {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const filtered = selectedCategories.length === 0
    ? resources
    : resources.filter((r) => selectedCategories.includes(r.category));

  return (
    <>
      <div className="mb-6">
        <SelectorChips options={filterOptions} onChange={setSelectedCategories} />
      </div>
      <InteractiveList items={filtered} />
    </>
  );
}
