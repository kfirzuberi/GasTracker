import actions from './actions';
import firebase from '@firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';
import {Platform } from 'react-native';


const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

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
firebase.firestore.setLogLevel('debug');
const addNewRecordDispatcher = newRecord => {
    return dispatch => {
        uploadImage(newRecord.kmImage.path, 'kmImage').then(data=>{
            firestore.collection('records').add({
                        km: parseInt(newRecord.km),
                        liters: parseInt(newRecord.liters),
                        price: parseInt(newRecord.price),
                        gasStation: newRecord.gasStation,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        kmImagePath : data
                    }).then(ref => {
                        console.log('Added document with ID: ', ref.id);
                    });
        })


        dispatch(actions.addNewRecord(newRecord));
    }
};

const uploadImage = (uri, name, mime = 'image/jpeg')=> {
     return new Promise((resolve, reject) => {
       let imgUri = uri; let uploadBlob = null;
       const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
       //const { currentUser } = firebase.auth();
       const currentUser = {
       uid : 'kfir'
       } ;
      const imageRef = firebase.storage().ref(`/images/${currentUser.uid}`)

       fs.readFile(uploadUri, 'base64')
         .then(data => {
           return Blob.build(data, { type: `${mime};BASE64` });
         })
         .then(blob => {
           uploadBlob = blob;
           return imageRef.put(blob, { contentType: mime, name: name });
         })
         .then(() => {
           uploadBlob.close()
           return imageRef.getDownloadURL();
         })
         .then(url => {
           resolve(url);
         })
         .catch(error => {
           reject(error)
       })
     })
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