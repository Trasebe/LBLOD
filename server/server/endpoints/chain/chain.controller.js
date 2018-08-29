import httpStatus from "http-status";

import ChaincodeService from "../../services/chain.service";
import APIError from "../../utils/APIError";

const chaincodeService = new ChaincodeService();

// TODO don't hardcode users + functions

/**
 * Initializes the ledger
 * @property {string} req.body.user - The name of the user.
 * @property {array} req.body- An array of string arguments.
 * @returns {json}
 */
const query = async (req, res, next) => {
  const { username } = req.user;
  const { funcName } = req.params;
  const funcArgs = req.body ? { ...req.body } : {};

  if (!funcName) {
    return next(
      new APIError("Arguments missing", httpStatus.BAD_REQUEST, true)
    );
  }

  const parsedFuncArgs = funcArgs.selector
    ? [JSON.stringify(funcArgs)]
    : Object.values(funcArgs);

  try {
    const request = await chaincodeService.prepareRequest(
      username,
      funcName,
      parsedFuncArgs,
      false
    );

    const initResult = await chaincodeService.query(request);
    return res.json(initResult);
  } catch (e) {
    console.log("====== ERROR INVOKE ======"); // eslint-disable-line
    console.log(e); // eslint-disable-line
    console.log("====== END ERROR INVOKE ======"); // eslint-disable-line
    res.status(500).json(e.message);
    // const err = new APIError(e.message, httpStatus.BAD_REQUEST, true);
    // return next(err);
  }
};

const invoke = async (req, res) => {
  const { username } = req.user;
  const { funcName } = req.params;
  const funcArgs = req.body ? { ...req.body } : {};

  try {
    const request = await chaincodeService.prepareRequest(
      username,
      funcName,
      Object.values({
        ...funcArgs
      })
    );

    const initResult = await chaincodeService.invoke(request);
    res.json(initResult);
  } catch (e) {
    console.log("====== ERROR INVOKE ======"); // eslint-disable-line
    console.log(e); // eslint-disable-line
    console.log("====== END ERROR INVOKE ======"); // eslint-disable-line
    res.status(500).json(e.message);
  }
};

export default {
  query,
  invoke
};
