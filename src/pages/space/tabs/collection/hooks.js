import { useFormik } from "formik";
import { useMutation } from "hooks";
import { isEmpty, pick, pickBy } from "lodash";
import { useEffect } from "react";
import { ADD_COLLECTION, EDIT_COLLECTION } from "services/collection";
import * as yup from "yup";

export const useCollectionFormik = ({
  isEdit,
  close,
  reload,
  record,
  extra = {}
}) => {
  const service = isEdit ? EDIT_COLLECTION : ADD_COLLECTION;
  const [submit, { loading }] = useMutation(service, null, {
    autoHandleError: true
  });

  const validationSchema = yup.object({
    collectionName: yup.string("请输入收藏夹名称").required("请输入收藏夹名称"),
    collectionDesc: yup.string("请输入描述")
  });

  const formik = useFormik({
    initialValues: {
      collectionName: record?.collectionName || "",
      collectionDesc: record?.collectionDesc || ""
    },
    validationSchema,
    onSubmit: async values => {
      await submit({ ...values, ...extra, id: record?.id });
      close();
      reload();
    }
  });
  useEffect(() => {
    if (record && isEdit) {
      const values = pick(record, ["collectionName", "collectionDesc"]);
      formik.setValues(pickBy(values, it => !isEmpty(it)));
    }
  }, [record]);
  return { formik, loading };
};
