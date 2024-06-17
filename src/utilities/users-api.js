import sendRequest from "./send-request";
const BASE_URL = '/api/users';

export async function signUp(userData) {
  // BASE_URL = url / 'POST' = method / userData = payload | based on sendRequest parameters
  return sendRequest(BASE_URL, 'POST', userData);
}

export async function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

// goes to sendRequest to fetch
export async function checkToken() {
  // snake-casing preferred for urls
  return sendRequest(`${BASE_URL}/check-token`);
  // this is a 'GET' request which we set up as the default, and 'GET' requests do not have a payload
}