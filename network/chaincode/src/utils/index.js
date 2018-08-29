module.exports = {
  exists: async (stub, key) => {
    const objectAsBytes = await stub.getState(key); // get the object from chaincode state
    return !(!objectAsBytes || objectAsBytes.toString().length <= 0);
  }
};
