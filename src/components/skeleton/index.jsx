import { Skeleton } from "@mui/material";
import React from "react";

// export const ArticlePlaceholder = ({ showImage = true, showButton = true }) => (
//   <section className="shadow-sm px-4 py-3 flex rounded">
//     <div className="flex w-full flex-col justify-between">
//       <div className="space-y-1">
//         <Skeleton.Title className="font-bold w-48"></Skeleton.Title>
//         <div className="flex h-16 md:h-24">
//           <Skeleton.Paragraph className="flex-auto h-full mr-1 md:mr-4"></Skeleton.Paragraph>
//           {showImage && (
//             <Skeleton.Image className="h-full w-24 flex-shrink-0 md:w-40" />
//           )}
//         </div>
//       </div>
//       {showButton && (
//         <div className="space-x-2 flex">
//           <Skeleton.Button />
//           <Skeleton.Button />
//         </div>
//       )}
//     </div>
//   </section>
// );

export const SkeletonList = ({ loading, count = 5 }) => {
  const arr = [];
  for (let i = 0; i < count; i++) arr.push(i);
  return loading ? arr.map(index => <Skeleton key={index} />) : null;
};
