import { Button, Input, Table, Tag, Typography } from "@douyinfe/semi-ui";
import { useModalAction, useTable } from "hooks";
import React, { useState } from "react";
import { DELETE_TAG, GET_TAG_LIST } from "services/API";
import { IconPlus } from "@douyinfe/semi-icons";
import { CommonDeleteButton } from "components/button";
import { renderDateTime } from "utils";
import { EditTagModal } from "./EditTagModal";

const TagManager = () => {
  const { open, ...modalProps } = useModalAction();
  const [keyword, setKeyword] = useState();
  const { tableProps, search, reload } = useTable({
    service: GET_TAG_LIST
  });
  const handleSearch = () => {
    search({ keyword });
  };
  const columns = [
    {
      title: "标签名称",
      dataIndex: "tagName"
    },
    {
      title: "标签颜色",
      dataIndex: "color",
      render: color => <Tag color={color}>{color}</Tag>
    },
    // {
    //   title: "标签描述",
    //   dataIndex: "description"
    // },
    {
      title: "创建时间",
      dataIndex: "createTime",
      render: renderDateTime
    },
    {
      title: "修改时间",
      dataIndex: "updateTime",
      render: renderDateTime
    },
    {
      title: "操作",
      index: "option",
      render: record => {
        return (
          <div className="space-x-2 whitespace-nowrap">
            <Typography.Text
              link
              onClick={() => open({ record, id: record.id })}
            >
              编辑
            </Typography.Text>
            <CommonDeleteButton
              id={record.id}
              service={DELETE_TAG}
              onFinish={reload}
            />
          </div>
        );
      }
    }
  ];
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex space-x-2 my-2">
          <Input onEnterPress={handleSearch} onChange={setKeyword} />
          <Button onClick={handleSearch}>搜索</Button>
        </div>
        <div>
          <Button
            theme="solid"
            icon={<IconPlus />}
            type="primary"
            onClick={() => open()}
          >
            新增标签
          </Button>
        </div>
      </div>
      <Table {...tableProps} columns={columns} />
      <EditTagModal {...modalProps} reload={reload} />
    </div>
  );
};

export default TagManager;
