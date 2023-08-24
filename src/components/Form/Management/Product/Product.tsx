import React, { useEffect, useMemo } from "react";
import { DataTable } from "@components/Common";
import { useAppDispatch, useAppSelector } from "@store/store";
import { getAllProduct } from "@store/slices/productSlice";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { COLUMNS_PRODUCT } from "@constants/data";
import { formatWithCommas, getStatusProduct } from "@utils/index";
import { Rating } from "@mui/material";
import StarRoundedIcon from '@mui/icons-material/StarRounded';

export const Product = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  const rows = products?.data?.map((product, i) => ({
    id: product._id,
    no: i + 1,
    name: product.general.name,
    categories: product.general.categories,
    manufacturer: product.general.manufacturer,
    price: formatWithCommas(product.filterable.price) + "₫",
    status: getStatusProduct(product.status),
    review_stats: {
      average_rating: product.review_stats.average_rating,
      review_count: product.review_stats.review_count,
    },
  }));

  const columns: any[] = [
    ...COLUMNS_PRODUCT,
    {
      field: "review_stats",
      headerName: "Đánh giá",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRowParams<any>) => (
        <>
          <Rating
            defaultValue={params.row.review_stats.average_rating}
            precision={0.5}
            readOnly
            icon={<StarRoundedIcon/>}
            />
          <b> - {params.row.review_stats.review_count}</b>
        </>
      ),
    },
  ];

  return <DataTable column={columns} row={rows} isLoading={isLoading} />;
};
