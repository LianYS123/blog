import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { GET_ARTICLE_DETAIL } from "services/article";
import { useRequest } from "hooks";
import { SkeletonList } from "components/skeleton";
import { Empty } from "components/empty";

export default function About() {
  const { data, loading } = useRequest({
    service: GET_ARTICLE_DETAIL,
    necessaryParams: { id: "1501042644703285249" },
    initialData: { html: "" }
  });
  const { html } = data;
  return (
    <Box>
      <SkeletonList loading={loading} />

      {html ? (
        <article
          id="htmlTemplate"
          dangerouslySetInnerHTML={{ __html: html }}
        ></article>
      ) : (
        <Empty className="my-12" />
      )}
    </Box>
  );
}
