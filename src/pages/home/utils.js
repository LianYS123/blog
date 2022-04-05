import { Link } from "react-router-dom";

/**
 * 获取跳转按钮属性
 */
export const getItemActionProps = ({ to, item, onItemClick }) => {
  if (to) {
    return {
      component: Link,
      to: typeof to === "function" ? to(item) : to
    };
  } else if (onItemClick) {
    return {
      onClick: () => onItemClick(item)
    };
  } else if (item.link) {
    return {
      component: "a",
      target: "_blank",
      href: item.link
    };
  }
};
