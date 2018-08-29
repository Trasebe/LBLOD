import { Router } from "express";

/** GET /health-check - Check service health */
// router.get("/health-check", (req, res) => res.send("OK"));

/**
 * Mounts all routes defined in *.route.js files in server/
 * @example
 *   chain.route.js routes will be mounted to /chain
 */
// (() => {
//   // Route definitions
//   const files = glob.sync("./server/endpoints/**/*.route.js");
//
//   // Mount routes for each file
//   files.forEach(routeFilename => {
//     // import "./server"
//     // const parsedRouteFilename = routeFilename.replace('./server/','');
//     const routes = require(`.${routeFilename}`).default; // eslint-disable-line global-require
//
//     // Create the url using the first part of the filename
//     // e.g. auth.route.js will generate /auth
//     const routeName = path.basename(routeFilename, ".route.js");
//     const url = `/${routeName}`;
//
//     // Mount the routes
//     console.info(`${path.basename(routeFilename)} -> ${url}`); // eslint-disable-line no-console
//     router.use(url, routes);
//   });
// })();
// export default router;

import chainRoutes from "./endpoints/chain/chain.route";
import authRoutes from "./endpoints/auth/auth.route";

export default Router()
  .get("/health-check", (req, res) =>
    res.send("OK")
  ) /** GET /health-check - Check service health */

  .use("/chain", chainRoutes) // mount chaincode routes at /chain
  .use("/auth", authRoutes); // mount auth routes at /auth
