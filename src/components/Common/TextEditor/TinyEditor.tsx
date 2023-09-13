"use client";

import React, { useRef } from "react";
import { API_KEY_EDITOR } from "@constants/service";
import { Editor } from "@tinymce/tinymce-react";
import { useFormikContext } from "formik";
import { ButtonCustom } from "../FormGroup/ButtonCustom";
import { Box } from "@mui/material";

interface Props {
  value?: string;
  name: string;
}

const pluginTiny = [
  "advlist",
  "autolink",
  "lists",
  "link",
  "image",
  "charmap",
  "preview",
  "anchor",
  "searchreplace",
  "visualblocks",
  "code",
  "fullscreen",
  "insertdatetime",
  "media",
  "table",
  "code",
  "help",
  "wordcount",
];

const toolbarTiny =
  "undo redo | blocks | link image accordion" +
  "bold italic forecolor | alignleft aligncenter " +
  "alignright alignjustify | bullist numlist outdent indent | " +
  "removeformat | help";

export const TinyEditor = (props: Props) => {
  const { value, name } = props;
  const { setFieldValue } = useFormikContext();
  const editorRef = useRef<any>(value);

  const handleSaveContent = () => {
    const content = editorRef.current.getContent();
    if (content) {
      setFieldValue(name, content);
    }
  };

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        apiKey={API_KEY_EDITOR}
        initialValue={value}
        init={{
          height: 600,
          plugins: pluginTiny,
          toolbar: toolbarTiny,
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          language: "vi",
        }}
      />
      <ButtonCustom
        styles={{ position: "absolute", top: "15px", right: "15px", zIndex: 100 }}
        variant="outlined"
        content="Lưu bài"
        handleClick={handleSaveContent}
      />
    </Box>
  );
};
