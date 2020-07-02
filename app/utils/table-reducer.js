import {
  fromJS
} from 'immutable';

/**
 * [create create table reducer]
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
export function createTableStore() {
  return {
    loading: false,
    list: [],
    pagination: {
      page: 1,
      pageSize: 10
    },
    query: {},
    sorter: {},
    expand: false,
    selectedRowKeys: [],
    selectedRows: []
  };
}

/**
 * [create description]
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
export function createTableReducer(actionNamePrefix, keyPath) {
  return {
    [actionNamePrefix + "/load"]: (state, action) => {
      return state.setIn([ keyPath, 'loading' ], true);
    },
    [`${actionNamePrefix}/reset`]: (state, action) => {
      return state.update(keyPath, tableState => {
        return fromJS(createTableStore());
      });
    },
    [`${actionNamePrefix}/toggle/expand`]: (state, action) => {
      return state.update(keyPath, tableState => {
        return tableState.set("expand", !tableState.get("expand"));
      });
    },
    [`${actionNamePrefix}/load/success`]: (state, action) => {
      let payload = action.payload;
      return state.update(keyPath, tableState => {
        return tableState.set("list", fromJS(payload.content))
          .update("pagination", pagi => {
            const plainP = pagi.toJS();
            let pagiRemote = { ...payload.pagination
            };
            delete pagiRemote.content;
            return fromJS({
              ...plainP,
              ...pagiRemote
            });
          })
          .set("loading", false);
      });
    },
    [`${actionNamePrefix}/set/selectedRows`]: (state, action) => {
      return state.update(keyPath, tableState => {
        return tableState
          .set("selectedRows", fromJS(action.payload.selectedRows))
	                .set("selectedRowKeys", fromJS(action.payload.selectedRowKeys));
      });
    },
    [`${actionNamePrefix}/set-page-size`]: (state, action) => {
      return state.update(keyPath, tableState => {
        return tableState.setIn([ 'pagination', 'pageSize' ], action.payload.pageSize)
          .setIn([ 'pagination', 'page' ], 1);
      });
    },
    [`${actionNamePrefix}/set-page`]: (state, action) => {
      return state.setIn([ keyPath, 'pagination', 'page' ], action.payload.page);
    },
    [`${actionNamePrefix}/set-total`]: (state, action) => {
      return state.setIn([ keyPath, 'pagination', 'total' ], action.payload.total);
    },
    [`${actionNamePrefix}/set-query`]: (state, action) => {
      return state.setIn([ keyPath, 'query' ], fromJS(action.payload));
    },
    [`${actionNamePrefix}/set-sorter`]: (state, action) => {
      return state.setIn([ keyPath, 'sorter' ], fromJS(action.payload));
    }
  };
}
