import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
const App = ({ dispatch, message, loading }) => (
  <div>
    {message}
    <Button
      loading={loading}
      onClick={() => dispatch({ type: 'asyncSetMessage', payload: 'test' })}
    >
      click me
    </Button>
    <Button type='primary' onClick={() => dispatch({ type: 'asyncInit', payload: 'test' })}>init</Button>
  </div>
);
const mapState = (state) => ({
  message: state.get('message'),
  loading: state.get('loading')
});
export default connect(mapState)(App);
