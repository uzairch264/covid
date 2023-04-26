import React from 'react';
import './index.css';
import { Layout, Menu, theme } from 'antd';
import { Link } from "react-router-dom";
import CTable from './Table';
import Global from './Global';

const { Header, Content, Footer, Sider } = Layout;

const AppRoute=({children,selectedKey}) =>{
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  console.log(children,"this is console");
  return (
<Layout className="site-layout" >
      <Sider >
        <div className="logo" />
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
       <Menu.Item key="worldwide">
        <Link to="/">World Wide</Link>
       </Menu.Item>
      <Menu.Item key="countries">
        <Link to="/countries">Countries Data</Link>
     </Menu.Item>
    </Menu>   
      </Sider>
      <Layout>
        <Header style={{ padding: "20px", background: "rgba(38, 99, 118, 0.4)",textAlign: "center",
            fontSize: "50px",
            color: "White",
            height: "100px",fontFamily:"Copperplate", }} >CORONA STATS</Header>
        <Content style={{ margin: '24px 16px 0',alignItems:"center" }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>{children}</div>
          
        </Content>
        <Footer style={{ textAlign: 'center' }}>Designed by Uzair ur rehman ©2023</Footer>
      </Layout>
    </Layout>
  );
} ;
export default AppRoute;