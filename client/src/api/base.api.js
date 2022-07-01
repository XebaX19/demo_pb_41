import axios from 'axios';
import config from './config';

export default class API {
    static async getHeaders() {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        return headers;
    }

    static async makeRequest(endpoint, method = 'GET', body = null) {
        const url = config.BASE_URL + endpoint;
        const headers = API.getHeaders();
        const response = await axios(url, {
            method,
            data: body || undefined,
            headers
        });

        return response;
    }

    static async get(endpoint) {
        return await API.makeRequest(endpoint);
    }

    static async post(endpoint, body = null) {
        return await API.makeRequest(endpoint, 'POST', body);
    }

    static async put(endpoint, body = null) {
        return await API.makeRequest(endpoint, 'PUT', body);
    }

    static async del(endpoint) {
        return await API.makeRequest(endpoint, 'DELETE');
    }
}