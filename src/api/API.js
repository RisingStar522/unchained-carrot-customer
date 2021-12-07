const axios = require('axios');

import config from '../config/api.config';
import AuthService from '../services/AuthService';
class BaseAPI {
    constructor(endpoint, parameters = {}) {
        this.endpoint = `${config.uccAPI}` + endpoint;
        this.parameters = parameters;
    }

    submit(requestType, url, data = null) {
        return new Promise(async (resolve, reject) => {
            // If user is offline, try to get response from APIStorage
            if (!window.navigator.onLine) {
                // console.log('No internet connection');
            }
            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + (await AuthService.getAccessToken());

            axios[requestType](url + this.getParameterString(), data)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Method used to set the query parameters.
     *
     * @param {Object} parameters The given parameters.
     *
     * @returns {BaseAPI} The instance of the proxy.
     */
    setParameters(parameters) {
        Object.keys(parameters).forEach(key => {
            this.parameters[key] = parameters[key];
        });
        return this;
    }

    /**
     * Method used to set a single parameter.
     *
     * @param {string} parameter The given parameter.
     * @param {*} value The value to be set.
     *
     * @returns {BaseAPI} The instance of the proxy.
     */
    setParameter(parameter, value) {
        this.parameters[parameter] = value;
        return this;
    }

    /**
     * Method used to remove all the parameters.
     *
     * @param {Array} parameters The given parameters.
     *
     * @returns {BaseAPI} The instance of the proxy.
     */
    removeParameters(parameters) {
        parameters.forEach(parameter => {
            delete this.parameters[parameter];
        });
        return this;
    }

    /**
     * Method used to remove a single parameter.
     *
     * @param {string} parameter The given parameter.
     *
     * @returns {BaseAPI} The instance of the proxy.
     */
    removeParameter(parameter) {
        delete this.parameters[parameter];
        return this;
    }

    /**
     * Method used to transform a parameters object to a parameters string.
     *
     * @returns {string} The parameter string.
     */
    getParameterString() {
        const keys = Object.keys(this.parameters);
        const parameterStrings = keys
            .filter(
                key =>
                    !(
                        this.parameters[key] === null ||
                        this.parameters[key] === undefined
                    )
            )
            .map(key => `${key}=${this.parameters[key]}`);

        return parameterStrings.length === 0
            ? ''
            : `?${parameterStrings.join('&')}`;
    }
}

export default BaseAPI;
