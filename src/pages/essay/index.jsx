import { SkeletonList } from "components/skeleton";
import { useFetchList, useModalAction } from "hooks";
import React from "react";
import { GET_ESSAY_LIST } from "services/essay";
import { EditEssayModal } from "./EditEssayModal";
import { EssayEditor } from "./EssayEditor";
import { EssayItem } from "./EssayItem";

const Essay = () => {
  const { open: openEssayModal, ...essayModalProps } = useModalAction();
  const {
    list = [],
    reload,
    refresh,
    loadingFirstPage,
    loadingMore
  } = useFetchList({
    service: GET_ESSAY_LIST
  });
  return (
    <div className="container pb-8 md:pb-16">
      <div className="mb-8">
        <EssayEditor reload={refresh} />
      </div>
      <div className="space-y-3 mb-4">
        <SkeletonList
          showButton={false}
          showImage={false}
          loading={loadingFirstPage}
        />
        {list.map(it => (
          <EssayItem
            key={it.id}
            openEssayModal={openEssayModal}
            reload={refresh}
            {...it}
          />
        ))}
        <SkeletonList
          showButton={false}
          showImage={false}
          loading={loadingMore}
        />
      </div>
      {essayModalProps.visible ? (
        <EditEssayModal {...essayModalProps} reload={refresh} />
      ) : null}
    </div>
  );
};

export default Essay;
