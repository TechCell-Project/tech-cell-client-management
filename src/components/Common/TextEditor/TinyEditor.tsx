'use client';

import React, { memo, useRef, useState } from 'react';
import { API_KEY_EDITOR } from '@constants/service';
import { Editor } from '@tinymce/tinymce-react';
import { useFormikContext } from 'formik';
import { ButtonCustom } from '../FormGroup/ButtonCustom';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { HashLoader } from 'react-spinners';
import { LoadingSection } from '../Display/LoadingSection';
import { enqueueSnackbar } from 'notistack';

interface Props {
  value?: string;
  name: string;
}

const pluginTiny = [
  'advlist',
  'autolink',
  'lists',
  'link',
  'image',
  'charmap',
  'preview',
  'anchor',
  'searchreplace',
  'visualblocks',
  'code',
  'fullscreen',
  'insertdatetime',
  'media',
  'table',
  'code',
  'help',
  'wordcount',
];

const toolbarTiny =
  'undo redo | blocks | link image accordion' +
  'bold italic forecolor | alignleft aligncenter ' +
  'alignright alignjustify | bullist numlist outdent indent | ' +
  'removeformat | help';

export const TinyEditor = memo((props: Props) => {
  const { value, name } = props;
  const { setFieldValue } = useFormikContext();
  const editorRef = useRef<any>(value);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleSaveContent = () => {
    const content = editorRef.current.getContent();
    if (content) {
      setFieldValue(name, content);
      enqueueSnackbar('Lưu thành công!', {
        variant: 'success',
      });
    }
  };

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {isLoading && <LoadingSection isLoading={isLoading} />}
      <>
        <Editor
          tinymceScriptSrc={`https://cdn.tiny.cloud/1/${API_KEY_EDITOR}/tinymce/6/tinymce.min.js`}
          // tinymceScriptSrc="/assets/libs/tinymce/tinymce.min.js"
          onInit={(evt, editor) => {
            editorRef.current = editor;
            setIsLoading(false);
          }}
          apiKey={API_KEY_EDITOR}
          initialValue={value}
          init={{
            height: 600,
            plugins: pluginTiny,
            toolbar: toolbarTiny,
            toolbar_sticky: true,
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            language: 'vi',
          }}
        />
        {!isLoading && (
          <ButtonCustom
            styles={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              zIndex: 100,
            }}
            variant="outlined"
            content="Lưu bài"
            handleClick={handleSaveContent}
          />
        )}
      </>
    </Box>
  );
});
