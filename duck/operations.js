import actions from './actions';
import firebase from '@firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';
import NavigationService from '../services/NavigationService';
import UserSettingsService from '../services/UserSettingsService';

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
  return (dispatch, getState) => {
    dispatch(actions.addNewRecord(newRecord));

    uploadImages(newRecord).then(data => {
      const { currentUser } = firebase.auth();

      let itemToAdd = {
        km: parseInt(newRecord.km),
        liters: parseInt(newRecord.liters),
        price: parseInt(newRecord.price),
        gasStation: newRecord.gasStation,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        uid: `${currentUser.uid}`,
        carID: getState().settings.carID,
        location: new firebase.firestore.GeoPoint(newRecord.location.latitude, newRecord.location.longitude),
        ...data
      };

      firestore.collection('records').add(itemToAdd).then(ref => {
        dispatch(actions.addNewRecordDone(ref, newRecord));
      }).catch(error => {
        dispatch(actions.addNewRecordFailed(error, newRecord));
      });
    })  
  }
};

const uploadImages = newRecord => {
  let imgPromises = [];
  const origXMLHttpRequest = window.XMLHttpRequest;
  const origBlob = window.Blob;

  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;

  if (newRecord.kmImage.path) {
    imgPromises.push(uploadImage(newRecord.kmImage.path, 'kmImage'));
  }

  if (newRecord.receiptImage.path) {
    imgPromises.push(uploadImage(newRecord.receiptImage.path, 'receiptImage'));
  }

  return Promise.all(imgPromises).then(urls => {
    window.XMLHttpRequest = origXMLHttpRequest;
    window.Blob = origBlob;

    return urls.reduce((result, item) => {
      result[item.name] = item.path;
      return result;
    }, {});;
  });
}

const uploadImage = (uri, name, mime = 'image/jpeg') => {
  return new Promise((resolve, reject) => {
    let imgUri = uri; let uploadBlob = null;
    const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
    const { currentUser } = firebase.auth();
    const dir = moment().format('DD-MM-YYYY HH:mm');
    const imageRef = firebase.storage().ref(`/images/${currentUser.uid}/${dir}/${name}`)

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
        resolve({ name: name, path: url });
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

const signUpDispatcher = newUser => {
  return dispatch => {
    const { email, password } = newUser;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch(actions.signUp(newUser));
      }).catch((error) => {
        const { code, message } = error;
        switch (code) {
          case 'auth/email-already-in-use':
            console.log('email-already-in-use');
            break;
          case 'auth/invalid-email':
            console.log('invalid-email');
            break;
          case 'auth/operation-not-allowed':
            console.log('operation-not-allowed');
            break;
          case 'auth/weak-password':
            console.log('weak-password');
            break;
        }
      });
  }
};

const signInDispatcher = userData => {
  return dispatch => {
    const { email, password } = userData;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch(actions.signIn(userData));
        NavigationService.navigate("SignedIn");
      }).catch((error) => {
        const { code, message } = error;
        switch (code) {
          case 'auth/invalid-email':
            console.log('invalid-email');
            break;
          case 'auth/user-disabled':
            console.log('user-disabled');
            break;
          case 'auth/user-not-found':
            console.log('user-not-found');
            break;
          case 'auth/wrong-password':
            console.log('wrong-password');
            break;
        }
      });
  }
};

const signOutDispatcher = () => {
  return dispatch => {
    firebase.auth().signOut().then(() => {
      NavigationService.navigate("SignedOut");
    });
    dispatch(actions.signOut());
  }
};

const watchAuthStateChangedDispatcher = () => {
  return dispatch => {
    //this.authSubscription = 
    firebase.auth().onAuthStateChanged((user) => {
      dispatch(actions.authStateChanged({
        loading: false,
        user,
      }));
    });
  }
};


const saveUserSettingsDispatcher = settings => {
  return dispatch => {
    UserSettingsService.saveUserSettings(settings).then(() => {
      console.log('saving', settings);
      dispatch(actions.saveUserSettings(settings));
    })
  }
};

const getUserSettingsDispatcher = settings => {
  return dispatch => {
    UserSettingsService.getUserSettings().then(settings => {
      console.log('getting', settings);
      dispatch(actions.getUserSettings(settings));
    })
  }
};


export default {
  addNewRecordDispatcher,
  watchRecordsDispatcher,
  signUpDispatcher,
  signOutDispatcher,
  signInDispatcher,
  watchAuthStateChangedDispatcher,
  saveUserSettingsDispatcher,
  getUserSettingsDispatcher
}