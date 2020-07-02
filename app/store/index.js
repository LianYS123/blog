import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import sagas from './saga';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware();
export default createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(function* () {
  yield all(sagas);
});
