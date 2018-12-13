import types from './types';

const globalInitialState = {
    records: [],
    isSaving: false
}

const authInitialState = {
    loading: true,
    user: undefined,
}

const settingsInitialState = {
    carID: ''
}

const globalReducer = (state = globalInitialState, action) => {
    switch (action.type) {
        case types.FETCH_RECORDS:
            return {
                ...state,
                records: action.value
            };

        case types.ADD_NEW_RECORD:
            return {
                ...state,
                isSaving: true
            }

        case types.ADD_NEW_RECORD_DONE:
        case types.ADD_NEW_RECORD_FAILED:
            return {
                ...state,
                isSaving: false
            }
        default:
            return state;
    }
};

const authReducer = (state = authInitialState, action) => {
    switch (action.type) {
        case types.AUTH_STATE_CHANGED:
            return {
                ...state,
                user: action.value.user,
                loading: action.value.loading,
            };

        default:
            return state;
    }
};

const settingsReducer = (state = settingsInitialState, action) => {
    switch (action.type) {
        case types.SAVE_SETTINGS:
            return {
                ...state,
                ...action.value
            };
        case types.GET_SETTINGS:
            return {
                ...state,
                ...action.value
            };
        default:
            return state;
    }
};



export {
    globalReducer, authReducer, settingsReducer
}