export default {
    surveyFolders: state => state.folders,
    selectedSurveyFolder: state => state.selectedFolder,
    surveyCompleting: state => state.isCompleting,
    surveyById: state => id => state.surveys[id] || null,
    surveyList: state => state.surveyList,
    getSurveyModel: state => state.current.model || {},
    getSurveyId: state => state.current.id,
    getAllSurveys: state => state.allSurveys
};
