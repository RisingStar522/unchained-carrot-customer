import API from './API';

class OutgoingWebhooksAPI extends API {
    constructor(parameters = {}) {
        super('/webhook-subscription', parameters);
    }

    getOutgoingWebhooks(query) {
        this.setParameters(query);
        return this.submit('get', `${this.endpoint}`);
    }

    getOutgoingWebhookById(id) {
        return this.submit('get', `${this.endpoint}/${id}`);
    }

    createOutgoingWebhook(data) {
        return this.submit('post', `${this.endpoint}`, data);
    }

    updateOutgoingWebhook(id, data) {
        return this.submit('patch', `${this.endpoint}/${id}`, data);
    }

    deleteOutgoingWebhook(id) {
      return this.submit('delete', `${this.endpoint}/${id}`);
    }

    publishOutgoingWebhook(id) {
      return this.submit('post', `${this.endpoint}/${id}/publish`);
    }

    unpublishOutgoingWebhook(id) {
      return this.submit('post', `${this.endpoint}/${id}/unpublish`);
    }
}

export default OutgoingWebhooksAPI;
