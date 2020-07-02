// import { take, call, takeEvery, select, put } from 'redux-saga/effects';
import { listBlog } from 'service/blog';

// const fetchList = function* () {
//   try {
//     yield put({ type: 'loadingStart' });
//     const { page, pageSize } = yield select(({ blog: state }) => {
//       return {
//         page: state.get('page'),
//         pageSize: state.get('pageSize')
//       };
//     });
//     const { pageElements, total } = yield call(listBlog, { page, pageSize });
//     yield put({ type: 'setElements', payload: pageElements });
//     yield put({ type: 'setTotal', payload: total });
//     yield put({ type: 'loadingEnd' });
//   } catch (error) {
//     yield put({ type: 'loadingEnd' });
//   }
// };
// const pageChange = function* ({ payload }) {
//   yield put({ type: 'setPage', payload });
//   yield call(fetchList);
// };
// const pageSizeChange = function* ({ payload }) {
//   yield put({ type: 'setPageSize', payload });
//   yield put({ type: 'setPage', payload: 1 });
//   yield call(fetchList);
// };
// export default function* () {
//   yield takeEvery('fetchList', fetchList);
//   yield takeEvery('pageChange', pageChange);
//   yield takeEvery('pageSizeChange', pageSizeChange);
// }
import { createTableSaga } from 'utils/table-saga';

export default createTableSaga({
  actionNamePrefix: 'blog',
  tableDataPath: ['blog', 'tableData'],
  fetchMethod: listBlog
});
