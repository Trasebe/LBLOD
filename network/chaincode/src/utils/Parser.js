import * as ErrMsg from "./ErrorMessages";

export const toState = myObj => {
  try {
    return Buffer.from(JSON.stringify(myObj));
  } catch (e) {
    throw new Error(ErrMsg.FailedToParse(e));
  }
};

export const fromState = myObjAsBytes => {
  try {
    return JSON.parse(myObjAsBytes.toString());
  } catch (e) {
    throw new Error(ErrMsg.FailedToParse(myObjAsBytes));
  }
};

export const toJSON = myObj => {
  try {
    return JSON.parse(myObj);
  } catch (e) {
    throw new Error(ErrMsg.FailedToParse(e));
  }
};
