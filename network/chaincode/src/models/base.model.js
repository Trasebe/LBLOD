import { DocTypes } from "../utils/Enums";
import { toJSON, toState } from "../utils/Parser";

export default class BaseModel {
  constructor(decision) {
    const decisionParsed = toJSON(decision[0]);

    this.decision = {
      ...decisionParsed,
      docType: DocTypes.DECISION
    };
  }

  get = () => this.decision;

  getAsBytes = () => toState(this.decision);

  getId = () => this.decision.decisionId;
}
