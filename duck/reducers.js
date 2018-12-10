import types from './types';

const globalInitialState = {
    personData: {},
    records: []
}

const authInitialState = {
    loading: true,
    user : undefined,
}

const globalReducer = (state = globalInitialState, action) => {
    switch (action.type) {
        case types.FETCH_RECORDS:
            return {
                ...state,
                records: action.value
            };

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


export {
    globalReducer, authReducer
}