import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import httpStatus from "http-status";

import User from "./auth.model";
import APIError from "../../utils/APIError";
import config from "../../../config/config";
import network from "../../services/network.service";

/**
 * Load user and append to req.
 */
const load = (req, res, next, id) => {
  User.get(id)
    .then(user => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
};

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const login = async (req, res, next) => {
  const { username, password } = req.body;

  const foundUser = await User.getByName(username).catch(e => next(e));

  const passwordMatches = await bcrypt
    .compare(password, foundUser.password)
    .catch(e => next(e));

  if (!passwordMatches) {
    const err = new APIError("Wrong password", httpStatus.UNAUTHORIZED, true);
    return next(err);
  }

  await network
    .login({
      username
    })
    .catch(e => next(e));

  const token = jwt.sign({ ...foundUser._doc }, config.jwtSecret);

  return res.json({
    token
  });
};

/**
 * Register new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.password - The password of user.
 * @property {string} req.body.role - The role of user.
 * @returns {User}
 */
const register = async (req, res, next) => {
  const { username, password, role, affiliation, identification } = req.body;

  const encryptedPass = await bcrypt
    .hash(password, config.saltRounds)
    .catch(e => next(new APIError(e.message, httpStatus.UNAUTHORIZED, true)));

  const user = new User({
    username,
    password: encryptedPass,
    role,
    affiliation,
    identification
  });

  await network
    .register({
      username,
      role,
      identification,
      affiliation
    })
    .then(() => user.save())
    .then(savedUser =>
      res.json({
        username: savedUser.username,
        role: savedUser.role,
        identification: savedUser.identification
      })
    )
    .catch(e => next(new APIError(e.message, httpStatus.BAD_REQUEST, true)));
};

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
const update = (req, res, next) => {
  const { user } = req;
  user.username = req.body.username;
  user.password = req.body.password;
  user.enrollmentSecret = req.body.enrollmentSecret;

  user
    .save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
};

export default { login, register, update, load };
