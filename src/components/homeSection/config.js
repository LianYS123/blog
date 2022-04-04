export const typeOptions = [
  {
    label: "文章",
    value: 0
  },
  {
    label: "资源",
    value: 1
  },
  {
    label: "图书",
    value: 2
  },
  {
    label: "文章合集",
    value: 3
  },
  {
    label: "资源合集",
    value: 4
  },
  {
    label: "图书合集",
    value: 5
  },
  {
    label: "文章合集展开",
    value: 6
  },
  {
    label: "资源合集展开",
    value: 7
  },
  {
    label: "图书合集展开",
    value: 8
  }
];

export const typeLabelMap = typeOptions.reduce(
  (pre, { label, value }) => ({ ...pre, [value]: label }),
  {}
);
