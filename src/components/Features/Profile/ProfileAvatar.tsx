import React, { memo, useState } from 'react';
import Dropzone from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';
import Typography from '@mui/material/Typography';
import styles from '@styles/components/_upload.module.scss';
import { useFormikContext } from 'formik';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import { UserAccount } from '@models/Account';
import { ButtonCustom } from '@components/Common';
import { postImage } from '@services/imageService';
import { toast } from 'react-toastify';

export const ProfileAvatar = memo(() => {
  const { values, setFieldValue } = useFormikContext<UserAccount>();
  const [avatar, setAvatar] = useState<string | File>(values.avatar);

  const handleDrop = (dropped: File[]) => {
    if (dropped.length > 0) {
      setAvatar(dropped[0]);
    }
  };

  const handleUpload = async () => {
    if (Boolean(avatar)) {
      const formData = new FormData();
      formData.append('image', avatar);

      const { data, status } = await postImage(formData);
      if (status === 201) {
        toast.success('Tải ảnh thành công!');
        setFieldValue('avatar', data.publicId).then();
      } else {
        toast.error('Tải ảnh thất bại!');
      }
    }
  };

  return (
    <Dropzone
      onDrop={handleDrop}
      noClick={false}
      noKeyboard
    >
      {({ getRootProps, getInputProps }) => (
        <div className={styles.dropzoneAvatar}>
          <Typography variant='body1' fontWeight={600} textAlign='center'>Avatar</Typography>
          <div {...getRootProps()}>
            <AvatarEditor width={120} height={120} image={avatar} borderRadius={1000} />
            <input {...getInputProps()} />
          </div>
          <ButtonCustom
            variant='text'
            content='Tải ảnh'
            handleClick={handleUpload}
            disabled={typeof avatar !== 'object'}
            endIcon={<CloudUploadRoundedIcon />}
          />
        </div>
      )}
    </Dropzone>
  );
});