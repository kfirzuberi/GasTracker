import types from './types.js';


const fetchRecords = (recordData) => {
    return {
        type: types.FETCH_RECORDS,
        value: recordData
    };
};

const addNewRecord = (newRecord) => {
    console.log(newRecord);
    return {
        type: types.ADD_NEW_RECORD,
        value: newRecord
    };
};

export default {
    fetchRecords,
    addNewRecord
}