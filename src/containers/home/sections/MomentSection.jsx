import { Box, Paper, Typography } from "@mui/material";
import { HOME_SECTION_TYPES } from "constants/index";
import { useFetchList } from "hooks";
import { useSectionListByType } from "hooks/app";
import Link from "next/link";
import routers from "routers";
import { MOMENT_LIST } from "services/moment";
import { timestampFormat } from "utils";
import { SwiperList } from "../components/SwiperList";

export const MomentSection = () => {
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
    params: { pageSize: 30 }
  });

  // // 编辑器
  // const editor = useMinimalEditor({
  //   editable: false,
  //   content: record?.html,
  //   placeholder: `说点什么吧...`
  // });

  return (
    <SwiperList
      title="动态"
      to={routers.MOMENT}
      list={list}
      renderItem={item => {
        return (
          <Paper
            sx={{
              p: 4,
              width: {
                xs: 300,
                sm: 524
              },
              height: {
                sm: 648,
                xs: 500
              },
              borderRadius: 6,
              overflow: "auto"
            }}
          >
            <div className="ProseMirror">
              <div dangerouslySetInnerHTML={{ __html: item.html }}></div>
            </div>
            <div className="font-semibold text-lg mt-6">
              <span className="mr-4">{item.authorName}</span>
              {timestampFormat(item.createTime)}
            </div>
            {/* <Typography sx={{ lineHeight: 2, fontSize: 16 }} variant="body">
              {item.itemDesc}
            </Typography> */}
          </Paper>
        );
      }}
    />
  );
};
