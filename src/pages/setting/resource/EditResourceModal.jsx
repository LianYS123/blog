import React from "react";
import { Button, Form } from "@douyinfe/semi-ui";
import { ADD_RESOURCE, EDIT_RESOURCE, IMAGE_UPLOAD } from "services/API";
import { FormModal } from "components/modal";
import { IconUpload } from "@douyinfe/semi-icons";
import { getDefaultFileObj, getFileInfo } from "utils";

// 编辑资源
export const EditResourceModal = props => {
  const { record = {} } = props;
  const { resourceName, description, id, src, size = 0, type } = record;
  const service = id ? EDIT_RESOURCE : ADD_RESOURCE;
  const title = id ? "编辑资源" : "新增资源";
  const initialFile = { src, size, name: resourceName };
  const initialValues = {
    resourceName,
    description,
    files: src ? [getDefaultFileObj(initialFile)] : []
  };
  const getParams = values => {
    const { files, ...data } = values;
    const { src, size, type } = getFileInfo(files[0], {
      ...initialFile,
      type: record.type
    });
    return { ...data, src, size, type };
  };
  return (
    <FormModal
      initialValues={initialValues}
      service={service}
      title={title}
      getParams={getParams}
      {...props}
    >
      {({ formApi, values }) => {
        return (
          <>
            <Form.Upload
              field="files"
              label="资源文件"
              fileName="file"
              rules={[{ required: true }]}
              headers={{ Authorization: localStorage.getItem("acc") }}
              limit={1}
              action={IMAGE_UPLOAD}
              onChange={({ currentFile: file }) => {
                const resourceName = values?.resourceName;
                const fileName = file?.fileInstance?.name;
                if (!resourceName && fileName) {
                  formApi.setValue("resourceName", fileName);
                }
              }}
            >
              <Button icon={<IconUpload />} theme="light">
                点击上传
              </Button>
            </Form.Upload>
            <Form.Input
              rules={[{ required: true }]}
              label="资源名称"
              field="resourceName"
              placeholder="请输入资源名称"
            />

            <Form.Input
              label="资源描述"
              field="description"
              placeholder="请输入资源描述"
            />
          </>
        );
      }}
    </FormModal>
  );
};
