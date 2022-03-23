import {
  Code,
  CodeRounded,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatStrikethrough
} from "@mui/icons-material";

import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";

export const TipTapMenubar = ({ editor }) => {
  const getMenus = () => {
    const titles = [
      {
        title: "h1", // 标题
        active: editor.isActive("heading", { level: 1 }),
        onClick: () => {
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }
      }
    ];
    const menus = [
      {
        title: "加粗", // 加粗
        key: "bold",
        icon: <FormatBold />,
        active: editor.isActive("bold"),
        onClick: () => {
          editor.chain().focus().toggleBold().run();
        }
      },
      {
        title: "斜体", // 斜体
        key: "italic",
        icon: <FormatItalic />,
        active: editor.isActive("italic"),
        onClick: () => {
          editor.chain().focus().toggleItalic().run();
        }
      },
      {
        title: "删除线", // 删除线
        key: "strike",
        icon: <FormatStrikethrough />,
        active: editor.isActive("strike"),
        onClick: () => {
          editor.chain().focus().toggleStrike().run();
        }
      },
      {
        title: "行内代码", // 行内代码
        key: "code",
        icon: <CodeRounded />,
        active: editor.isActive("code"),
        onClick: () => {
          editor.chain().focus().toggleCode().run();
        }
      },
      // {
      //   title: "paragraph", // 段落
      //   active: editor.isActive("paragraph"),
      //   onClick: () => {
      //     editor.chain().focus().setParagraph().run();
      //   }
      // },
      {
        title: "无序列表", // 无序列表
        key: "bullet list",
        icon: <FormatListBulleted />,
        active: editor.isActive("bulletList"),
        onClick: () => {
          editor.chain().focus().toggleBulletList().run();
        }
      },
      {
        title: "有序列表", // 有序列表
        key: "ordered list",
        icon: <FormatListNumbered />,
        active: editor.isActive("orderedList"),
        onClick: () => {
          editor.chain().focus().toggleOrderedList().run();
        }
      },
      {
        title: "代码块", // 代码块
        key: "code block",
        icon: <Code />,
        active: editor.isActive("codeBlock"),
        onClick: () => {
          editor.chain().focus().toggleCodeBlock().run();
        }
      },
      {
        title: "引用", // 引用
        key: "blockquote",
        icon: <FormatQuote />,
        active: editor.isActive("blockquote"),
        onClick: () => {
          editor.chain().focus().toggleBlockquote().run();
        }
      }
    ];
    return menus;
  };
  const menus2 = [
    {
      title: "clear marks",
      onClick: () => {
        editor.chain().focus().unsetAllMarks().run();
      }
    },
    {
      title: "clear nodes",
      onClick: () => {
        editor.chain().focus().clearNodes().run();
      }
    },
    {
      title: "horizontal rule",
      onClick: () => {
        editor.chain().focus().setHorizontalRule().run();
      }
    },
    {
      title: "hard break",
      onClick: () => {
        editor.chain().focus().setHardBreak().run();
      }
    },
    {
      title: "undo", // 后退
      onClick: () => {
        editor.chain().focus().undo().run();
      }
    },
    {
      title: "redo", // 前进
      onClick: () => {
        editor.chain().focus().redo().run();
      }
    }
  ];

  const getFormats = menus => {
    const formats = menus.filter(it => it.active).map(it => it.title);
    return formats;
  };

  const menus = getMenus();
  const formats = getFormats(menus);

  return (
    <ToggleButtonGroup
      size="small"
      color="standard"
      value={formats}
      aria-label="text formatting"
    >
      {menus.map(({ title, onClick, icon, key }) => {
        return (
          <ToggleButton
            key={key}
            value={title}
            onClick={onClick}
            aria-label={title}
          >
            <Tooltip title={title}>{icon}</Tooltip>
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
};
