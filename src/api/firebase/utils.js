import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// import { TimeStamp } from "firebase/firebase-firestore";
const config = {
  apiKey: "AIzaSyBSmYCtl9WX8JY6THadedLjo4-jFbpKvLs",
  authDomain: "playvideo-a980d.firebaseapp.com",
  databaseURL: "https://playvideo-a980d.firebaseio.com",
  projectId: "playvideo-a980d",
  storageBucket: "playvideo-a980d.appspot.com",
  messagingSenderId: "39210118335",
  appId: "1:39210118335:web:b5a5196f762f3e708eea0a",
  measurementId: "G-K9LNSCW3CQ",
};
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const {
      uid,
      phoneNumber,
      photoURL,
      email,
      displayName,
      emailVerified,
    } = userAuth;
    // const createdAt = new Date();
    try {
      await userRef.set({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        phoneNumber,
        photoURL,
        email,
        emailVerified,
        displayName,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating new user");
      console.log(error);
    }
  }
  return userRef;
  //   console.log(snapShot);
};
firebase.initializeApp(config);

// for authentication
export const auth = firebase.auth();
// for firestore data bse
export const firestore = firebase.firestore();
// google oauth
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

export const convertCollectionsSnapShotToMap = (collections) => {
  const transformedCollections = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

// this is only to mimmic the pattern where we dont have firebase as backend
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (userAuth) => {
      unsubscribeAuth();
      resolve(userAuth);
    }, reject);
  });
};

export const addVideosToHome = async (videos, text) => {
  const homeRef = firestore.doc(`homes/${text}`);
  const homeSnapShot = await homeRef.get();
  if (!homeSnapShot.exists) {
    try {
      homeRef.set({ videos });
    } catch (error) {
      console.log(error);
    }
  }
  return;
};
export const getHomeVideos = async (text) => {
  const homeRef = firestore.doc(`homes/${text}`);
  const homeSnapShot = await homeRef.get();
  const { videos } = homeSnapShot.data();
  // console.log(homeSnapShot.data());
  return videos;
};

export const addVideoToPlayList = async (user, video) => {
  const playListRef = firestore
    .collection("playlists")
    .doc(user.id)
    .collection("playlist")
    .doc(video.videoId);
  // const playListRef=firestore.collection("playlists").doc(user.id)
  const playListSnapShot = await playListRef.get();
  if (!playListSnapShot.exists) {
    await playListRef.set({ ...video });
    console.log("success");
  }
};

export const deleteVideoFromPlayList = async (user, video) => {
  const playListRef = firestore
    .collection("playlists")
    .doc(user.id)
    .collection("playlist")
    .doc(video.videoId);
  const playListSnapShot = await playListRef.get();
  if (playListSnapShot.exists) {
    await playListRef.delete();
  }
};

export const getPlayList = async (user) => {
  const playListRef = firestore
    .collection("playlists")
    .doc(user.id)
    .collection("playlist");
  // console.log(user);
  const playListSnapShot = await playListRef.get();

  const data = {};
  playListSnapShot.forEach((obj) => {
    const doc = obj.data();
    // console.log(doc);
    data[doc.videoId] = doc;
  });
  return data;
};
export default firebase;
