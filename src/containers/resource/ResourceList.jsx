import ResourceItem from "./ResourceItem";
import { Masonry } from "@mui/lab";
import SingleRsItem from "./SingleRsItem";
import { Grid, Stack } from "@mui/material";

export const ResourceList = ({ layout, rows, ...commonProps }) => {
  // 网格
  const renderGrid = () => {
    return (
      <Grid container spacing={2}>
        {rows.map(it => {
          return (
            <Grid item key={it.id} xs={12} sm={6} md={4}>
              <ResourceItem {...it} {...commonProps} />
            </Grid>
          );
        })}
      </Grid>
    );
  };

  // 瀑布流
  const renderMasonry = () => {
    return (
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={4}>
        {rows.map(it => {
          return <ResourceItem {...it} key={it.id} {...commonProps} />;
        })}
      </Masonry>
    );
  };

  // 单列
  const renderSingle = () => {
    return (
      <Stack spacing={2}>
        {rows.map(it => {
          return <SingleRsItem {...it} key={it.id} {...commonProps} />;
        })}
      </Stack>
    );
  };

  return (
    <>
      {layout === "grid" && renderGrid()}
      {layout === "single" && renderSingle()}
      {layout === "masonry" && renderMasonry()}
    </>
  );
};
