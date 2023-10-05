'use client';

import React, { useEffect, memo, useState } from 'react';
import { useFormikContext } from 'formik';
import { useDropzone } from 'react-dropzone';
import styles from '@styles/components/_upload.module.scss';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import { FieldImageProps } from '@models/Image';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';

export const UploadFileCustom = memo(
  ({ name, imageInits = [] }: { name: FieldImageProps; imageInits?: any[] }) => {
    const theme = useTheme();
    const { setFieldValue } = useFormikContext<any>();
    const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

    const { getRootProps, getInputProps, fileRejections } = useDropzone({
      accept: {
        'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
      },
      onDrop: (acceptedFiles) => {
        const objectURLs = acceptedFiles.map((file) => {
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        });
        setUploadedFiles(objectURLs);
      },
      maxFiles: name.isThumbnail ? 1 : 10,
      validator: (file) => {
        if (file.size > 10 * 1024 * 1024) {
          return {
            code: 'file-too-large',
            message: 'File ảnh tải lên cần < 10mb',
          };
        }
        return null;
      },
    });

    const handleRemoveFile = (file: any) => {
      setUploadedFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    };

    const handleRemoveImage = (index: number) => {
      const files = imageInits.filter((file) =>
        name.isThumbnail
          ? file.isThumbnail === true
          : !file.isThumbnail || false,
      );
      const newFiles = files.filter((_, i) => i !== index);

      if (name.isThumbnail) {
        setFieldValue(String(name.field), [
          ...imageInits.filter((file) => !file.isThumbnail || false),
          ...newFiles,
        ]).then();
      } else {
        setFieldValue(String(name.field), [
          ...imageInits.filter((file) => file.isThumbnail === true),
          ...newFiles,
        ]).then();
      }
    };

    useEffect(() => {
      setFieldValue('images', uploadedFiles).then();
      return () => uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [name.field, uploadedFiles, setFieldValue]);

    const renderImage = (item: any, i: React.Key) => {
      return (
        <div className={styles.thumbnail} key={i}>
          <div className={styles.thumbnailInner}>
            <Image
              width={0}
              height={0}
              loading='lazy'
              sizes='100vw'
              style={{ width: '100%', height: 'auto' }}
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
                  handleRemoveImage(Number(i));
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
          : !file.isThumbnail || false,
      );

      return files.map(renderImage);
    };

    return (
      <Box>
        <div {...getRootProps({ className: styles.dropzone })}>
          <input {...getInputProps()} />
          <Stack flexDirection='row' gap={2} alignContent='center' justifyContent='center'>
            <CloudUploadIcon />
            <p>Kéo, thả tệp hoặc click để mở</p>
          </Stack>
        </div>

        <Typography fontSize='15px' fontWeight={600} mt='20px'>
          • Phần ảnh preview:
        </Typography>
        <aside className={styles.thumbnailContainer}>{uploadedFiles?.map(renderImage)}</aside>

        <Typography fontSize='15px' fontWeight={600} mt='20px'>
          • Phần ảnh đã tải lên:
        </Typography>
        <aside className={styles.thumbnailContainer}>{handleUploadCase()}</aside>
      </Box>
    );
  },
);
