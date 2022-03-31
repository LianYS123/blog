import { COLLECTION_TYPES } from "constants/index";
import { useFormik } from "formik";
import { useCustomMutation, useRequest } from "hooks";
import { isEmpty, pick, pickBy } from "lodash";
import { useEffect } from "react";
import { ADD_COLLECTION, EDIT_COLLECTION } from "services/collection";
import {
  ADD_ARTICLE_TO_COLLECTION,
  COLLECTION_ARTICLE_LIST,
  REMOVE_ARTICLE_FROM_COLLECTION
} from "services/collection-article";
import {
  ADD_RESOURCE_TO_COLLECTION,
  COLLECTION_RESOURCE_LIST,
  REMOVE_RESOURCE_FROM_COLLECTION
} from "services/collection-resource";
import * as yup from "yup";

/**
 * 添加和编辑收藏夹表单
 */
export const useCollectionFormik = ({
  isEdit,
  close,
  reload,
  record,
  type,
  extra = {}
}) => {
  const service = isEdit ? EDIT_COLLECTION : ADD_COLLECTION;
  const [submit, { loading }] = useCustomMutation(service);

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
      await submit({
        ...values,
        ...extra,
        id: record?.id,
        collectionType: isEdit ? undefined : type // 编辑时不修改收藏夹类型
      });
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

/**
 * 指定类型的收藏夹列表,以及从收藏夹添加、删除条目的统一封装
 */
export const useCollections = ({ itemId, type }) => {
  const serviceMap = {
    [COLLECTION_TYPES.ARTICLE]: {
      list: COLLECTION_ARTICLE_LIST,
      add: ADD_ARTICLE_TO_COLLECTION,
      remove: REMOVE_ARTICLE_FROM_COLLECTION
    },
    [COLLECTION_TYPES.RESOURCE]: {
      list: COLLECTION_RESOURCE_LIST,
      add: ADD_RESOURCE_TO_COLLECTION,
      remove: REMOVE_RESOURCE_FROM_COLLECTION
    }
  };

  const fieldsKeyMap = {
    [COLLECTION_TYPES.ARTICLE]: "articleId",
    [COLLECTION_TYPES.RESOURCE]: "resourceId",
    [COLLECTION_TYPES.BOOK]: "bookId"
  };

  const services = serviceMap[type];
  const field = fieldsKeyMap[type];

  // 当前用户的所有收藏夹
  const {
    data: collections,
    loading,
    refetch
  } = useRequest({
    service: services.list,
    params: { [field]: itemId }
  });

  // 添加到收藏夹
  const [add, { loading: loadingAdd }] = useCustomMutation(services.add);

  const addItem = (itemId, collectionId) => {
    return add({ [field]: itemId, collectionId });
  };

  // 从收藏夹中移除
  const [remove, { loading: loadingRemove }] = useCustomMutation(
    services.remove
  );

  const removeItem = (itemId, collectionId) => {
    return remove({ [field]: itemId, collectionId });
  };

  return {
    collections,
    loading,
    refetch,
    addItem,
    removeItem,
    loadingAdd,
    loadingRemove
  };
};
