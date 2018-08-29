import * as ErrMsg from "./ErrorMessages";

export const exists = async (stub, key) => {
  const objectAsBytes = await stub.getState(key); // get the object from chaincode state
  return !(!objectAsBytes || objectAsBytes.toString().length <= 0);
};

export const toJSON = myObj => {
  try {
    return JSON.parse(myObj);
  } catch (e) {
    throw new Error(ErrMsg.FailedToParse(e));
  }
};
