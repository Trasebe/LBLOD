import Connection, { setAuthToken } from "../__helpers__/Connection";

export default class ChainService {
  constructor(baseUrl = "http://localhost:3000") {
    this.connection = new Connection(baseUrl);
  }

  setAuthToken = token => {
    setAuthToken(token);
  };

  /*
  ========================
    User management
  ========================
  */
  register = user =>
    new Promise((resolve, reject) => {
      this.connection
        .post("/auth/register", user)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });

  login = user =>
    new Promise((resolve, reject) => {
      this.connection
        .post("/auth/login", user)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
