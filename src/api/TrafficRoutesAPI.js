import API from './API';
import Axios from 'axios';

class TrafficRoutesAPI extends API {
    chartEndpoint =
        'https://pmxfwkh2ka.execute-api.eu-central-1.amazonaws.com/default/ucc-traffic-routes-get-chart-data?routeId=';

    redirectsEndpoint =
        'https://pmxfwkh2ka.execute-api.eu-central-1.amazonaws.com/default/ucc-traffic-routes-get-redirects?routeId=';

    constructor(parameters = {}) {
        super('/traffic-routes', parameters);
    }

    getTrafficRoutes(query) {
        this.setParameters(query);
        return this.submit('get', `${this.endpoint}`);
    }

    getTrafficRouteById(id) {
        return this.submit('get', `${this.endpoint}/${id}`);
    }

    createTrafficRoute(data) {
        return this.submit('post', `${this.endpoint}`, data);
    }

    updateTrafficRoute(id, data) {
        return this.submit('patch', `${this.endpoint}/${id}`, data);
    }

    deleteTrafficRoute(id) {
        return this.submit('delete', `${this.endpoint}/${id}`);
    }

    publishTrafficRoute(id) {
        return this.submit('post', `${this.endpoint}/${id}/publish`);
    }

    unpublishTrafficRoute(id) {
        return this.submit('post', `${this.endpoint}/${id}/unpublish`);
    }

    getChartData(routeId) {
        const apiUrl = this.chartEndpoint + routeId;
        delete Axios.defaults.headers.common['Authorization'];
        return Axios.get(apiUrl);
    }
    getRedirectsData(routeId, limit = 5, offset = 0) {
        const apiUrl =
            this.redirectsEndpoint +
            routeId +
            '&limit=' +
            limit +
            '&offset=' +
            offset;
        delete Axios.defaults.headers.common['Authorization'];
        return Axios.get(apiUrl);
    }
}

export default TrafficRoutesAPI;
