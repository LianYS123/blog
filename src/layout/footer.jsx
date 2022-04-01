import { Email, GitHub } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { APP_MENUS } from "./config";

export const AppFooter = () => {
  return (
    <footer className="footer text-lg mt-40 pb-16">
      <div>
        <span className="footer-title text-base">导航</span>
        {APP_MENUS.map(it => (
          <Link className="link link-hover" key={it.to} to={it.to}>
            {it.text}
          </Link>
        ))}
      </div>

      <div>
        <span className="footer-title text-base">工作技能</span>
        <a className="link link-hover">HTML & CSS</a>
        <a className="link link-hover">Javascript</a>
        <a className="link link-hover">React & Vue</a>
        <a className="link link-hover">Webpack</a>
        <a className="link link-hover">Typescript</a>
        <a className="link link-hover">Java...</a>
      </div>

      <div>
        <span className="footer-title text-base">联系方式</span>
        <div className="grid grid-flow-col gap-4">
          <a href="https://github.com/LianYS123" target="_blank">
            <GitHub />
          </a>
          <a>
            <Tooltip title="1732554225@qq.com">
              <Email />
            </Tooltip>
          </a>
        </div>
      </div>
    </footer>
  );
};
