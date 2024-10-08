import sendRequest from "./send-request";
const BASE_URL = '/api/cards';

export async function getCardByName(name) {
    return sendRequest(`${BASE_URL}/search/${name}`);
}