import actions from './actions';
import firebase from '@firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

setTimeout = BackgroundTimer.setTimeout.bind(BackgroundTimer);
setInterval = BackgroundTimer.setInterval.bind(BackgroundTimer);
clearTimeout = BackgroundTimer.clearTimeout.bind(BackgroundTimer);
clearInterval = BackgroundTimer.clearInterval.bind(BackgroundTimer);

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;

const config = {
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
    uploadImage(newRecord.kmImage.path, 'kmImage').then(data => {

      const itemToAdd = {
        km: parseInt(newRecord.km),
        liters: parseInt(newRecord.liters),
        price: parseInt(newRecord.price),
        gasStation: newRecord.gasStation,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        kmImagePath: data
      };
      firestore.collection('records').add(itemToAdd).then(ref => {
      }).catch(error => {
      });
    })

    dispatch(actions.addNewRecord(newRecord));
  }
};

const uploadImage = (uri, name, mime = 'image/jpeg') => {
  const origXMLHttpRequest = window.XMLHttpRequest;
  const origBlob = window.Blob;

  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;

  return new Promise((resolve, reject) => {
    let imgUri = uri; let uploadBlob = null;
    const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
    //const { currentUser } = firebase.auth();
    const currentUser = { uid: 'kfir' };
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
        window.XMLHttpRequest = origXMLHttpRequest;
        window.Blob = origBlob;
        resolve(url);
      })
      .catch(error => {
        window.XMLHttpRequest = origXMLHttpRequest;
        window.Blob = origBlob;
        reject(error)
      })
  })
};

const watchRecordsDispatcher = () => {
  return dispatch => {
    const query = firestore.collection('records');//.where('state', '==', 'CA');

    query.onSnapshot(querySnapshot => {
      let recordsArray = [];

      querySnapshot.forEach(doc => {
        let item = doc.data();
        item.key = doc.id;
        recordsArray.push(item)
      });

      dispatch(actions.fetchRecords(recordsArray));
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
  }
};

export default {
  addNewRecordDispatcher,
  watchRecordsDispatcher
}