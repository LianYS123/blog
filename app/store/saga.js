import blogSaga from 'pages/blog/sagas';
const sagas = [blogSaga];

export default sagas.map(saga => saga());

