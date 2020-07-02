import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

export default () => (
  <Result
    status='404'
    title='not found'
    extra={
      <Button type='primary'>
        <Link to='/'>返回首页</Link>
      </Button>
    }
  ></Result>
);
