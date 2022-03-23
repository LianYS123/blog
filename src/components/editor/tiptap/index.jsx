import { useEditor, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef } from "react";
import { Image } from "./Image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import lowlight from "lowlight";
import CodeBlock from "./CodeBlock";
import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

/**
 * tiptap 编辑器统一封装
 */
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

  // 同步可编辑状态
  useEffect(() => {
    if (editor) {
      editor.setEditable(editable);
    }
  }, [editable, editor]);

  // 同步编辑器内容
  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);
  return editor;
};

/**
 * 最基本的编辑器
 */
export const useMinimalEditor = ({
  editable = true,
  content,
  placeholder = "请输入..."
}) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Placeholder.configure({
        placeholder
      })
    ],
    content
  });

  // 同步可编辑状态
  useEffect(() => {
    if (editor) {
      editor.setEditable(editable);
    }
  }, [editable, editor]);

  // 同步编辑器内容
  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return editor;
};