import { Favorite, ThumbUp } from "@mui/icons-material";
import { CardActions, IconButton, Tooltip } from "@mui/material";
import { CollectionDialog } from "components/collection/SelectCollectionDialog";
import { useSnackbar } from "notistack";
import { useState } from "react";

// 操作
export const ArticleActions = props => {
  const { id: articleId } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [visible, setVisible] = useState(false);
  const close = () => setVisible(false);
  const open = () => setVisible(true);
  return (
    <CardActions>
      <Tooltip title="点赞">
        <IconButton
          onClick={ev => {
            ev.stopPropagation();
            enqueueSnackbar("建设中...");
          }}
        >
          <ThumbUp />
        </IconButton>
      </Tooltip>

      <Tooltip title="收藏">
        <IconButton
          onClick={ev => {
            ev.stopPropagation();
            open();
          }}
        >
          <Favorite />
        </IconButton>
      </Tooltip>
      {visible ? (
        <CollectionDialog
          visible={visible}
          close={close}
          articleId={articleId}
        ></CollectionDialog>
      ) : null}
    </CardActions>
  );
};
