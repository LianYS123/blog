import { Button, Input, Table, Typography } from "@douyinfe/semi-ui";
import { useModalAction, useTable } from "hooks";
import React, { useState } from "react";
import { EditRoleModal } from "./EditRoleModal";
import { IconPlus } from "@douyinfe/semi-icons";
import { CommonDeleteButton } from "components/button";
import { renderDateTime } from "utils";
import { DELETE_ROLE, GET_ROLE_LIST } from "services/role";

const RoleManager = () => {
  const { open, ...modalProps } = useModalAction();
  const [keyword, setKeyword] = useState();
  const { tableProps, search, reload } = useTable({
    service: GET_ROLE_LIST
  });

  const handleSearch = () => {
    search({ keyword });
  };

  const columns = [
    {
      title: "角色名称",
      dataIndex: "roleName"
    },
    {
      title: "角色码",
      dataIndex: "roleCode"
    },
    {
      title: "角色描述",
      dataIndex: "roleDesc"
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
              service={DELETE_ROLE}
              onFinish={reload}
            />
          </div>
        );
      }
    }
  ];
  return (
    <div className="container">
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
            创建角色
          </Button>
        </div>
      </div>
      <Table {...tableProps} columns={columns} />
      <EditRoleModal {...modalProps} reload={reload} />
    </div>
  );
};

export default RoleManager;
