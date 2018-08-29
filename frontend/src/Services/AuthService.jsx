import Connection from "../__helpers__/Connection";

export default class AuthService {
  constructor(baseUrl = "http://localhost:3000") {
    this.connection = new Connection(baseUrl);
  }
}
