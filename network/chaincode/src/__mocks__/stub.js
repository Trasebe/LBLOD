export default {
  getState: jest.fn(() => Promise.resolve(Buffer.from(JSON.stringify({})))),
  putState: jest.fn(() => {})
};
