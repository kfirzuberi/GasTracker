import types from './types.js';


const fetchRecords = (recordData) => {
    return {
        type: types.FETCH_RECORDS,
        value: recordData
    };
};

const addNewRecord = (newRecord) => {
    return {
        type: types.ADD_NEW_RECORD,
        value: newRecord
    };
};

const signUp = (newUser) => {
    return {
        type: types.SIGN_UP,
        value: newUser
    };
};

const signIn = (user) => {
    return {
        type: types.SIGN_IN,
        value: user
    };
};

const signOut = () => {
    return {
        type: types.SIGN_OUT,
    };
};

export default {
    fetchRecords,
    addNewRecord,
    signUp,
    signIn,
    signOut
}