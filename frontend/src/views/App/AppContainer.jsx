import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { v4 } from "uuid";

import { Breadcrumb, Layout, notification } from "antd";

import "./AppContainer.css";

import CustomSider from "../../components/Navigation/CustomSider";

import Routing from "../../components/Routing/Routing";
import ChainService from "../../Services/ChainService";

const { Content, Footer } = Layout;
const { Item } = Breadcrumb;

const MyContent = ({ appState }) => (
  <Content style={{ margin: "0 16px" }}>
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Item>My</Item>
      <Item>Breadcrumb</Item>
      <Item>Path</Item>
    </Breadcrumb>
    <div style={{ minHeight: "90vh", padding: 24, background: "#fff" }}>
      <Routing appState={appState} />
    </div>
  </Content>
);

MyContent.propTypes = {
  appState: PropTypes.object.isRequired
};

const MyFooter = () => (
  <Footer style={{ textAlign: "center", padding: 0, paddingBottom: 5 }}>
    <b>Alle getoonde data is fictief</b> - Bewire ©2018 Created by Trase
  </Footer>
);

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUser: "vlaioUser", // eslint-disable-line
      vlaioUser: {
        username: `vlaio-${v4()}`,
        password: `${v4()}`,
        role: "agentschap",
        identification: "vlaio",
        affiliation: "org1.department1",
        id: "vlaioUser"
      },
      syntraVlaanderenUser: {
        username: `syntra_vlaanderen-${v4()}`,
        password: `${v4()}`,
        role: "agentschap",
        identification: "syntra_vlaanderen",
        affiliation: "org1.department1",
        id: "syntraVlaanderenUser"
      },
      ondernemerX: {
        username: `ondernemer_x-${v4()}`,
        password: `${v4()}`,
        role: "ondernemer",
        identification: "0694685789",
        affiliation: "org1.department1",
        id: "ondernemerX"
      }
    };

    this.chainService = new ChainService();
  }

  async componentDidMount() {
    const { vlaioUser, syntraVlaanderenUser, ondernemerX } = this.state;

    await this.chainService
      .register(vlaioUser)
      .catch(() =>
        this.openNotification(
          "Fout",
          "Er liep iets fout tijdens het registreren van VLAIO"
        )
      );

    await this.chainService
      .register(syntraVlaanderenUser)
      .catch(() =>
        this.openNotification(
          "Fout",
          "Er liep iets fout tijdens het registreren van Syntra Vlaanderen"
        )
      );

    await this.chainService
      .register(ondernemerX)
      .catch(() =>
        this.openNotification(
          "Fout",
          "Er liep iets fout tijdens het registreren van ondernemerX"
        )
      );

    // Set default user
    const { token } = await this.chainService.login(vlaioUser);
    this.chainService.setAuthToken(token);
    this.openNotification(
      "Success!",
      "ondernemerX, VLAIO en Syntra Vlaanderen zijn geregistreerd."
    );
  }

  openNotification = (title, message) => {
    const args = {
      message: title,
      description: message,
      duration: 5
    };
    notification.open(args);
  };

  handleChangeUser = async user => {
    const { vlaioUser, syntraVlaanderenUser, ondernemerX } = this.state;

    let userToSignIn = vlaioUser;
    if (user === "vlaio") userToSignIn = vlaioUser;
    if (user === "syntra_vlaanderen") userToSignIn = syntraVlaanderenUser;
    if (user === "OndernemerX") userToSignIn = ondernemerX;

    const { token } = await this.chainService.login(userToSignIn);
    this.chainService.setAuthToken(token);
    this.openNotification(
      "Success!",
      `Aaangemeld als: ${userToSignIn.username}`
    );
    this.setState({ selectedUser: userToSignIn.id }); // eslint-disable-line
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <CustomSider {...this.props} handleChangeUser={this.handleChangeUser} />
        <Layout>
          <div style={{ paddingLeft: "15px", paddingTop: "10px" }}>
            Verworven = 001, Update = 002, Stopgezet = 003
          </div>
          <MyContent appState={this.state} />
          <MyFooter />
        </Layout>
      </Layout>
    );
  }
}

AppContainer.propTypes = {
  appState: PropTypes.object
};

AppContainer.defaultProps = {
  appState: {}
};

export default withRouter(AppContainer);
