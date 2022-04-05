import { HOME_SECTION_TYPES } from "constants/index";
import { useSectionListByType } from "hooks/app";
import routers from "routers";
import { useHistoryState } from "hooks";
import { GridSection } from "../components/GridSection";
import { ArticleCollectionDrawer } from "pages/space/tabs/collection/ArticleCollectionDrawer";

export const ArticleCollectionSection = () => {
  const list = useSectionListByType(HOME_SECTION_TYPES.ARTICLE_COLLECTION);

  const { state, setState } = useHistoryState();
  const { articleDrawerVisible = false, articleDrawerItemId } = state;

  const open = () => setState({ articleDrawerVisible: true });
  const close = () => setState({ articleDrawerVisible: false });

  const onItemClick = item => {
    setState({
      articleDrawerItemId: item.itemId,
      articleDrawerVisible: true
    });
  };

  return (
    <>
      <GridSection
        title="文章合集"
        list={list}
        onItemClick={onItemClick}
        toMore={routers.ARTICLE_LIST}
      />

      <ArticleCollectionDrawer
        hideActions={true}
        id={articleDrawerItemId}
        visible={articleDrawerVisible}
        open={open}
        close={close}
      />
    </>
  );
};
