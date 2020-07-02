import blogReducer from 'pages/blog/reducer';
import { combineReducers } from 'redux-immutable';
export default combineReducers({
  blog: blogReducer
})