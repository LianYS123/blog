import { Button, Input, Table, Tag, Typography } from "@douyinfe/semi-ui";
import { useModalAction, useTable } from "hooks";
import React, { useState } from "react";
import { CommonDeleteButton } from "components/button";
import { renderDateTime } from "utils";
import { DELETE_ARTICLE, ARTICLE_LIST } from "services/article";
import { CheckModal } from "./CheckModal";

const ArticleManager = () => {
  const [keyword, setKeyword] = useState();
  const { tableProps, search, reload } = useTable({
    service: ARTICLE_LIST
  });
  const { open: openCheckModal, ...checkModalProps } = useModalAction();
  const handleSearch = () => {
    search({ keyword });
  };
  const columns = [
    {
      title: "文章标题",
      dataIndex: "articleName"
    },
    {
      title: "标签",
      dataIndex: "tags",
      render: (tags = []) => {
        return (
          <div className="space-x-1">
            {tags.map(tag => (
              <Tag key={tag.color} color={tag.color}>
                {tag.tagName}
              </Tag>
            ))}
          </div>
        );
      }
    },
    {
      title: "作者",
      dataIndex: "authorName"
    },
    {
      title: "文章状态",
      dataIndex: "status",
      render: status => status || "正常"
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
            <Typography.Text link>查看详情</Typography.Text>
            <Typography.Text onClick={() => openCheckModal({ record })} link>
              文章审核
            </Typography.Text>
            <CommonDeleteButton
              id={record.id}
              service={DELETE_ARTICLE}
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
      </div>
      <Table {...tableProps} columns={columns} />
      <CheckModal {...checkModalProps} />
    </div>
  );
};

export default ArticleManager;
