import * as yup from "yup";
import BaseModel from "./base.model";

export default class Decision extends BaseModel {
  constructor(decision) {
    super(decision);

    this.validate(this.decision);
  }

  validate = async decision => {
    const schema = yup.object().shape({
      docType: yup.string().matches(/(decision)/),
      decisionId: yup.string().required(),
      decisionHash: yup.string().required(),
      decisionTimeStamp: yup.date().required(),
      decisionStatus: yup.string().required(),
      authSignatures: yup.array().ensure(),
      burnSignatures: yup.array().ensure()
    });

    await schema.validate(decision).catch(err => {
      throw new Error(err.errors);
    });
  };
}
