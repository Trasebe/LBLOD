import IteratorExecutor from "../utils/iterator";
import DocTypes from "../utils/DocTypes";

const format = "utf8";
const keyPrefix = `${DocTypes.DECISION}-`;

async function queryAll(stub) {
  const startKey = `${keyPrefix}0`;
  const endKey = `${keyPrefix}999999999`;

  const iterator = await stub.getStateByRange(startKey, endKey);

  return IteratorExecutor(iterator);
}

export default queryAll;
