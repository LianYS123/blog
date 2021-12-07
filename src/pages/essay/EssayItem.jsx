import { IconDelete, IconEdit } from "@douyinfe/semi-icons";
import { Button, Dropdown, Tag } from "@douyinfe/semi-ui";
import { UserAvatar } from "components/user";
import { useMutation } from "hooks";
import React from "react";
import { useSelector } from "react-redux";
import { DELETE_ESSAY } from "services/essay";
import { deleteConfirmModalAction, timestampFormat } from "utils";
import { EssayEditor } from "./EssayEditor";

export const EssayItem = ({
  editorRecord,
  setEditorRecord,
  reload,
  ...record
}) => {
  const { createTime, html, author, id } = record;
  const [deleteEssay] = useMutation(DELETE_ESSAY);
  const { userInfo } = useSelector(state => state.app);
  const renderOperator = () => {
    const menus = [
      {
        node: "item",
        name: "编辑",
        color: "blue",
        icon: <IconEdit />,
        onClick: () => setEditorRecord(record)
      },
      {
        node: "item",
        type: "danger",
        name: "删除",
        color: "red",
        icon: <IconDelete />,
        onClick: () =>
          deleteConfirmModalAction({
            method: deleteEssay,
            id,
            onFinish: reload
          })
      }
    ];
    return (
      <div className="space-x-2">
        {menus.map(({ color, name, icon, onClick }) => (
          <span key={name} className="cursor-pointer" onClick={onClick}>
            <Tag color={color}>
              {icon}
              {name}
            </Tag>
          </span>
        ))}
      </div>
    );
    // return (
    //   <Dropdown trigger="click" menu={menus}>
    //     <Button>...</Button>
    //   </Dropdown>
    // );
  };
  return (
    <section className="flex pb-2 border-b border-gray-200">
      <div className="flex w-full flex-col justify-between">
        <div className="space-y-1">
          <div className="flex justify-between">
            {/* <h3 className="text-lg mb-1 cursor-pointer font-bold hover:underline">
              {author.username}
            </h3> */}
            <div className="space-x-2">
              <span>
                <UserAvatar size="extra-small" userInfo={author} />
              </span>
              <span className="text-green-600 text-base sm:text-lg font-light hover:underline">
                {author?.username}
              </span>
            </div>
            <div>
              {/* 只有发布者有编辑权限 */}
              {userInfo.id === author?.id ? renderOperator() : null}
            </div>
          </div>
          <div className="flex">
            {/* <p
              onClick={() => history.push(routers.DETAIL.replace(":id", id))}
              className="text-base sm:text-xs text-gray-800 dark:text-gray-50 cursor-pointer flex-auto h-full md:text-base overflow-hidden hover:underline font-normal mr-1 md:mr-4"
            >
              {summary}
            </p> */}
            <div className="w-full mb-1">
              {editorRecord?.id === id ? (
                <EssayEditor
                  onCancel={() => setEditorRecord(null)}
                  onSuccess={() => setEditorRecord(null)}
                  isEdit={true}
                  record={record}
                  reload={reload}
                />
              ) : (
                <article
                  id="htmlTemplate"
                  dangerouslySetInnerHTML={{ __html: html }}
                ></article>
              )}
            </div>
          </div>
        </div>
        <div className="font-semibold">
          <div className="text-gray-500 font-thin space-x-2">
            <span>{timestampFormat(createTime)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
