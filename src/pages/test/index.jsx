import { Button, Dropdown, Popover } from "@douyinfe/semi-ui";
import { UserAvatar } from "components/user";
import React from "react";
import { useSelector } from "react-redux";

export default function Test() {
  const { userInfo } = useSelector(state => state.app);
  return (
    <div className="container p-8">
      {/* <Dropdown trigger="click" menu={[{ node: "item", name: "test" }]}> */}
      <Popover
        content={
          <Dropdown.Menu>
            <Dropdown.Item>写文章</Dropdown.Item>
            <Dropdown.Item>个人空间</Dropdown.Item>
            <Dropdown.Item>退出</Dropdown.Item>
          </Dropdown.Menu>
        }
      >
        <span>
          <UserAvatar size="small" userInfo={userInfo} />
        </span>
        {/* <Button>test</Button> */}
      </Popover>
      {/* </Dropdown> */}
    </div>
  );
}
