import Transformer from './Transformer';

export default class SurveyTransformer extends Transformer {
    static fetch(item) {
        return {
            id: item._id,
            name: item.title,
            survey: item.questions,
            rewards: item.rewards || {},
            lifeCycle: item.lifeCycle || {},
            folder: item.folderId,
            customer: item.customerId,
            language: item.language
        };
    }

    static fetchList(array) {
        return array.map(item => {
            return {
                id: item._id,
                link: { name: 'SurveysActivate', params: { id: item._id } },
                name: item.title
            };
        });
    }

    static send(item) {
        return {
            folderId: item.folder,
            title: item.name,
            language: item.language,
            questions: item.survey,
            rewards: item.rewards,
            lifeCycle: item.lifeCycle
        };
    }

    static fetchModel(data) {
        return {
            locale: data.language,
            title: data.title,
            pages: data.questions.pages
        };
    }
}
