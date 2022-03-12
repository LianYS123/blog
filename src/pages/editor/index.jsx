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
import {
  Button,
  Container,
  IconButton,
  TextField,
  Tooltip
} from "@mui/material";
import _ from "lodash";
import { AppTitle } from "components/appTitle";
import { RichEditor } from "./RichEditor";
import { DetailsConfirmModal } from "./DetailsConfirmModal";
import { Box } from "@mui/system";
import { MDEditor } from "./MdEditor";
import { SyncAlt } from "@mui/icons-material";
import { useAlertDialog } from "providers/AlertDialogProvider";

/**
 * 文章编辑器
 */
function Editor() {
  const history = useHistory();

  const { id } = useParams();
  const isEdit = !!id;

  const [articleName, setArticleName] = useState("");
  const [contentType, setContentType] = useState("MD"); // 内容为富文本编辑器格式(RICH)还是Markdown(MD)格式
  const isRich = contentType === "RICH";

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
    const { success, data } = await load({ ...params, ...values, contentType });
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
    const { cover = data?.cover, summary, visibleStatus } = params;
    setInitialValues({
      cover,
      summary,
      tags: data?.tags,
      articleName,
      visibleStatus
    });
  };

  const { open: openAlertDialog } = useAlertDialog();

  // 修改编辑器类型
  const handleToggleType = () => {
    openAlertDialog({
      content: "编辑器类型改变后，编辑器中的内容不会被保存，你确定要转换吗？",
      onOk: () => {
        if (isRich) {
          setContentType("MD");
        } else {
          setContentType("RICH");
        }
      }
    });
  };

  const extra = (
    <Box>
      <Tooltip title={isRich ? "使用 Markdown 编辑器" : "使用富文本编辑器"}>
        <IconButton onClick={handleToggleType} sx={{ boxShadow: 0, mr: 2 }}>
          <SyncAlt />
        </IconButton>
      </Tooltip>
      <Button
        size="small"
        sx={{ boxShadow: 0 }}
        variant="contained"
        onClick={showDetails}
      >
        {isEdit ? "保存" : "发布"}
      </Button>
    </Box>
  );

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", height: "100%", pb: 4 }}
    >
      <AppTitle
        title={isEdit ? "编辑文章" : "写文章"}
        back={true}
        extra={extra}
      />
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
      {isRich ? (
        <RichEditor
          isEdit={isEdit}
          data={data}
          getParamsFnRef={getParamsFnRef}
        />
      ) : (
        <MDEditor isEdit={isEdit} data={data} getParamsFnRef={getParamsFnRef} />
      )}

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
