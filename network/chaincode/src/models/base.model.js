import * as ErrMsg from "../utils/ErrorMessages";
import { DocTypes } from "../utils/Enums";
import { toJSON } from "../utils";

export default class BaseModel {
  constructor(decision) {
    const decisionParsed = toJSON(decision[0]);

    this.decision = {
      ...decisionParsed,
      docType: DocTypes.DECISION
    };
  }

  get = () => this.decision;

  getId = () => this.decision.decisionId;

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
