import React, { memo, useState } from 'react';
import Dropzone from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';
import Typography from '@mui/material/Typography';
import styles from '@styles/components/_upload.module.scss';
import { useFormikContext } from 'formik';
import { UserAccount } from '@models/Account';
import { ImageModel } from '@models/Product';

export const ProfileAvatar = memo(() => {
  const { values, setFieldValue } = useFormikContext<UserAccount>();
  const [avatar, setAvatar] = useState<string | File>((values.avatar as ImageModel)?.url as string);

  const handleDrop = (dropped: File[]) => {
    if (dropped.length > 0) {
      setAvatar(dropped[0]);
      setFieldValue('avatar', dropped[0]).then();
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
        </div>
      )}
    </Dropzone>
  );
});