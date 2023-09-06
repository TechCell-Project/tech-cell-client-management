"use client";

import React, { useEffect, memo, useState } from "react";
import { useFormikContext } from "formik";
import { useDropzone } from "react-dropzone";
import styles from "@styles/components/_upload.module.scss";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';

export const UploadFileCustom = memo(
  ({
    name,
    imageInits = null,
  }: {
    name: string;
    imageInits?: any[] | null;
  }) => {
    const { setFieldValue, values } = useFormikContext<any>();
    const [uploadedFiles, setUploadedFiles] = useState<any[]>(
      !imageInits ? [] : imageInits
    );

    useEffect(() => {
      if (values[name] && values[name].length > 0) {
        setUploadedFiles(values[name]);
      }
    }, [values, name]);

    const { getRootProps, getInputProps } = useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
      },
      onDrop: (acceptedFiles) => {
        const objectURLs = acceptedFiles.map((file) => {
          const fileWithPreview = Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
          return fileWithPreview;
        });
        setUploadedFiles(objectURLs);
      },
    });

    const handleRemoveFile = (file: any) => {
      setUploadedFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    };

    useEffect(() => {
      setFieldValue(name, uploadedFiles);
      return () =>
        uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [name, uploadedFiles]);

    return (
      <Box>
        <div {...getRootProps({ className: styles.dropzone })}>
          <input {...getInputProps()} />
          <Stack
            flexDirection="row"
            gap={2}
            alignContent="center"
            justifyContent="center"
          >
            <CloudUploadIcon />
            <p>Kéo, thả tệp hoặc click để mở</p>
          </Stack>
        </div>
        <Typography fontSize="15px" fontWeight={600} mt="20px">
          • Danh sách ảnh xem trước
        </Typography>
        <aside className={styles.thumbnailContainer}>
          {uploadedFiles?.map((item, i) => (
            <div className={styles.thumbnail} key={i}>
              <div className={styles.thumbnailInner}>
                <img
                  src={item.preview}
                  alt={item.name}
                  onLoad={() => {
                    console.log("Image loaded and URL revoked");
                    URL.revokeObjectURL(item.preview);
                  }}
                />
                <IconButton onClick={() => handleRemoveFile(item)}>
                  <DisabledByDefaultRoundedIcon />
                </IconButton>
              </div>
            </div>
          ))}
        </aside>
      </Box>
    );
  }
);
