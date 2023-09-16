"use client";

import React, { useEffect, memo, useState } from "react";
import { useFormikContext } from "formik";
import { useDropzone } from "react-dropzone";
import styles from "@styles/components/_upload.module.scss";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import { FieldImageProps } from "@models/Image";

export const UploadFileCustom = memo(
  ({
    name,
    imageInits = [],
  }: {
    name: FieldImageProps;
    imageInits?: any[];
  }) => {
    const { setFieldValue } = useFormikContext<any>();
    const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

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

    const handleRemoveImage = (index: number) => {
      const files = imageInits.filter((file) =>
        name.isThumbnail
          ? file.isThumbnail === true
          : !file.isThumbnail || file.isThumbnail === undefined
      );
      const newFiles = files.filter((_, i) => i !== index);

      if (name.isThumbnail) {
        setFieldValue(String(name.field), [
          ...imageInits.filter(
            (file) => !file.isThumbnail || file.isThumbnail === undefined
          ),
          ...newFiles,
        ]);
      } else {
        setFieldValue(String(name.field), [
          ...imageInits.filter((file) => file.isThumbnail === true),
          ...newFiles,
        ]);
      }
    };

    useEffect(() => {
      setFieldValue("images", uploadedFiles);
      return () =>
        uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [name.field, uploadedFiles]);

    const renderImage = (item: any, i: React.Key) => {
      return (
        <div className={styles.thumbnail} key={i}>
          <div className={styles.thumbnailInner}>
            <img
              src={item.url || item.preview}
              alt={item?.name}
              onLoad={() => {
                if (item.preview) {
                  URL.revokeObjectURL(item.preview);
                }
              }}
            />
            <IconButton
              onClick={() => {
                if (item.publicId) {
                  handleRemoveImage(Number(i))
                } else {
                  handleRemoveFile(item);
                }
              }}
            >
              <DisabledByDefaultRoundedIcon />
            </IconButton>
          </div>
        </div>
      );
    };

    const handleUploadCase = () => {
      const files = imageInits.filter((file) =>
        name.isThumbnail
          ? file.isThumbnail === true
          : !file.isThumbnail || file.isThumbnail === undefined
      );

      return files.map(renderImage);
    };

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
          • Phần ảnh preview:
        </Typography>
        <aside className={styles.thumbnailContainer}>
          {uploadedFiles?.map(renderImage)}
        </aside>

        <Typography fontSize="15px" fontWeight={600} mt="20px">
          • Phần ảnh đã tải lên:
        </Typography>
        <aside className={styles.thumbnailContainer}>
          {handleUploadCase()}
        </aside>
      </Box>
    );
  }
);
