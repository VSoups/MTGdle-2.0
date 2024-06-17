import { getToken } from "./users-service";

// if no method or payload is provided, the default values will be 'GET' and 'null' respectively
export default async function sendRequest(url, method = 'GET', payload = null) {
    // Fetch accepts an options object as the second argument
    // used to include a data payload, set headers, specify the method, etc...
    const options = { method };
    if (payload) {
        // 'Content-Type' must be quoted because of the hyphen, also doesn't need to be capitalized, but needs to match the exact spelling based on http specifications
        options.headers = { 'Content-Type': 'application/json'  }; 
        options.body = JSON.stringify(payload);
    }
    // get token using users-service module we imported
    const token = getToken();
    if (token) {
        // need to add authorization header
        // use the logical OR assignment operator
        options.headers ||= {};
        // older alternative
        // options.headers = options.headers || {};
        options.headers.Authorization = `Bearer ${token}`;
    }
    
    
    // use the url we received as an argument
    // and add the options we created in this function
    const res = await fetch(url, options);
    // if res.ok is false, then something went wrong
    if (res.ok) return res.json();
    // sendRequest always returns a promise, so if there is a malfunction, we must return an error
    throw new Error('Bad Request'); // only appears if res.ok is false
}

