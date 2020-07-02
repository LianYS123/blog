import assert from 'assert';

export const injectSaga = store => (sagas) => {
    assert(Array.isArray(sagas), 'sagas should be an array');
    sagas.forEach(store.runSaga)
}
export const injectReducer = store => (name, reducer) => {
    store.reducer[name] = reducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.reducer));
}