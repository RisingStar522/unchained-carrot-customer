import auth0 from 'auth0-js';
import { EventEmitter } from 'events';
import authConfig from '../config/auth.json';

const webAuth = new auth0.WebAuth({
    domain: authConfig.domain,
    redirectUri: `${window.location.origin}/callback`,
    clientID: authConfig.clientId,
    responseType: 'token id_token',
    audience: authConfig.audience,
    scope: 'openid profile email'
});

const localStorageKey = 'loggedIn';
const idTokenKey = 'id_token';
const loginEvent = 'loginEvent';

class AuthService extends EventEmitter {
    accessToken = null;
    tokenExpiry = null;
    profile = null;

    login(customState) {
        webAuth.authorize({
            appState: customState
        });
    }

    handleAuthentication() {
        return new Promise((resolve, reject) => {
            webAuth.parseHash((err, authResult) => {
                if (err) {
                    reject(err);
                } else {
                    this.localLogin(authResult);
                    resolve(authResult.idTokenPayload.email);
                }
            });
        });
    }

    localLogin(authResult) {
        this.accessToken = authResult.accessToken;
        this.profile = authResult.idTokenPayload;

        // Convert the expiry time from seconds to milliseconds
        this.tokenExpiry = +new Date(this.profile.exp * 1000);

        localStorage.setItem(localStorageKey, 'true');
        localStorage.setItem(idTokenKey, authResult.accessToken);

        this.emit(loginEvent, {
            loggedIn: true,
            profile: authResult.idTokenPayload,
            state: authResult.appState || {}
        });
    }

    renewTokens() {
        return new Promise((resolve, reject) => {
            if (localStorage.getItem(localStorageKey) !== 'true') {
                return reject('Not logged in');
            }
            webAuth.checkSession({}, (err, authResult) => {
                if (err) {
                    reject(err);
                } else {
                    this.localLogin(authResult);
                    resolve(authResult);
                }
            });
        });
    }

    logout() {
        localStorage.removeItem(localStorageKey);
        localStorage.removeItem(idTokenKey);

        this.idToken = null;
        this.tokenExpiry = null;
        this.profile = null;

        webAuth.logout({
            returnTo: `${window.location.origin}`
        });

        this.emit(loginEvent, { loggedIn: false });
    }

    isAuthenticated() {
        return (
            +Date.now() < this.tokenExpiry &&
            localStorage.getItem(localStorageKey) === 'true'
        );
    }

    isAccessTokenValid() {
        return (
            this.accessToken &&
            this.tokenExpiry &&
            +new Date() < this.tokenExpiry
        );
    }

    getAccessToken() {
        return new Promise((resolve, reject) => {
            if (this.isAccessTokenValid()) {
                resolve(this.accessToken);
            } else if (this.isAuthenticated()) {
                this.renewTokens().then(authResult => {
                    resolve(authResult.accessToken);
                }, reject);
            } else {
                resolve();
            }
        });
    }
}

const service = new AuthService();

service.setMaxListeners(5);

export default service;
