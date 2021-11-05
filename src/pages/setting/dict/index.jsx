import { Button, Input, Table, Typography } from "@douyinfe/semi-ui";
import { useModalAction, useTable } from "hooks";
import React, { useState } from "react";
import { DELETE_DICT, GET_DICT_LIST } from "services/API";
import { EditDictModal } from "./EditDictModal";
import { IconPlus } from "@douyinfe/semi-icons";
import { CommonDeleteButton } from "components/button";
import { renderDateTime } from "utils";

const DictManager = () => {
  const { open, ...modalProps } = useModalAction();
  const [keyword, setKeyword] = useState();
  const { tableProps, search, reload } = useTable({
    service: GET_DICT_LIST
  });
  const handleSearch = () => {
    search({ keyword });
  };
  const columns = [
    {
      title: "字段名称(Key)",
      dataIndex: "key",
      width: 150
    },
    {
      title: "字段值(Value)",
      dataIndex: "value",
      width: 320
    },
    {
      title: "描述",
      dataIndex: "description"
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
              service={DELETE_DICT}
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
            新增字段
          </Button>
        </div>
      </div>
      <Table {...tableProps} columns={columns} />
      <EditDictModal {...modalProps} reload={reload} />
    </div>
  );
};

export default DictManager;
