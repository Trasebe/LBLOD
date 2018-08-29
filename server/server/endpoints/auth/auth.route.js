import express from "express";
import validate from "express-validation";
import expressJwt from "express-jwt";

import paramValidation from "../../../config/param-validation";
import authCtrl from "./auth.controller";
import config from "../../../config/config";

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route("/login").post(validate(paramValidation.login), authCtrl.login);

/** POST /api/auth/register - Registers the user to the HLF Network */
router
  .route("/register")
  .post(validate(paramValidation.register), authCtrl.register);

router
  .route("/update/:id")
  .get(expressJwt({ secret: config.jwtSecret }), authCtrl.update);

/** Load user when API with userId route parameter is hit */
router.param("userId", authCtrl.load);

export default router;
