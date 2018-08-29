import * as ErrMsg from "../utils/ErrorMessages";

const argsExpected = 1;

async function queryById(stub, args) {
  if (args.length !== argsExpected) {
    ErrMsg.InvalidNumberOfArgs(argsExpected);
  }

  const key = args.shift();

  return stub.getState(key);
}

export default queryById;
