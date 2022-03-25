export const renderOutline = elements => {
  const outline = [];

  const pushLast = (obj, arr) => {
    const level = obj.level;
    const lastObj = arr[arr.length - 1];
    const lastLevel = (lastObj || {}).level || 0;
    if (arr && arr.length) {
      if (level <= lastLevel) {
        arr.push(obj);
      } else {
        pushLast(obj, lastObj.children);
      }
    } else {
      arr.push(obj);
    }
  };
  let uid = 0;

  Array.from(elements).forEach(ele => {
    if ("H1 H2 H3 H4".includes(ele.nodeName)) {
      const id = `article-h${++uid}`;
      ele.id = id;
      const hMap = {
        H1: 1,
        H2: 2,
        H3: 3,
        H4: 4
      };
      const obj = {
        id,
        title: ele.innerText,
        level: hMap[ele.nodeName],
        children: []
      };
      pushLast(obj, outline);
    }
  });

  return outline;
};
