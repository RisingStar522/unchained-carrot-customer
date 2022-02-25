import API from './API';

class CustomerEventAPI extends API {


    constructor(parameters = {}) {
        super('/events', parameters);
    }

    getCustomerEvents(query) {
        return this.submit(
            'get',
            `${this.endpoint}?${query.filter +
                query.sort_by +
                query.limit +
                query.offset}`
        );
    }
}

export default CustomerEventAPI;
