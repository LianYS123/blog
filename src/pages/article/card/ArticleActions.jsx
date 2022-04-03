import { Favorite, ThumbUp } from "@mui/icons-material";
import { CardActions, IconButton, Tooltip } from "@mui/material";
import { CollectionIconButton } from "components/collection/CollectionIconButton";
import { CollectionDialog } from "components/collection/SelectCollectionDialog";
import { AddToHomeButton } from "components/homeSection/AddToHomeButton";
import { COLLECTION_TYPES, HOME_SECTION_TYPES } from "constants/index";
import { useSnackbar } from "notistack";

// 操作
export const ArticleActions = record => {
  return (
    <CardActions>
      {/* <Tooltip title="点赞">
        <IconButton
          onClick={ev => {
            ev.stopPropagation();
            enqueueSnackbar("建设中...");
          }}
        >
          <ThumbUp />
        </IconButton>
      </Tooltip> */}

      <CollectionIconButton
        collected={record.collected}
        type={COLLECTION_TYPES.ARTICLE}
        itemId={record.id}
      />
      <AddToHomeButton
        sectionType={HOME_SECTION_TYPES.ARTICLE}
        record={record}
      />
    </CardActions>
  );
};
