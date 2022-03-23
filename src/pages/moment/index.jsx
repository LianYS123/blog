import { Paper, Stack } from "@mui/material";
import { Empty } from "components/empty";
import { SkeletonList } from "components/skeleton";
import { useFetchList } from "hooks";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MOMENT_LIST } from "services/moment";
import { MomentEditor } from "./MomentEditor";
import { MomentItem } from "./MomentItem";
import { Filter } from "./Filter";
import { useAppTitle } from "hooks/app";
import { ScrollTop } from "components/scrollTop";

const Moment = () => {
  useAppTitle();
  const [editorRecord, setEditorRecord] = useState();
  const [params, setParams] = useState({});
  const {
    list = [],
    reload,
    loadingFirstPage,
    isFetchingNextPage,
    isLoading,
    removeItemById,
    editItem
  } = useFetchList({
    service: MOMENT_LIST,
    params: { pageSize: 10, ...params }
  });
  const { logged } = useSelector(state => state.app);
  return (
    <div className="container py-8 md:pb-16">
      <ScrollTop />
      <div className="mb-8">
        <Paper>
          <MomentEditor editable={true} onSuccess={() => reload()} />
        </Paper>
      </div>
      {logged ? (
        <div className="flex justify-end">
          <Filter onChange={params => setParams(params)} />
        </div>
      ) : null}

      <SkeletonList
        showButton={false}
        showImage={false}
        loading={loadingFirstPage}
      />
      <Stack spacing={2}>
        {list.map(it => (
          <MomentItem
            key={it.id}
            setEditorRecord={setEditorRecord}
            editorRecord={editorRecord}
            reload={reload}
            removeItemById={removeItemById}
            editItem={editItem}
            {...it}
          />
        ))}
      </Stack>

      {!list.length && !isLoading ? <Empty /> : null}
      <SkeletonList
        showButton={false}
        showImage={false}
        loading={isFetchingNextPage}
      />
    </div>
  );
};

export default Moment;
