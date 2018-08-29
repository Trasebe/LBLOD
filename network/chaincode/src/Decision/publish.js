import Decision from "../models/decision.model";
import { exists } from "../utils";
import * as ErrMsg from "../utils/ErrorMessages";

async function Create(stub, obj) {
  const decision = new Decision(obj);
  const key = decision.getId();

  console.log("key", key);
  console.log("decision", decision);
  console.log("key", decision.toState());

  const keyExists = await exists(stub, key);
  if (keyExists) {
    throw new Error(ErrMsg.AlreadyExists(key));
  }

  return stub.putState(key, decision.toState());
}

export default Create;
