import API from './API';

export default class BuilderAPI extends API {
    constructor(parameters = {}) {
        super('', parameters);
        this.templates = `${this.endpoint}/landing-page-templates`;
        this.pages = `${this.endpoint}/landing-pages`;
        this.emailTemplates = `${this.endpoint}/email-templates`;

        this.lamdaAPI = process.env.VUE_APP_LAMDA_API;

        this.thumbnailLamba =
            'https://pmxfwkh2ka.execute-api.eu-central-1.amazonaws.com/default/ucc-html-to-image';
    }

    getLandingPageTemplates() {
        return this.submit('get', `${this.templates}`);
    }

    createLandingPageTemplate(payload) {
        return this.submit('post', `${this.templates}`, payload);
    }

    getLandingPageTemplate(templateId) {
        return this.submit('get', `${this.templates}/${templateId}`);
    }

    createLandingPage(payload) {
        return this.submit('post', `${this.pages}`, payload);
    }

    getLandingPages() {
        return this.submit('get', `${this.pages}`);
    }

    getLandingPage(pageId) {
        return this.submit('get', `${this.pages}/${pageId}`);
    }

    deleteLandingPageTemplate(templateId) {
        return this.submit('delete', `${this.templates}/${templateId}`);
    }

    deleteLandingPage(pageId) {
        return this.submit('delete', `${this.pages}/${pageId}`);
    }

    updateLandingPageTemplate({ templateId, data }) {
        return this.submit('patch', `${this.templates}/${templateId}`, data);
    }

    updateLandingPage({ pageId, data }) {
        return this.submit('patch', `${this.pages}/${pageId}`, data);
    }

    publishPage(data) {
        return this.submit(
            'post',
            `${this.lamdaAPI}/landing-pages-publish`,
            data
        );
    }
    unpublishPage(data) {
        return this.submit(
            'post',
            `${this.lamdaAPI}/landing-pages-unpublish`,
            data
        );
    }

    provisionLandingPage(data) {
        return this.submit(
            'post',
            `${this.lamdaAPI}/landing-pages-provision`,
            data
        );
    }

    getEmailTemplates() {
        return this.submit('get', `${this.emailTemplates}`);
    }

    createEmailTemplate(payload) {
        return this.submit('post', `${this.emailTemplates}`, payload);
    }

    deleteEmailTemplate(templateId) {
        return this.submit('delete', `${this.emailTemplates}/${templateId}`);
    }

    getEmailTemplate(templateId) {
        return this.submit('get', `${this.emailTemplates}/${templateId}`);
    }

    updateEmailTemplate({ templateId, data }) {
        return this.submit(
            'patch',
            `${this.emailTemplates}/${templateId}`,
            data
        );
    }

    generatePageThumbnail(base64EncodedHTMLString) {
        return this.submit('post', this.thumbnailLamba, {
            html: base64EncodedHTMLString,
            input_compressed: 'false',
            output_compressed: 'false',
            output_type: 'image',
            output_bucket: 'ucc-landing-pages',
            options: {
                format: 'png'
            }
        });
    }
}
