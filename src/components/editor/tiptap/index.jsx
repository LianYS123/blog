import { Box } from "@mui/material";
import { useEditor, EditorContent, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { Image } from "./Image";
import { TipTapMenubar } from "./TipTapMenubar";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import lowlight from "lowlight";
import CodeBlock from "./CodeBlock";
import Placeholder from "@tiptap/extension-placeholder";

export const useTiptapEditor = ({
  editable = true,
  content,
  placeholder = "在这里输入..."
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false
      }),
      Image,
      Placeholder.configure({
        placeholder
      }),
      editable
        ? CodeBlockLowlight.extend({
            addNodeView() {
              return ReactNodeViewRenderer(CodeBlock);
            }
          }).configure({
            lowlight
          })
        : CodeBlockLowlight.configure({
            lowlight
          })
    ],
    content
  });

  useEffect(() => {
    if (editor) {
      editor.setEditable(editable);
    }
  }, [editable, editor]);
  return editor;
};
