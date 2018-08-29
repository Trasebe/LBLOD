const format = "utf8";

async function queryById(stub, arg) {
  return stub.getState(arg);
}

module.exports = queryById;
