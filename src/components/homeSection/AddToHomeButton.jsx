import AddToHomeScreenIcon from "@mui/icons-material/AddToHomeScreen";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip
} from "@mui/material";
import { useCustomMutation } from "hooks";
import { useState } from "react";
import { useSelector } from "react-redux";
import { DELETE_HOME_SECTION, HOME_SECTION_LIST } from "services/homeSection";
import { SectionItemDialog } from "./SectionItemDialog";

export const AddToHomeButton = ({ ...props }) => {
  const {
    userInfo: { adminType }
  } = useSelector(state => state.app);
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [record, setRecord] = useState(props.record);
  const [isEdit, setIsEdit] = useState(false);

  const [getList] = useCustomMutation(HOME_SECTION_LIST);
  const [deleteItem, { loading }] = useCustomMutation(DELETE_HOME_SECTION, {
    successMessage: "已移除"
  });

  const hasAuth = adminType === 1;
  return hasAuth ? (
    <>
      <Tooltip title="添加到主页">
        <IconButton
          onClick={async ev => {
            const { data } = await getList({ itemId: record.id });
            if (data && data.length > 0) {
              setConfirmVisible(true);
              setRecord(data[0]);
            } else {
              setVisible(true);
            }
          }}
        >
          <AddToHomeScreenIcon />
        </IconButton>
      </Tooltip>
      <SectionItemDialog
        visible={visible}
        close={() => setVisible(false)}
        {...props}
        isEdit={isEdit}
        record={record}
      />

      <Dialog open={confirmVisible} onClose={() => setConfirmVisible(false)}>
        <DialogTitle>提示</DialogTitle>
        <DialogContent>
          <DialogContentText>
            当前内容已存在于主页的推荐列表中，你可以选择编辑或移除改项
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={() => setConfirmVisible(false)}>取消</Button> */}
          <Button
            onClick={() => {
              setIsEdit(true);
              setConfirmVisible(false);
              setVisible(true);
            }}
            autoFocus
          >
            编辑
          </Button>
          <LoadingButton
            loading={loading}
            color="error"
            onClick={() => {
              deleteItem({ id: record.id });
            }}
            autoFocus
          >
            移除
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  ) : null;
};
