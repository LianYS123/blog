import { Anchor, Empty } from "@douyinfe/semi-ui";

const { Link } = Anchor;
//

/**
 *  文章快速跳转导航栏
 * */
export const Outline = ({ outline }) => {
  // 渲染文章导航
  const renderLink = list => {
    return list.map(item => {
      let { id, children, title } = item;
      if (children && children.length > 0) {
        return (
          <Link key={id} href={`#${id}`} title={title}>
            {renderLink(children)}
          </Link>
        );
      } else {
        return <Link key={id} href={`#${id}`} title={title} />;
      }
    });
  };

  return outline && outline.length ? (
    <Anchor style={{ height: 450 }}>{renderLink(outline)}</Anchor>
  ) : null;
};
