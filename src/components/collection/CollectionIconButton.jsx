import { Favorite } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { pink } from "@mui/material/colors";
import { useAssertLogged } from "hooks/app";
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

  const { assertLoggedWithoutError } = useAssertLogged();

  useEffect(() => {
    setCollected(c);
  }, [c]);

  return (
    <>
      <Tooltip title="收藏">
        <IconButton
          onClick={ev => {
            if (assertLoggedWithoutError()) {
              openCollectionDialog();
            }
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
