import Joi from "joi";

export default {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
      enrollmentSecret: Joi.string().required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
      enrollmentSecret: Joi.string().required()
    },
    params: {
      userId: Joi.string()
        .hex()
        .required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  // POST /api/auth/register
  register: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
      affiliation: Joi.string().required(),
      identification: Joi.string().required()
    }
  }
};