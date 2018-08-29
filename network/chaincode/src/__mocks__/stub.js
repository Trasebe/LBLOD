const stateObject = require("./stateObject.json");

module.exports = {
  getState: jest.fn(() =>
    Promise.resolve(Buffer.from(JSON.stringify(stateObject.getState)))
  ),
  putState: jest.fn(() => stateObject.putState)
};
