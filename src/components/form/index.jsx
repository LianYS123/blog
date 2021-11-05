import { withField } from "@douyinfe/semi-ui";
import { SketchPicker } from "react-color";

export const ColorPicker = withField(SketchPicker, {
  valueKey: "color",
  onKeyChangeFnName: "onChangeComplete",
  valuePath: "hex"
});
