import { DataTable } from "@components/Common";
import { IColumnCategory } from "@interface/data";
import { SearchModel } from "@models/Common";
import { getAllCategory } from "@store/slices/categorySlice";
import { useAppDispatch, useAppSelector } from "@store/store";
import { getIndexNo } from "@utils/index";
import React, { useEffect, useState } from "react";

export const Category = () => {
  const dispatch = useAppDispatch();
  const { categories, isLoading } = useAppSelector((state) => state.category);

  const [searchCategory, setSearchCategory] = useState<SearchModel>(
    new SearchModel()
  );

  useEffect(() => {
    dispatch(getAllCategory(searchCategory));
  }, [searchCategory])

  const rows: Array<IColumnCategory> = categories.data.map((category, i) => ({
    id: category._id,
    no: getIndexNo(i, searchCategory.page, searchCategory.pageSize),
    name: category.name,
    label: category.label,
    description: category.description,
    requiresAttribute: category.requireAttributes?.map((attribute) => `${attribute}`)
  }))

  const columns: Array<any> = [];

  return (
    <>
      <DataTable
        column={columns}
        row={rows}
        isQuickFilter
        paginationModel={searchCategory}
        setPaginationModel={setSearchCategory}
        isLoading={isLoading}
      />
    </>
  );
};
