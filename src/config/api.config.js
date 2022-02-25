const location = window.location.hostname;
let uccAPI = '';

// https://c7af441f9103.ngrok.io/v1
// https://api.unchainedcarrot.com/v1
switch (location) {
    case 'localhost':
        uccAPI = 'https://api.unchainedcarrot.com/v1';
        // uccAPI = 'https://unchainedcarrot-api.azurewebsites.net/v1';
        break;
    case 'customer.unchainedcarrot.com':
        uccAPI = 'https://api.unchainedcarrot.com/v1';
        break;
    default:
        break;
}

export default {
    uccAPI: uccAPI
};
