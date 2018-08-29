import React, { Component } from "react";
import PropTypes from "prop-types";
import { notification } from "antd";
import { v4 } from "uuid";

import ChainService from "../Services/ChainService";
import MyForm from "../components/Form/MyForm";
import DataDisplay from "../components/DataDisplay/DataDisplay";

class CreatePage extends Component {
  constructor(props) {
    super(props);

    const {
      appState,
      appState: { selectedUser }
    } = props;

    this.state = {
      acknowledgementFormFields: [ ],
      tx: null,
      error: null
    };

    this.chainService = new ChainService();
  }

  componentWillReceiveProps(nextProps) {}

  openNotification = (title, message) => {
    const args = {
      message: title,
      description: message,
      duration: 5
    };
    notification.open(args);
  };

  createAcknowledgement = async values => {
    const {
      status,
      data: { tx }
    } = await this.chainService
      .createAcknowledgement(values)
      .catch(e => this.setState({ error: e.data }));
    if (status && status === 200) {
      this.setState({ tx });
      this.openNotification("Transaction Successful!", `Transaction ID: ${tx}`);
    }
  };

  render() {
    const { acknowledgementFormFields, tx, error } = this.state;

    return (
      <div>
        <h1>XXX</h1>
        <MyForm
          onRef={ref => (this.child = ref)} // eslint-disable-line
          formFields={acknowledgementFormFields}
          handleSubmit={this.createAcknowledgement}
          btnText="xxx"
        />
        <DataDisplay asset={tx} />
        <DataDisplay asset={error} />
      </div>
    );
  }
}

CreatePage.propTypes = {
  appState: PropTypes.object.isRequired
};

export default CreatePage;
