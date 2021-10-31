import {
  Button,
  Input,
  Modal,
  Table,
  Tabs,
  Typography
} from "@douyinfe/semi-ui";
import { useModalAction, useMutation, useTable } from "hooks";
import React, { useState } from "react";
import { DELETE_DICT, GET_DICT_LIST } from "services/API";
import { EditDictModal } from "./EditDictModal";
import dayjs from "dayjs";
import { IconPlus } from "@douyinfe/semi-icons";

// 通用删除按钮
const CommonDeleteButton = ({ service, id, onFinish, ...rest }) => {
  const [del] = useMutation(service);
  return (
    <Typography.Text
      link
      className="danger"
      onClick={() => {
        Modal.warning({
          title: "确认删除？",
          content: "删除后不可恢复，请谨慎操作。",
          okButtonProps: { type: "danger" },
          onOk: async () => {
            const result = await del({ id });
            if (onFinish) {
              onFinish(result);
            }
          }
        });
      }}
      {...rest}
    >
      删除
    </Typography.Text>
  );
};

const Setting = () => {
  const { open, ...modalProps } = useModalAction();
  const [keyword, setKeyword] = useState();
  const { tableProps, search, reload } = useTable({
    service: GET_DICT_LIST
  });
  const handleSearch = () => {
    // if (keyword) {
    search({ keyword });
    // }
  };
  const renderCurrentTime = time =>
    time ? dayjs(time * 1000).format("YYYY-MM-DD HH:mm:ss") : null;
  const columns = [
    {
      title: "字段名称",
      dataIndex: "key"
    },
    {
      title: "字段值",
      dataIndex: "value",
      maxWidth: 300
    },
    {
      title: "描述",
      dataIndex: "description"
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      render: renderCurrentTime
    },
    {
      title: "修改时间",
      dataIndex: "updateTime",
      render: renderCurrentTime
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
    <div className="py-4">
      <Tabs type="line">
        <Tabs.TabPane className="py-2" tab="字典管理" itemKey="dict">
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
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Setting;
