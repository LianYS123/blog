import { Button, Input, Table, Typography } from "@douyinfe/semi-ui";
import { useModalAction, useTable } from "hooks";
import React, { useState } from "react";
import { DELETE_RESOURCE, GET_RESOURCE_LIST } from "services/API";
import { IconPlus } from "@douyinfe/semi-icons";
import { CommonDeleteButton } from "components/button";
import { renderDateTime } from "utils";
import { EditResourceModal } from "./EditResourceModal";
import fileSize from "filesize";

const ResourceManager = () => {
  const { open, ...modalProps } = useModalAction();
  const [keyword, setKeyword] = useState();
  const { tableProps, search, reload } = useTable({
    service: GET_RESOURCE_LIST
  });
  const handleSearch = () => {
    search({ keyword });
  };
  const columns = [
    {
      title: "资源名称",
      dataIndex: "resourceName"
    },
    {
      title: "文件大小",
      dataIndex: "size",
      render: size => fileSize(size)
    },
    // {
    //   title: "资源名称",
    //   dataIndex: "src"
    // },
    {
      title: "类型",
      dataIndex: "type"
    },
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
              service={DELETE_RESOURCE}
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
            新增资源
          </Button>
        </div>
      </div>
      <Table {...tableProps} columns={columns} />
      <EditResourceModal {...modalProps} reload={reload} />
    </div>
  );
};

export default ResourceManager;
