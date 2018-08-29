import React, { Component } from "react";
import { Layout, Select } from "antd";
import PropTypes from "prop-types";

import "./CustomSider.css";
import MenuRoutes from "./MenuRoutes";

const { Sider } = Layout;
const { Option } = Select;

class CustomSider extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    const { handleChangeUser } = this.props;

    return (
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <Select
          defaultValue="vlaio"
          style={{ width: "100%" }}
          onSelect={handleChangeUser}
        >
          <Option value="vlaio">VLAIO</Option>
          <Option value="syntra_vlaanderen">Syntra Vlaanderen</Option>
          <Option value="OndernemerX">OndernemerX</Option>
        </Select>
        <MenuRoutes />
      </Sider>
    );
  }
}

CustomSider.propTypes = {
  handleChangeUser: PropTypes.func.isRequired
};

export default CustomSider;
