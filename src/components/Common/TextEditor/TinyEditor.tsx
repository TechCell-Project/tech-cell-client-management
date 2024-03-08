'use client';

import React, { memo, useRef, useState } from 'react';
import { API_KEY_EDITOR } from '@constants/service';
import { Editor } from '@tinymce/tinymce-react';
import { useFormikContext } from 'formik';
import { ButtonCustom, LoadingSection } from '@components/Common';
import Box from '@mui/material/Box';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import { toast } from 'react-toastify';

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
      setFieldValue(name, content).then();
      toast.success('Lưu bài thành công!');
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
            menubar: false,
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
              top: '6px',
              right: '12px',
              zIndex: 100,
            }}
            variant="text"
            content="Lưu bài"
            handleClick={handleSaveContent}
            endIcon={<SaveAsRoundedIcon />}
          />
        )}
      </>
    </Box>
  );
});
