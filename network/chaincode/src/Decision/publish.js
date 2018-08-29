import Decision from "../models/decision.model";
import { exists } from "../Services/QueryService";
import * as ErrMsg from "../utils/ErrorMessages";

async function Create(stub, obj) {
  const decision = new Decision(obj);
  const key = decision.getId();

  const keyExists = await exists(stub, key);
  if (keyExists) {
    throw new Error(ErrMsg.AlreadyExists(key));
  }

  return stub.putState(key, decision.getAsBytes());
}

export default Create;
