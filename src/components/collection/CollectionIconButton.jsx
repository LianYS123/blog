import { Favorite } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { pink } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { CollectionDialog } from "./SelectCollectionDialog";

export const CollectionIconButton = ({
  collected: c = false,
  type,
  itemId
}) => {
  const [collected, setCollected] = useState(c); // 文章是否被收藏

  // 收藏夹可视状态
  const [collectionVisible, setCollectionVisible] = useState(false);

  const closeCollectionDialog = () => {
    setCollectionVisible(false);
  };
  const openCollectionDialog = () => setCollectionVisible(true);

  useEffect(() => {
    setCollected(c);
  }, [c]);

  return (
    <>
      <Tooltip title="收藏">
        <IconButton
          onClick={ev => {
            // ev.preventDefault();
            ev.stopPropagation();
            openCollectionDialog(true);
          }}
        >
          <Favorite
            sx={{
              color: collected ? pink[300] : undefined
            }}
          />
        </IconButton>
      </Tooltip>

      {collectionVisible ? (
        <CollectionDialog
          onChange={c => setCollected(c)}
          visible={collectionVisible}
          close={closeCollectionDialog}
          itemId={itemId}
          type={type}
        />
      ) : null}
    </>
  );
};
