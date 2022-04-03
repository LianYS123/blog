import { useFormik } from "formik";
import { useCustomMutation } from "hooks";
import { isEmpty, noop, pick, pickBy } from "lodash";
import { useEffect } from "react";
import { ADD_HOME_SECTION, EDIT_HOME_SECTION } from "services/homeSection";

/**
 * 添加和编辑收藏夹表单
 */
export const useSectionItemFormik = ({
  isEdit,
  close,
  reload = noop,
  record,
  sectionType,
  extra = {}
}) => {
  const service = isEdit ? EDIT_HOME_SECTION : ADD_HOME_SECTION;
  const [submit, { loading }] = useCustomMutation(service, {
    successMessage: "操作成功"
  });

  const formik = useFormik({
    initialValues: {
      itemName: "",
      itemDesc: "",
      itemImage: ""
    },
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

  const convertRecordToFields = record => {
    const fields = { itemId: record.id, sectionType };
    const setFields = (itemName, itemDesc, itemImage, itemLink) => {
      Object.assign(fields, { itemName, itemDesc, itemImage, itemLink });
    };
    if (sectionType === 0) {
      // 文章
      const { articleName, summary, cover } = record;
      setFields(articleName, summary, cover);
    } else if (sectionType === 1) {
      // 资源
      const { resourceName, desc, icon, link } = record;
      setFields(resourceName, desc, icon, link);
    } else if (sectionType === 2) {
      // 图书
    } else if (sectionType === 3 || sectionType === 4 || sectionType === 5) {
      // 收藏夹
      const { collectionName, collectionDesc, cover } = record;
      setFields(collectionName, collectionDesc, cover);
    }
    return fields;
  };

  useEffect(() => {
    if (record) {
      if (!isEdit) {
        formik.setValues(convertRecordToFields(record));
      } else {
        formik.setValues(
          pick(record, [
            "id",
            "itemId",
            "itemName",
            "itemDesc",
            "itemImage",
            "itemLink"
          ])
        );
      }
    }
  }, [record, isEdit]);
  return { formik, loading };
};
