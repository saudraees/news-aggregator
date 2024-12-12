import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title } = Typography;

const AppLayout = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '100%',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src="newspaper-logo.png"
                            alt="logo"
                            style={{ width: '40px', height: '40px', objectFit: 'contain', marginRight: '8px' }}
                        />
                        <Title
                            level={4}
                            style={{
                                color: '#fff',
                                margin: 0,
                                display: 'inline-block',
                            }}
                        >
                            News Aggregator
                        </Title>
                    </div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ flex: 1, justifyContent: 'end' }}
                    >
                        <Menu.Item key="1" icon={<HomeOutlined />}>
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<SettingOutlined />}>
                            <Link to="/preferences">Preferences</Link>
                        </Menu.Item>
                    </Menu>
                </div>
            </Header>
            <Layout>
                <Layout style={{ padding: "24px" }}>
                    <Content
                        style={{
                            background: "#fff",
                            padding: 24,
                            margin: '40px 0 0 0',
                            minHeight: 280,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout >
    );
};

export default AppLayout;
