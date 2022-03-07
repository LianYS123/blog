import { Paper, Stack } from "@mui/material";
import { Empty } from "components/empty";
import { SkeletonList } from "components/skeleton";
import { useFetchList } from "hooks";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MOMENT_LIST } from "services/moment";
import { MomentEditor } from "./MomentEditor";
import { MomentItem } from "./MomentItem";
import { Filter } from "./Filter";

const Moment = () => {
  const [editorRecord, setEditorRecord] = useState();
  const [params, setParams] = useState({});
  const {
    list = [],
    reload,
    search,
    loadingFirstPage,
    loadingMore,
    loading,
    removeItemById,
    editItem
  } = useFetchList({
    service: MOMENT_LIST,
    necessaryParams: { pageSize: 10, ...params }
  });
  const { logged } = useSelector(state => state.app);
  return (
    <div className="container py-8 md:pb-16">
      <div className="mb-8">
        <Paper>
          <MomentEditor reload={reload} />
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

      {!list.length && !loading ? <Empty /> : null}
      <SkeletonList
        showButton={false}
        showImage={false}
        loading={loadingMore}
      />
    </div>
  );
};

export default Moment;