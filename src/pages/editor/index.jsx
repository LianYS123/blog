import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useCustomMutation, useRequest } from "hooks";
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
// import { RichEditor } from "./RichEditor";
import { DetailsConfirmModal } from "./DetailsConfirmModal";
import { Box } from "@mui/system";
import { MDEditor } from "./MdEditor";
import { SyncAlt } from "@mui/icons-material";
import { useAlertDialog } from "providers/AlertDialogProvider";
import { SkeletonList } from "components/skeleton";
import { useAppTitle } from "hooks/app";
import { TTEditor } from "./TTEditor";

/**
 * 文章编辑器
 */
function Editor() {
  useAppTitle();
  const history = useHistory();

  const { id } = useParams();
  const isEdit = !!id;

  const [articleName, setArticleName] = useState("");
  const [contentType, setContentType] = useState("RICH"); // 内容为富文本编辑器格式(RICH)还是Markdown(MD)格式
  const isRich = contentType === "RICH";

  const [initialValues, setInitialValues] = useState({}); // 文章确认后，点击下一步填充到信息编辑框中的内容
  const [visible, setVisible] = useState(false); // 是否显示编辑文章详细信息
  const [convertContent, setConvertContent] = useState();

  // 请求文章数据
  const { isLoading, data } = useRequest({
    service: GET_ARTICLE_DETAIL,
    params: { id },
    ready: !!id
  });

  useEffect(() => {
    setArticleName(data?.articleName);
    if (data?.contentType) {
      setContentType(data.contentType);
    } else if (data?.contentType === null) {
      setContentType("RICH");
    }
  }, [data]);

  // 新增/修改文章
  const [load, { loading: submiting }] = useCustomMutation(
    id ? EDIT_ARTICLE : ADD_ARTICLE
  );

  const getParamsFnRef = useRef();

  // 保存文章
  const handleSubmit = async values => {
    const params = getParamsFnRef.current();
    const { success, data } = await load({
      id,
      articleName,
      ...params,
      ...values,
      contentType
    });
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
      visibleStatus
    });
  };

  const { open: openAlertDialog } = useAlertDialog();

  // 修改编辑器类型
  const handleToggleType = () => {
    openAlertDialog({
      content: "编辑器类型改变后，可以能导致内容转换格式错误，你确定要转换吗？",
      onOk: () => {
        const params = getParamsFnRef.current();
        if (isRich) {
          setContentType("MD");
          setConvertContent(params.html);
        } else {
          setContentType("RICH");
          setConvertContent(params.markdownContent);
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

  const isNotEmpty = () => {
    if (isRich) {
      return !!data?.html;
    } else {
      return !!data?.markdownContent;
    }
  };

  const empty = !isNotEmpty();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        pb: 4,
        pt: 2
      }}
    >
      <AppTitle
        title={isEdit ? "编辑文章" : "写文章"}
        back={true}
        extra={extra}
      />
      <SkeletonList loading={isLoading} />
      {isLoading ? null : (
        <>
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
            <TTEditor
              isEdit={isEdit}
              data={data}
              convertContent={convertContent}
              getParamsFnRef={getParamsFnRef}
            />
          ) : (
            <MDEditor
              isEdit={isEdit}
              data={data}
              convertContent={convertContent}
              getParamsFnRef={getParamsFnRef}
            />
          )}
        </>
      )}

      {/* 编辑文章标签、摘要、封面图 */}
      <DetailsConfirmModal
        submiting={submiting}
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
