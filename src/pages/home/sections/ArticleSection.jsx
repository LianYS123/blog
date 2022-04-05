import { HOME_SECTION_TYPES } from "constants/index";
import { useSectionListByType } from "hooks/app";
import routers from "routers";
import { BigCardSection } from "../components/BigCardSection";

export const ArticleSection = () => {
  const list = useSectionListByType(HOME_SECTION_TYPES.ARTICLE);
  const to = item => routers.DETAIL.replace(":id", item.itemId);
  return <BigCardSection to={to} list={list} />;
};
