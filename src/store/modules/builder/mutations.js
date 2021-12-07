export default {
    SET_PAGES(state, data) {
        state.pages = data;
    },
    SET_TEMPLATES(state, data) {
        state.templates = data;
    },
    UPDATE_TEMPLATE_LIST(state, { _id }) {
        state.templates = state.templates.filter(
            template => template._id != _id
        );
    },
    UPDATE_PAGE_LIST(state, { _id }) {
        state.pages = state.pages.filter(page => page._id != _id);
    },
    UPDATE_TEMPLATE(state, data) {
        state.templates = [
            ...state.templates.filter(template => template._id != data._id),
            data
        ];
    },
    UPDATE_PAGE(state, data) {
        state.pages = [
            data,
            ...state.pages.filter(page => page._id != data._id)
        ];
    },
    SET_EMAIL_TEMPLATES(state, data) {
        state.emailTemplates = data;
    },
    UPDATE_EMAIL_TEMPLATE_LIST(state, { _id }) {
        state.emailTemplates = state.emailTemplates.filter(
            template => template._id != _id
        );
    },
    UPDATE_EMAIL_TEMPLATE(state, data) {
        state.emailTemplates = [
            ...state.emailTemplates.filter(
                template => template._id != data._id
            ),
            data
        ];
    }
};
