import { Paper } from "@mui/material";
import { SkeletonList } from "components/skeleton";
import { useFetchList, useModalAction } from "hooks";
import React, { useState } from "react";
import { MOMENT_LIST } from "services/essay";
import { EssayEditor } from "./EssayEditor";
import { EssayItem } from "./EssayItem";

const Essay = () => {
  const {
    list = [],
    reload,
    loadingFirstPage,
    loadingMore
  } = useFetchList({
    service: MOMENT_LIST,
    necessaryParams: { pageSize: 10 }
  });
  const [editorRecord, setEditorRecord] = useState();
  return (
    <div className="container py-8 md:pb-16">
      <div className="mb-8">
        <Paper>
          <EssayEditor reload={reload} />
        </Paper>
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
            setEditorRecord={setEditorRecord}
            editorRecord={editorRecord}
            reload={reload}
            {...it}
          />
        ))}
        <SkeletonList
          showButton={false}
          showImage={false}
          loading={loadingMore}
        />
      </div>
      {/* {essayModalProps.visible ? (
        <EditEssayModal {...essayModalProps} reload={refresh} />
      ) : null} */}
    </div>
  );
};

export default Essay;
