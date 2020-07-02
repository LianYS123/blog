import { fromJS } from 'immutable';
// import { handleActions } from 'redux-actions';
// const initialState = fromJS({
//   page: 1,
//   pageSize: 10,
//   total: 0,
//   elements: [],
//   loading: false
// });

// export default handleActions({
//   setElements: (state, action) => state.set('elements', action.payload),
//   setTotal: (state, action) => state.set('total', action.payload),
//   setPage: (state, action) => state.set('page', action.payload),
//   setPageSize: (state, action) => state.set('pageSize', action.payload),
//   loadingStart: (state, action) => state.set('loading', true),
//   loadingEnd: (state, action) => state.set('loading', false)
// }, initialState);

import { handleActions } from 'redux-actions';
import { createTableReducer, createTableStore } from 'utils/table-reducer';

export default handleActions(
  createTableReducer('blog', 'tableData'),
  fromJS({ tableData: createTableStore() })  //把初始化的数据筛到tableData里面去
);
