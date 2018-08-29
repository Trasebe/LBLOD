import "babel-polyfill";

// Initialize Ledger Function (Optional)
import initLedger from "./utils/Initialize";

// Modules
// import shim from "fabric-shim";
const shim = require("fabric-shim");
// const initLedger = require("./utils/Initialize");

// CRUD Actions X
const WatchMovementCreate = require("./Watchmovement/Create");
const WatchMovementQueryAll = require("./Watchmovement/QueryAll");

// Helpers
const ErrorMessages = require("./utils/ErrorMessages");

const Chaincode = class {
  async Invoke(stub) {
    const { fcn, params } = stub.getFunctionAndParameters();

    const method = this[fcn];
    if (!method) {
      throw new Error(ErrorMessages.FunctionNotFound(fcn));
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
  async Init(stub) {
    // Initialize Ledger
    this.initLedger = initLedger;

    // Bind other functions
    this.watchmovement_create = WatchMovementCreate;
    this.watchmovement_query_all = WatchMovementQueryAll;

    return shim.success();
  }
};

shim.start(new Chaincode());
