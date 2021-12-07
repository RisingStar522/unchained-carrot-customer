import API from './API';

class IncomingWebhooksAPI extends API {
    constructor(parameters = {}) {
        super('/webhook-event-trackers', parameters);
    }

    getIncomingWebhooks(query) {
        this.setParameters(query);
        return this.submit('get', `${this.endpoint}`);
    }

    getIncomingWebhookById(id) {
        return this.submit('get', `${this.endpoint}/${id}`);
    }

    createIncomingWebhook(data) {
        return this.submit('post', `${this.endpoint}`, data);
    }

    updateIncomingWebhook(id, data) {
        return this.submit('patch', `${this.endpoint}/${id}`, data);
    }

    deleteIncomingWebhook(id) {
      return this.submit('delete', `${this.endpoint}/${id}`);
    }

    publishIncomingWebhook(id) {
      return this.submit('post', `${this.endpoint}/${id}/publish`);
    }

    unpublishIncomingWebhook(id) {
      return this.submit('post', `${this.endpoint}/${id}/unpublish`);
    }
}

export default IncomingWebhooksAPI;
