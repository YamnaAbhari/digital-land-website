import React, { useEffect, useState } from "react";
import FetchData from "../../../Utils/FetchData";
import CategoryCard from "./CategoryCard";
import CategorySkeleton from "./CategorySkeleton";

export default function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [loadingCount, setLoadingCount] = useState(6);

  useEffect(() => {
    (async () => {
      const result = await FetchData("categories?page=1&limit=12");
      if (result.data) {
        setCategories(result.data);
        setLoadingCount(result.data.length);
      }
    })();
  }, []);

  
  // category skeleton
  if (categories.length == 0) {
    return (
      <div className="mt-45 w-full grid sm:grid-cols-6 grid-cols-3 gap-6 px-3 sm:px-6">
        {Array.from({ length: loadingCount }).map((_, index) => (
          <CategorySkeleton key={`loading-${index}`} />
        ))}
      </div>
    );
  }

  const categoryItem = categories.map((cat) => {
    return (
      <CategoryCard
        key={cat._id}
        id={cat._id}
        title={cat.title}
        image={cat.image}
      ></CategoryCard>
    );
  });
  return (
    <div className="mt-45 w-full grid sm:grid-cols-6 grid-cols-3 gap-6 px-3 sm:px-6">
      {categoryItem}
    </div>
  );
}
