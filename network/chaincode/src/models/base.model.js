import * as ErrMsg from "../utils/ErrorMessages";

export default class Decision {
  toState = myObj => {
    try {
      return Buffer.from(JSON.stringify(myObj));
    } catch (e) {
      throw new Error(ErrMsg.FailedToParse(e));
    }
  };

  fromState = myObjAsBytes => {
    try {
      return JSON.parse(myObjAsBytes.toString());
    } catch (e) {
      throw new Error(ErrMsg.FailedToParse(myObjAsBytes));
    }
  };
}
