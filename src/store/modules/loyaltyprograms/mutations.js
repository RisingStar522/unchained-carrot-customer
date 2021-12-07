export default {
    SET_PROGRAMS(state, data) {
        state.loyaltyPrograms = data;
    },

    SET_PROGRAMS_PAGINATION(state, data) {
        state.loyaltyProgramsPagination = data;
    },

    SET_SINGLE_PROGRAM(state, data) {
        state.loyaltyProgram = data;
    },

    SET_LEVELS(state, data) {
        state.loyaltyProgramLevels = data;
    },

    SET_MEMBERS(state, data) {
        state.loyaltyProgramMembers = data;
    },

    SET_PROGRAM_MEMBERS_PAGINATION(state, data) {
        state.loyaltyProgramMembersPagination = data;
    }
};
