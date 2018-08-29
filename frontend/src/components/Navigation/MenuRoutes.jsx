/* eslint-disable */
import React from "react";

import { Icon, Menu } from "antd";
import { Link } from "react-router-dom";

const { Item, SubMenu } = Menu;

const MenuRoutes = () => (
  <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
    {/* ==================
        Query
    ================== */}
    <Item key="xxx">
      <Icon type="question-circle-o" />
      <span>xxx</span>
      <Link to="/xxx" />
    </Item>

    {/* ==================
        Settings: profile, logout
    ================== */}
    <SubMenu
      key="nav-sub-settings"
      title={
        <span>
          <Icon type="code" />
          <span>Invocations</span>
        </span>
      }
    >
      <Item key="nav-sub-invoke-create">
        <span>xxx</span>
        <Link to="/xxx" />
      </Item>
    </SubMenu>

    {/* ==================
        Rest...
    ================== */}
  </Menu>
);

export default MenuRoutes;
