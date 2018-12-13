import { AsyncStorage } from "react-native"

const storeData = async (key, value) => {
    await AsyncStorage.setItem(key, value);
};

const retrieveData = async key => {
    let value = '';

    console.log('want', key)

    try{
        value = await AsyncStorage.getItem(key);
    }catch (e){}

    return value;
};

const SETTINGS = {
    CAR_ID : 'CAR_ID'
};

const getUserSettings = async ()=>{
    const carID = await retrieveData(SETTINGS.CAR_ID);
console.log(carID);
    return {
        carID
    };
};

const saveUserSettings = async userSettings=>{
   if(userSettings.carID){
    await storeData(SETTINGS.CAR_ID, userSettings.carID); 
   }
};

export default {
    getUserSettings,
    saveUserSettings
};