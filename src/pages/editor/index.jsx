import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useMutation, useRequest } from "hooks";
import { Spin } from "@douyinfe/semi-ui";
import routers from "routers";
import {
  ADD_ARTICLE,
  EDIT_ARTICLE,
  GET_ARTICLE_DETAIL
} from "services/article";
import { Button, Container, TextField } from "@mui/material";
import _ from "lodash";
import { AppTitle } from "components/appTitle";
import { RichEditor } from "./RichEditor";
import { DetailsConfirmModal } from "./DetailsConfirmModal";

function Editor() {
  const history = useHistory();

  const { id } = useParams();
  const isEdit = !!id;

  const [articleName, setArticleName] = useState("");

  const [initialValues, setInitialValues] = useState({}); // 文章确认后，点击下一步填充到信息编辑框中的内容
  const [visible, setVisible] = useState(false); // 是否显示编辑文章详细信息

  // 请求文章数据
  const { loading, data } = useRequest({
    service: GET_ARTICLE_DETAIL,
    necessaryParams: { id },
    ready: !!id
  });

  useEffect(() => {
    setArticleName(data?.articleName);
  }, [data]);

  // 新增/修改文章
  const [load] = useMutation(id ? EDIT_ARTICLE : ADD_ARTICLE, null, {
    autoHandleError: true
    // successMessage: isEdit ? "文章修改成功" : "文章发布成功"
  });

  const getParamsFnRef = useRef();

  // 保存文章
  const handleSubmit = async values => {
    const params = getParamsFnRef.current();
    const { success, data } = await load({ ...params, ...values });
    if (success) {
      if (isEdit) {
        history.goBack();
      } else {
        // 如果是新增，跳转到文章详情页，并保证再次返回会回到文章列表页
        history.push(routers.DETAIL.replace(":id", data), {
          path: routers.ARTICLE_LIST
        });
      }
    }
  };

  // 编辑完成，点击下一步打开文章信息框
  const showDetails = () => {
    setVisible(true);
    const params = getParamsFnRef.current();
    const { cover, summary } = params;
    setInitialValues({
      cover,
      summary,
      tags: data?.tags,
      articleName
    });
  };

  return (
    <Container>
      <AppTitle
        title={isEdit ? "编辑文章" : "写文章"}
        back={true}
        extra={
          <Button
            size="small"
            sx={{ boxShadow: 0 }}
            variant="contained"
            onClick={showDetails}
          >
            {isEdit ? "保存" : "发布"}
          </Button>
        }
      />
      <Spin spinning={loading}>
        {/* 文章标题 */}
        <TextField
          variant="standard"
          size="small"
          value={articleName}
          onChange={ev => setArticleName(ev.target.value)}
          name="articleName"
          fullWidth
          label="标题"
          sx={{ mb: 2 }}
        />

        {/* 文章内容编辑器 */}
        <RichEditor
          isEdit={isEdit}
          data={data}
          getParamsFnRef={getParamsFnRef}
        />
      </Spin>

      {/* 编辑文章标签、摘要、封面图 */}
      <DetailsConfirmModal
        record={data}
        initialValues={initialValues}
        visible={visible}
        onOpen={() => setVisible(true)}
        onClose={() => setVisible(false)}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}

export default Editor;
