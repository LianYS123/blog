import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import { FilterListOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";

// 动态内容过滤器
export const Filter = ({ onChange = () => {} }) => {
  const {
    userInfo: { id: userId }
  } = useSelector(state => state.app);
  const [anchorEl, setAnchorEl] = useState(null);
  const [visibleStatus, setVisibleStatus] = useState(); // 0：所有人可见, 1：仅自己可见
  const [createUser, setCreateUser] = useState();
  const [orderBy, setOrderBy] = useState("create_time"); // 排序方式
  const handleChange = values => {
    onChange({ visibleStatus, createUser, orderBy, ...values });
  };
  return (
    <div>
      <IconButton onClick={ev => setAnchorEl(ev.currentTarget)}>
        <FilterListOutlined />
      </IconButton>
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem dense>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={visibleStatus === 0}
                onChange={(ev, checked) => {
                  const visibleStatus = checked ? 0 : undefined;
                  handleChange({ visibleStatus });
                  setVisibleStatus(visibleStatus);
                }}
              />
            }
            label={<span className="text-sm">隐藏私有内容</span>}
          />
        </MenuItem>
        <MenuItem dense>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={createUser === userId}
                onChange={(ev, checked) => {
                  const createUser = checked ? userId : undefined;
                  handleChange({ createUser });
                  setCreateUser(createUser);
                }}
              />
            }
            label={<span className="text-sm">只看我发表的</span>}
          />
        </MenuItem>
        <MenuItem dense>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={orderBy === "update_time"}
                onChange={(ev, checked) => {
                  const orderBy = checked ? "update_time" : "create_time";
                  handleChange({ orderBy });
                  setOrderBy(orderBy);
                }}
              />
            }
            label={<span className="text-sm">按更新时间排序</span>}
          />
        </MenuItem>
      </Menu>
    </div>
  );
};
