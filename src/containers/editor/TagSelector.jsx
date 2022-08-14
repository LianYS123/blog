import { Autocomplete, Chip, TextField } from "@mui/material";
import { ALL_TAGS } from "constants/index";

/**
 * 标签编辑器
 */
export const TagSelector = ({ tags, setTags }) => {
  return (
    <Autocomplete
      size="small"
      value={tags}
      onChange={(ev, value) => {
        setTags(value);
      }}
      multiple
      freeSolo
      fullWidth
      options={ALL_TAGS}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip size="small" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={params => (
        <TextField
          {...params}
          margin="dense"
          variant="standard"
          label="标签"
          placeholder="选择或输入标签"
        />
      )}
    />
  );
};
