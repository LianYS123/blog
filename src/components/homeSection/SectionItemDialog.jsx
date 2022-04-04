import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField
} from "@mui/material";
import { HOME_SECTION_TYPES } from "constants/index";
import { getCommonFieldProps } from "utils";
import { typeOptions } from "./config";
import { useSectionItemFormik } from "./hooks";

/**
 * 编辑/添加主页推荐条目的弹出框
 */
export const SectionItemDialog = props => {
  const { visible, isEdit, close, sectionType } = props;
  const { formik, loading } = useSectionItemFormik({ ...props });

  /**
   * 此方法是为了过滤掉不能被选择的模块类型，写得有点乱。
   */
  const getOptions = () => {
    const {
      ARTICLE_COLLECTION,
      ARTICLE_COLLECTION_EXPAND,
      RESOURCE_COLLECTION,
      RESOURCE_COLLECTION_EXPAND,
      BOOK_COLLECTION,
      BOOK_COLLECTION_EXPAND
    } = HOME_SECTION_TYPES;

    const articleCollectionTypes = [
      ARTICLE_COLLECTION,
      ARTICLE_COLLECTION_EXPAND
    ];
    const resourceCollectionTypes = [
      RESOURCE_COLLECTION,
      RESOURCE_COLLECTION_EXPAND
    ];
    const bookCollectionTypes = [BOOK_COLLECTION, BOOK_COLLECTION_EXPAND];

    if (articleCollectionTypes.includes(sectionType)) {
      return typeOptions.filter(it =>
        articleCollectionTypes.includes(it.value)
      );
    }
    if (resourceCollectionTypes.includes(sectionType)) {
      return typeOptions.filter(it =>
        resourceCollectionTypes.includes(it.value)
      );
    }
    if (bookCollectionTypes.includes(sectionType)) {
      return typeOptions.filter(it => bookCollectionTypes.includes(it.value));
    }
    return typeOptions.filter(it => it.value === sectionType);
  };
  return (
    <Dialog open={visible} onClose={() => close()}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          {isEdit ? "编辑" : "创建"}
          模块
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            select
            variant="standard"
            label="推荐类型"
            fullWidth
            {...getCommonFieldProps("sectionType", formik)}
          >
            {getOptions().map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            fullWidth
            variant="standard"
            label="模块 ID"
            {...getCommonFieldProps("itemId", formik)}
          />
          <TextField
            margin="dense"
            fullWidth
            variant="standard"
            label="模块名称"
            {...getCommonFieldProps("itemName", formik)}
          />

          <TextField
            margin="dense"
            fullWidth
            variant="standard"
            label="描述"
            multiline
            maxRows={6}
            {...getCommonFieldProps("itemDesc", formik)}
          />

          <TextField
            margin="dense"
            fullWidth
            variant="standard"
            label="图片"
            {...getCommonFieldProps("itemImage", formik)}
          />

          <TextField
            margin="dense"
            fullWidth
            variant="standard"
            label="链接地址"
            {...getCommonFieldProps("itemLink", formik)}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={() => close()}>
            取消
          </Button>
          <LoadingButton color="primary" loading={loading} type="submit">
            确认
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
