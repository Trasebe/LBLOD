import { Router } from "express";
import expressJwt from "express-jwt";

import chainCtrl from "./chain.controller";
import config from "../../../config/config";

const router = Router(); // eslint-disable-line new-cap

/**
 * @function initLedger
 * @function createAcknowledgement
 *           @property {string} req.body.funcArgs[0] - id.
 *           @property {string} req.body.funcArgs[1] - erkenningsType.
 *           @property {string} req.body.funcArgs[2] - ondernemersnummer.
 *           @property {string} req.body.funcArgs[3] - natuurlijkPersoon
 *           @property {string} req.body.funcArgs[4] - beginDatum.
 *           @property {string} req.body.funcArgs[5] - aanvangsDatum.
 *           @property {string} req.body.funcArgs[6] - eindDatum.
 *           @property {string} req.body.funcArgs[7] - erkenningsFase.
 *           @property {string} req.body.funcArgs[8] (Optional) - VestigingsEenheidnummer
 *           @property {string} req.body.funcArgs[9] (Optional) - ErkenningsNummer
 *           @property {string} req.body.funcArgs[10] (Optional) - opLeiding
 *           @property {string} req.body.funcArgs[11] (Optional) - hashErkenning
 * @function updateAcknowledgement
 *           @property {string} req.body.funcArgs[0] - De ID om te updaten
 *           @property {string} req.body.funcArgs[1] - De nieuwe status.
 * @function stopAcknowledgement
 *           @property {string} req.body.funcArgs[0] - Id van de erkenning om te stoppen
 */
router
  .route("/invoke/:funcName")
  /** POST /api/chain/invoke/:funcName - Invoke a function (args optional) */
  .post(expressJwt({ secret: config.jwtSecret }), chainCtrl.invoke);

/**
 * @function queryAllAcknowledgements
 * @function queryAcknowledgement
 *           @property {string} req.body.funcArgs[0] - De Id van de erkenning.
 */
router
  .route("/query/:funcName")
  /** POST /api/chain/query/:funcName - Query the ledger (args optional) */
  .post(expressJwt({ secret: config.jwtSecret }), chainCtrl.query);

// TODO load and dynamic param validation

export default router;
