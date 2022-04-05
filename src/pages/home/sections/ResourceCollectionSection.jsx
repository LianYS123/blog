import { HOME_SECTION_TYPES } from "constants/index";
import { useSectionListByType } from "hooks/app";
import { useHistoryState } from "hooks";
import { ResourceCollectionDrawer } from "pages/space/tabs/collection/ResourceCollectionDrawer";
import { SwiperSection } from "../components/SwiperSection";
import { GridSection } from "../components/GridSection";
import routers from "routers";

export const ResourceCollectionSection = () => {
  //
  const list = useSectionListByType(HOME_SECTION_TYPES.RESOURCE_COLLECTION);

  const { state, setState } = useHistoryState();
  const { resourceDrawerVisible = false, resourceDrawerItemId } = state;
  const open = () => setState({ resourceDrawerVisible: true });
  const close = () => setState({ resourceDrawerVisible: false });

  return (
    <>
      <GridSection
        title="资源合集"
        list={list}
        toMore={routers.RESOURCE}
        onItemClick={item => {
          setState({
            resourceDrawerItemId: item.itemId,
            resourceDrawerVisible: true
          });
        }}
      />

      <ResourceCollectionDrawer
        hideActions={true}
        id={resourceDrawerItemId}
        visible={resourceDrawerVisible}
        open={open}
        close={close}
      />
    </>
  );
};
