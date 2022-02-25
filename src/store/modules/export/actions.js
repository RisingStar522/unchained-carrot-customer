import ExportAPI from '../../../api/ExportAPI';

export default {
    async getExport({ commit }) {
        try {
            console.log('ấdfadsfsadfsa');
            const resp = await new ExportAPI().getExports();
            commit('SET_EXPORT', resp);
            return resp;
        } catch (error) {
            return error;
        }
    }
};
