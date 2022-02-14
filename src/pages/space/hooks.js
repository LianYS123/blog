import { GET_LOGIN_USER } from "services/auth";
import { useDispatch } from "react-redux";
import { appSlice } from "models/app";
import { useMutation } from "hooks";
import dayjs from "dayjs";
import { CHANGE_USER_INFO } from "services/user";
import { cloneDeep, pick } from "lodash";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useFormik } from "formik";

export const useReloadUserInfo = () => {
  const [getUserInfo] = useMutation(GET_LOGIN_USER);
  const dispatch = useDispatch();

  const reloadUserInfo = async () => {
    const { success, data } = await getUserInfo();
    if (success) {
      dispatch(appSlice.actions.setUserInfo(data));
    }
  };
  return reloadUserInfo;
};

export const useUserFormik = (extra = {}) => {
  const { userInfo } = useSelector(state => state.app);
  const [changeUserInfo, { loading }] = useMutation(
    CHANGE_USER_INFO,
    {},
    { showActionMessage: true, autoHandleError: true }
  );
  const validationSchema = yup.object({
    nickName: yup.string("请输入昵称").required("请输入昵称"),
    email: yup.string("请输入邮箱").email(),
    sex: yup.number().required("请选择性别"),
    phone: yup
      .string()
      .matches(/1\d{10}/, "手机号格式不正确")
      .required("请输入手机号"),
    birthday: yup.date()
  });
  const reloadUserInfo = useReloadUserInfo();

  const formik = useFormik({
    initialValues: {
      birthday: userInfo["birthday"],
      email: userInfo["email"],
      nickName: userInfo["nickName"],
      phone: userInfo["phone"],
      sex: userInfo["sex"],
      tel: userInfo["tel"]
    },
    validationSchema,
    onSubmit: async _values => {
      const values = cloneDeep(_values);
      const { birthday } = extra;
      if (birthday) {
        values.birthday = dayjs(birthday).format("YYYY-MM-DD");
      }
      values.id = userInfo.id;
      const { success } = await changeUserInfo(values);
      if (success) {
        reloadUserInfo();
      }
    }
  });
  return formik;
};
