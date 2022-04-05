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
import { pink } from "@mui/material/colors";
import { useCustomMutation } from "hooks";
import { useIsAdmin, useSectionList } from "hooks/app";
import { useState } from "react";
import { DELETE_HOME_SECTION } from "services/homeSection";
import { typeLabelMap } from "./config";
import { SectionItemDialog } from "./SectionItemDialog";

export const AddToHomeButton = ({ children, ...props }) => {
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [record, setRecord] = useState(props.record);
  const [isEdit, setIsEdit] = useState(false);

  const [deleteItem, { loading }] = useCustomMutation(DELETE_HOME_SECTION, {
    successMessage: "已移除"
  });

  const { exist, currentItem, refetch } = useSectionList({ itemId: record.id });
  const isAdmin = useIsAdmin();

  const handleAddToHome = async ev => {
    if (exist) {
      setConfirmVisible(true);
      setRecord(currentItem);
    } else {
      setVisible(true);
    }
  };

  const handleEdit = () => {
    setIsEdit(true);
    setConfirmVisible(false);
    setVisible(true);
  };

  const handleRemove = async () => {
    await deleteItem([{ id: record.id }]);
    setConfirmVisible(false);
    refetch();
  };

  return isAdmin ? (
    <>
      {children ? (
        <div onClick={handleAddToHome}>{children}</div>
      ) : (
        <Tooltip
          title={exist ? typeLabelMap[currentItem?.sectionType] : "添加到主页"}
        >
          <IconButton onClick={handleAddToHome}>
            <AddToHomeScreenIcon
              sx={{
                color: exist ? pink[300] : undefined
              }}
            />
          </IconButton>
        </Tooltip>
      )}

      {/* 已经收藏过了提示框 */}
      <Dialog open={confirmVisible} onClose={() => setConfirmVisible(false)}>
        <DialogTitle>提示</DialogTitle>
        <DialogContent>
          <DialogContentText>
            当前内容已存在于主页的推荐列表中，你可以选择编辑或移除改项
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={() => setConfirmVisible(false)}>取消</Button> */}
          <Button onClick={handleEdit} autoFocus>
            编辑
          </Button>
          <LoadingButton
            loading={loading}
            color="error"
            onClick={handleRemove}
            autoFocus
          >
            移除
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {/* 收藏内容编辑器 */}
      <SectionItemDialog
        visible={visible}
        close={() => setVisible(false)}
        {...props}
        isEdit={isEdit}
        record={record}
        reload={refetch}
      />
    </>
  ) : null;
};
