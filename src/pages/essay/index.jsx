import { Empty, Pagination, Skeleton } from "@douyinfe/semi-ui";
import { ArticlePlaceholder } from "components/skeleton";
import { useModalAction, useTable } from "hooks";
import React from "react";
import { GET_ESSAY_LIST } from "services/essay";
import { EditEssayModal } from "./EditEssayModal";
import { EssayEditor } from "./EssayEditor";
import { EssayItem } from "./EssayItem";

const Essay = () => {
  const { tableProps, loading, reload } = useTable({
    service: GET_ESSAY_LIST
  });
  const { dataSource, pagination } = tableProps;
  const { open: openEssayModal, ...essayModalProps } = useModalAction();
  const skeletonPlaceholder = (
    <ArticlePlaceholder showButton={false} showImage={false} />
  );
  return (
    <div className="container">
      {/* <Button onClick={() => openEssayModal()}>写</Button> */}
      <div className="mb-8">
        <EssayEditor reload={reload} />
      </div>
      <div className="space-y-3 mb-4">
        {dataSource.length ? (
          dataSource.map(it => (
            <Skeleton
              active
              key={it.id}
              loading={loading}
              placeholder={skeletonPlaceholder}
            >
              <EssayItem
                openEssayModal={openEssayModal}
                reload={reload}
                {...it}
              />
            </Skeleton>
          ))
        ) : (
          <Skeleton active loading={loading} placeholder={skeletonPlaceholder}>
            <Empty />
          </Skeleton>
        )}
      </div>
      {dataSource.length ? <Pagination {...pagination} /> : null}
      {essayModalProps.visible ? (
        <EditEssayModal {...essayModalProps} reload={reload} />
      ) : null}
    </div>
  );
};

export default Essay;
