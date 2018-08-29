import "@babel/polyfill";
import shim from "fabric-shim";

// Helpers
import * as ErrMsg from "./utils/ErrorMessages";

import PublishDecision from "./Decision/publish";

const Chaincode = class {
  async Invoke(stub) {
    const { fcn, params } = stub.getFunctionAndParameters();

    const method = this[fcn];
    if (!method) {
      throw new Error(ErrMsg.FunctionNotFound(fcn));
    }

    try {
      const payload = await method(stub, params);
      return shim.success(payload);
    } catch (err) {
      return shim.error(err);
    }
  }

  // The Init method is called when the Smart Contract is instantiated by the blockchain network
  // Best practice is to have any Ledger initialization in separate function -- see initLedger()
  async Init() {
    // Bind other functions
    this.publishDecision = PublishDecision;

    return shim.success();
  }
};

shim.start(new Chaincode());
