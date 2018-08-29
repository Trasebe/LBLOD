import Decision from "../models/decision.model";
import { exists } from "../utils";
import * as ErrMsg from "../utils/ErrorMessages";

async function Create(stub, obj) {
  // decreases size of args as it strips the key out of it
  const decesion = new Decision(obj);

  // Check if key already exists
  const keyExists = await exists(stub, decesion.decesionId);
  if (keyExists) {
    throw new Error(ErrMsg.AlreadyExists(decesion.decesionId));
  }

  // Update ledger with the new object and it's key
  return stub.putState(decesion.decesionId, decesion.toState());
}

module.exports = Create;
