import { useFormik } from "formik";
import { useCustomMutation } from "hooks";
import { isEmpty, noop, pick, pickBy } from "lodash";
import { useEffect } from "react";
import { ADD_RESOURCE, EDIT_RESOURCE } from "services/resource";
import * as yup from "yup";

/**
 * 添加和编辑表单
 */
export const useResourceFormik = ({
  isEdit,
  close,
  reload = noop,
  record,
  type,
  extra = {}
}) => {
  const service = isEdit ? EDIT_RESOURCE : ADD_RESOURCE;
  const [submit, { loading }] = useCustomMutation(service);

  const validationSchema = yup.object({});

  const fields = [
    "id",
    "resourceName",
    "icon",
    "link",
    "tags",
    "desc",
    "detail"
  ];

  const formik = useFormik({
    initialValues: {},
    validationSchema,
    onSubmit: async values => {
      await submit({
        ...values,
        ...extra,
        id: record?.id
      });
      close();
      reload();
    }
  });

  useEffect(() => {
    if (record && isEdit) {
      const values = pick(record, fields);
      formik.setValues(pickBy(values, it => !isEmpty(it)));
    }
  }, [record]);

  return { formik, loading };
};
