import React from 'react';

import NavMenu from 'components/NavMenu';
import { Layout } from 'antd';
const { Header, Footer, Content, Sider } = Layout;

export default ({ children }) => (
  <Layout style={{ height: '100%' }}>
    <Header></Header>
    <Layout>
      <Sider>
        <NavMenu />
      </Sider>
      <Content>{children}</Content>
    </Layout>
  </Layout>
);
