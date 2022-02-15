import { Skeleton } from "@mui/material";
import React from "react";

export const SkeletonList = ({ loading, count = 5 }) => {
  const arr = [];
  for (let i = 0; i < count; i++) arr.push(i);
  return loading ? arr.map(index => <Skeleton key={index} />) : null;
};
