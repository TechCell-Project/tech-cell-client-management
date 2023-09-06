import React, { useEffect, useState } from "react";
import { DataTable } from "@components/Common";
import { useAppDispatch, useAppSelector } from "@store/store";
import {
  getAllAttributes,
  getDetailAttributeById,
} from "@store/slices/attributeSlice";
import { PagingAttribute } from "@models/Attribute";
import { COLUMNS_ATTRIBUTE } from "@constants/data";
import { GridActionsCellItem, GridRowParams } from "@mui/x-data-grid";
import { getIndexNo } from "@utils/index";
import { Tooltip } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AutoDeleteRoundedIcon from "@mui/icons-material/AutoDeleteRounded";
import { AttributeDialog } from "@models/Dialog";
import { EditAttribute } from "./Dialog/EditAttribute";
import { ConfirmDeleteAttribute } from "./Dialog/ConfirmDeleteAttribute";
import { IColumnAttribute } from "@interface/data";

export const Attribute = () => {
  const dispatch = useAppDispatch();
  const { attributes, isLoading } = useAppSelector((state) => state.attribute);

  const [searchAttribute, setSearchAttribute] = useState<PagingAttribute>(
    new PagingAttribute()
  );
  const [currentAttribute, setCurrentAttribute] = useState<IColumnAttribute>();
  const [isOpen, setIsOpen] = useState<AttributeDialog>(new AttributeDialog());

  useEffect(() => {
    dispatch(getAllAttributes(searchAttribute));
  }, [searchAttribute]);

  const handleGetDetails = (id: string) => {
    dispatch(getDetailAttributeById(id));
  };

  const rows: Array<IColumnAttribute> = attributes.data?.map(
    (attribute, i) => ({
      id: attribute._id,
      no: getIndexNo(i, searchAttribute.page, searchAttribute.pageSize),
      name: attribute.name,
      label: attribute.label,
      description: attribute.description,
    })
  );

  const columns: any[] = [
    ...COLUMNS_ATTRIBUTE,
    {
      field: "options",
      headerName: "Thao Tác",
      width: 200,
      align: "center",
      headerAlign: "center",
      type: "actions",
      getActions: (params: GridRowParams<any>) => [
        <Tooltip title="Chỉnh sửa" key={params.row.no}>
          <GridActionsCellItem
            icon={<EditRoundedIcon />}
            onClick={() => {
              handleGetDetails(params.row.id);
              setIsOpen((prev) => ({ ...prev, openEdit: true }));
            }}
            label="Chỉnh sửa"
          />
        </Tooltip>,
        <Tooltip title="Xóa" key={params.row.no}>
          <GridActionsCellItem
            icon={<AutoDeleteRoundedIcon />}
            onClick={() => {
              setCurrentAttribute(params.row);
              setIsOpen((prev) => ({ ...prev, openConfirmDelete: true }));
            }}
            label="Xóa"
          />
        </Tooltip>,
      ],
    },
  ];

  return (
    <>
      <DataTable
        column={columns}
        row={rows}
        isLoading={isLoading}
        isQuickFilter
        paginationModel={searchAttribute}
        setPaginationModel={setSearchAttribute}
        totalRecord={attributes?.totalRecord}
      />

      {isOpen.openEdit && (
        <EditAttribute
          isOpen={isOpen.openEdit}
          handleClose={() =>
            setIsOpen((prev) => ({ ...prev, openEdit: false }))
          }
        />
      )}

      {isOpen.openConfirmDelete && currentAttribute && (
        <ConfirmDeleteAttribute
          isOpen={isOpen.openConfirmDelete}
          handleClose={() =>
            setIsOpen((prev) => ({ ...prev, openConfirmDelete: false }))
          }
          dataAttribute={currentAttribute}
        />
      )}
    </>
  );
};
