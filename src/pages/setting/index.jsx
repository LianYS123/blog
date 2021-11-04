import { Tabs } from "@douyinfe/semi-ui";
import React from "react";
import DictManager from "./dict";
import TagManager from "./tags";

const Setting = () => {
  return (
    <div className="py-4">
      <Tabs keepDOM={false} type="line">
        <Tabs.TabPane className="py-2" tab="字典管理" itemKey="dict">
          <DictManager />
        </Tabs.TabPane>
        <Tabs.TabPane className="py-2" tab="标签管理" itemKey="tags">
          <TagManager />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Setting;
