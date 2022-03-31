import { Favorite } from "@mui/icons-material";
import { IconButton } from "@mui/material";
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
