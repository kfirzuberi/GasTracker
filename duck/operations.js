import actions from './actions';
import firebase from '@firebase/app';
import 'firebase/firestore';

  var config = {
    apiKey: "AIzaSyBHhujlz3N_RVooQg7cO4ogqg78N7SltDU",
    authDomain: "gas-tracker-c8c1d.firebaseapp.com",
    databaseURL: "https://gas-tracker-c8c1d.firebaseio.com",
    projectId: "gas-tracker-c8c1d",
    storageBucket: "gas-tracker-c8c1d.appspot.com",
    messagingSenderId: "1042681292419"
  };

firebase.initializeApp(config);
const firestore = firebase.firestore();

firestore.settings({ timestampsInSnapshots: true });
firebase.firestore.setLogLevel('debug')
const addNewRecordDispatcher = newRecord => {
    return dispatch => {
        firestore.collection('records').add({
            km: parseInt(newRecord.km),
            liters: parseInt(newRecord.liters),
            price: parseInt(newRecord.price),
            gasStation: newRecord.gasStation,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(ref => {
            console.log('Added document with ID: ', ref.id);
        });

        dispatch(actions.addNewRecord(newRecord));
    }
};

const watchRecordsDispatcher = () => {
    return dispatch => {
        const query = firestore.collection('records');//.where('state', '==', 'CA');

        query.onSnapshot(querySnapshot => {
            console.log(`Received query snapshot of size ${querySnapshot.size}`);
            let r = [];

            querySnapshot.forEach(doc => {
                let item = doc.data();
                item.key = doc.id;

                console.log(doc.id, '==>', doc.data().timestamp);
                r.push(item)
            });

            dispatch(actions.fetchRecords(r));
        }, err => {
            console.log(`Encountered error: ${err}`);
        });
    }
};

export default {
    addNewRecordDispatcher,
    watchRecordsDispatcher
}