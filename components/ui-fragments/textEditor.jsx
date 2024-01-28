import React, { useEffect, useState, useRef } from "react";

import { useQuill } from "react-quilljs";
// or const { useQuill } = require('react-quilljs');

import "quill/dist/quill.snow.css";
// or import 'quill/dist/quill.bubble.css';

export default function RichTextEditor({
  placeHolder,
  formattedContent,
  setFormattedContent,
}) {
  const theme = "snow";

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],

      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],

      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["link"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  const placeholder = placeHolder;

  const { quill, quillRef } = useQuill({
    theme,
    modules,
    placeholder,
    // formats,
  });

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(formattedContent ?? null);
      quill.on("text-change", () => {
        var typedContent = quill.root.innerHTML;
        setFormattedContent(typedContent);
      });
    }
  }, [quill]);
  return (
    <div
      style={{
        borderRadius: `var(--radius-md)`,
        border: `2pt dashed black`,
        padding: "0.15rem 0.15rem",
      }}
    >
      <div ref={quillRef} style={{ minHeight: "7rem" }} />
    </div>
  );
}
