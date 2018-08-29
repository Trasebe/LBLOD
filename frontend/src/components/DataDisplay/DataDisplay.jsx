import React from "react";
import PropTypes from "prop-types";

const DataDisplay = ({ asset }) => (
  <div style={{ fontSize: "14px", textAlign: "left", margin: "auto" }}>
    <pre>{asset && JSON.stringify(asset, null, 2)}</pre>
  </div>
);

DataDisplay.propTypes = {
  asset: PropTypes.any // eslint-disable-line
};

DataDisplay.defaultProps = {
  asset: null
};

export default DataDisplay;
