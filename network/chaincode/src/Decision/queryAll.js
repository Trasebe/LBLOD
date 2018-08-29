import IteratorExecutor from "../utils/iterator";
import { DocTypes } from "../utils/Enums";

async function queryAll(stub) {
  const startKey = `${DocTypes.DECISION}-0`;
  const endKey = `${DocTypes.DECISION}-999999999`;

  const iterator = await stub.getStateByRange(startKey, endKey);

  return IteratorExecutor(iterator);
}

export default queryAll;
