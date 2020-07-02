import React from 'react';
import menus from '../menu';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
const { SubMenu, Item } = Menu;
const NavMenu = () => (
  <>
    <Menu mode="inline" theme='dark'>
      {menus.map(({ key, link, description, children }) =>
        !Array.isArray(children) ? (
          <Item key={key}>{link && <Link to={link}>{description}</Link>}</Item>
        ) : (
          <SubMenu key={key} title={description}>
            {children.map(({ key, link, description }) => (
              <Item key={key}>
                {link && <Link to={link}>{description}</Link>}
              </Item>
            ))}
          </SubMenu>
        )
      )}
    </Menu>
  </>
);
export default NavMenu;
