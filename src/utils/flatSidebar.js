import loadable from "utils/loadable";

//  权限注册 格式化
export function flatSidebarAuthList(arr) {
  const list = [];

  for (let item of arr) {
    const { path, authList = [], includes = [] } = item;

    list.push(["sidebar_" + path, authList]);
    for (let i of includes) {
      const { path, authList = [] } = i;
      list.push(["sidebar_" + path, authList]);
    }
  }

  return list;
}

//  把所有菜单扁平化
export function flatSibarConfig(sidebarList) {
  const list = [];

  for (let item of sidebarList) {
    const { children = [] } = item;

    if (children.length > 0) {
      list.push(...flatSibarConfig(children));
    } else {
      list.push(item);
    }
  }

  return list;
}

//  注册路由  格式化菜单
export const flatSidebarRouteList = arr => {
  const list = [];
  for (let item of arr) {
    const { path, component, includes = [] } = item;

    list.push({ path, component: loadable(component) });
    for (let i of includes) {
      const { path, component } = i;
      list.push({ path, component: loadable(component) });
    }
  }
  return list;
};
