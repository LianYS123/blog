import { Button, Empty, Form, Pagination, Skeleton } from "@douyinfe/semi-ui";
import { ArticlePlaceholder } from "components/skeleton";
import { useModalAction, useMutation, useTable } from "hooks";
import React from "react";
import { ADD_ESSAY, GET_ESSAY_LIST } from "services/essay";
import { EditEssayModal } from "./EditEssayModal";
import { EssayItem } from "./EssayItem";

const Essay = () => {
  const { tableProps, loading, reload } = useTable({
    service: GET_ESSAY_LIST
  });
  const { dataSource, pagination } = tableProps;
  const { open, ...essayModalProps } = useModalAction();
  return (
    <div className="container">
      <Button onClick={() => open()}>写</Button>
      <div className="space-y-3 mb-4">
        {dataSource.length ? (
          dataSource.map(it => (
            <Skeleton
              active
              key={it.id}
              loading={loading}
              placeholder={<ArticlePlaceholder />}
            >
              <EssayItem {...it} />
            </Skeleton>
          ))
        ) : (
          <Skeleton
            active
            loading={loading}
            placeholder={<ArticlePlaceholder />}
          >
            <Empty />
          </Skeleton>
        )}
      </div>
      {dataSource.length ? <Pagination {...pagination} /> : null}
      <EditEssayModal {...essayModalProps} reload={reload} />
    </div>
  );
};

export default Essay;
