import axios from 'axios';

let currentConnection = null;
let currentToken = null;

export default function Connection(baseURL, token = "", headers = null) {
  currentToken = token;
  currentConnection = axios.create({
    baseURL: baseURL,
    timeout: 12000,
    headers: {
      'Accept': 'application/json',
      'X-Access-Token': currentToken
    }
  });

  currentConnection.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // Only send the response
    return Promise.reject(error.response);
  });

  return currentConnection;
}

export function getConnection() {
  if(currentConnection) return currentConnection;
  // else throw new Error(ErrorMessages.MissingConnection);
}

export function getToken() {
  if(currentConnection) return currentToken;
  // else throw new Error(ErrorMessages.MissingConnection);
}

export function setAuthToken(token) {
  currentConnection.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
