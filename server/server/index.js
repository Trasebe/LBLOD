import mongoose from "mongoose";
import util from "util";
import bluebird from "bluebird";

import https from "https";
import fs from "fs";

// config should be imported before importing any other file
import config from "../config/config";

// Other imports
import app from "../config/express";
import network from "./services/network.service";
import Logger from "../config/Log";

const debug = require("debug")("express-mongoose-es6-rest-api:index");

// make bluebird default Promise
Promise = bluebird; // eslint-disable-line no-global-assign

if (config.useDb) {
  // plugin bluebird promise in mongoose
  mongoose.Promise = Promise;

  // connect to mongo db
  const mongoUri = config.mongo.host;
  mongoose.connect(
    mongoUri,
    {
      socketOptions: { keepAlive: 1 },
      useNewUrlParser: true,
      poolSize: 2,
      promiseLibrary: global.Promise
    }
  );
  mongoose.connection.on("error", () => {
    throw new Error(`unable to connect to database: ${mongoUri}`);
  });

  // print mongoose logs in dev env
  if (config.mongooseDebug) {
    mongoose.set("debug", (collectionName, method, query, doc) => {
      debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });
  }
}

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // TODO - remove user registration. This should be handled in frontend (register/login)
  network
    .initFabric()
    .then(res => {
      Logger().info(`${res.toString()}\n\n`);

      if (config.env === "PRODUCTION") {
        const serverOptions = {
          key: fs.readFileSync(
            "/etc/letsencrypt/live/<domain-name>/privkey.pem",
            "utf8"
          ),
          cert: fs.readFileSync(
            "/etc/letsencrypt/live/<domain-name>/cert.pem",
            "utf8"
          ),
          ca: [
            fs.readFileSync(
              "/etc/letsencrypt/live/<domain-name>/chain.pem",
              "utf8"
            )
          ]
        };

        https.createServer(serverOptions, app).listen(8080, () => {
          Logger().info(
            `server started on port ${config.port} (${config.env})`
          );
        });
      } else {
        app.listen(config.port, () => {
          Logger().info(
            `server started on port ${config.port} (${config.env})`
          );
        });
      }
    })
    .catch(err => Logger().info(`${err.message}\n\n`));
}

export default app;
