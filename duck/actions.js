import types from './types.js';


const fetchRecords = recordData => {
    return {
        type: types.FETCH_RECORDS,
        value: recordData
    };
};

const addNewRecord = newRecord => {
    return {
        type: types.ADD_NEW_RECORD,
        value: newRecord
    };
};

const signUp = newUser => {
    return {
        type: types.SIGN_UP,
        value: newUser
    };
};

const signIn = user => {
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

const authStateChanged = user => {
    return {
        type: types.AUTH_STATE_CHANGED,
        value: user
    };
};

const saveUserSettings = settings => {
    return {
        type: types.SAVE_SETTINGS,
        value: settings
    };
};

const getUserSettings = settings => {
    return {
        type: types.GET_SETTINGS,
        value: settings
    };
};

export default {
    fetchRecords,
    addNewRecord,
    signUp,
    signIn,
    signOut,
    authStateChanged,
    saveUserSettings,
    getUserSettings
}