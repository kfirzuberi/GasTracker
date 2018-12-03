import types from './types';

const initialState = {
    personData: {},
    records: []
}


const globalReducer = (state = initialState, action) => {
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

export default globalReducer;