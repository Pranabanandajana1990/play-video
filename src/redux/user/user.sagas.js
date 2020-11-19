import { takeLatest, put, all, call } from "redux-saga/effects";
import React from "react";
import toaster from "toasted-notes";
import { UserActionType } from "./user.types";
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
  addVideoToPlayList,
  deleteVideoFromPlayList,
  getPlayList,
} from "../../api/firebase/utils";
import {
  signInSuccess,
  signInFaliure,
  signOutSuccess,
  signOutFaliure,
  signUpSuccess,
  signUpFalure,
  addVideoSuccess,
  addVideoFaliure,
  deleteVideoSuccess,
  deleteVideoFaliure,
  getPlayListStart,
  getPlayListSuccess,
  getPlayListFaliure,
} from "./user.actions";

export function* getSnapshotFromUserAuth(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFaliure(error));
    yield toaster.notify(<h5>{error.message}</h5>, {
      duration: 5000,
      position: "bottom-right",
    });
  }
}

export function* signInWithGoogleAsync() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
    yield toaster.notify(<h5>SUCCESSFULLY SIGNED IN WITH GOOGLE</h5>, {
      duration: 5000,
      position: "bottom-right",
    });
  } catch (error) {
    yield put(signInFaliure(error));
    yield toaster.notify(<h5>{error.message}</h5>, {
      duration: 5000,
      position: "bottom-right",
    });
  }
}

export function* signInWithEmailAsync({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
    yield toaster.notify(<h5>SUCCESSFULLY SIGNED IN</h5>, {
      duration: 5000,
      position: "bottom-right",
    });
  } catch (error) {
    yield put(signInFaliure(error));
    yield toaster.notify(<h5>{error.message}</h5>, {
      duration: 5000,
      position: "bottom-right",
    });
  }
}

export function* isUserAuthenticated() {
  // console.log("auth triggered");
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) {
      return;
    }
    yield getSnapshotFromUserAuth(userAuth);
    yield toaster.notify(<h5>SESSION RETAINED</h5>, {
      duration: 5000,
      position: "bottom-right",
    });
  } catch (error) {
    yield put(signInFaliure(error));
    yield toaster.notify(<h5>{error.message}</h5>, {
      duration: 5000,
      position: "bottom-right",
    });
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionType.GOOGLE_SIGNIN_START, signInWithGoogleAsync);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionType.EMAIL_SIGNIN_START, signInWithEmailAsync);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionType.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutAsync() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
    yield toaster.notify(<h5>SUCCESSFULLY SIGNED OUT</h5>, {
      duration: 5000,
      position: "bottom-right",
    });
  } catch (error) {
    yield put(signOutFaliure(error));
    yield toaster.notify(<h5>{error.message}</h5>, {
      duration: 5000,
      position: "bottom-right",
    });
  }
}
export function* onSignOutStart() {
  yield takeLatest(UserActionType.SIGNOUT_START, signOutAsync);
}

export function* signUpAsync({ payload: { displayName, email, password } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield createUserProfileDocument(user, { displayName });
    yield put(signUpSuccess());
    yield toaster.notify(<h5>SUCCESSFULLY SIGNED UP</h5>, {
      duration: 5000,
      position: "bottom-right",
    });
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signUpFalure(error));
    yield toaster.notify(<h5>{error.message}</h5>, {
      duration: 5000,
      position: "bottom-right",
    });
  }
}

export function* onSignUpStart() {
  yield takeLatest(UserActionType.SIGNUP_START, signUpAsync);
}

export function* addVideoAsync(action) {
  try {
    yield addVideoToPlayList(action.payload.user, action.payload.video);
    yield put(addVideoSuccess(action.payload.video));
    yield toaster.notify(<h5>SUCCESSFULLY ADDED TO PLAYLIST</h5>, {
      duration: 5000,
      position: "bottom-right",
    });
  } catch (error) {
    put(addVideoFaliure(error));
    yield toaster.notify(<h5>{error.message}</h5>, {
      duration: 5000,
      position: "bottom-right",
    });
  }
}
export function* onAddVideoStart() {
  yield takeLatest(UserActionType.ADD_VIDEO_START, addVideoAsync);
}

export function* deleteVideoAsync(action) {
  try {
    yield deleteVideoFromPlayList(action.payload.user, action.payload.video);
    yield put(deleteVideoSuccess(action.payload.video));
    yield toaster.notify(<h5>VIDEO SUCCESSFULLY REMOVED FROM PLAYLIST</h5>, {
      duration: 5000,
      position: "bottom-right",
    });
  } catch (error) {
    put(deleteVideoFaliure(error));
    yield toaster.notify(<h5>{error.message}</h5>, {
      duration: 5000,
      position: "bottom-right",
    });
  }
}
export function* onDeleteVideoStart() {
  yield takeLatest(UserActionType.DELETE_VIDEO_START, deleteVideoAsync);
}
export function* getPlayListAsync(action) {
  try {
    const data = yield getPlayList(action.payload);
    yield put(getPlayListSuccess(data));
  } catch (error) {
    yield put(getPlayListFaliure(error));
  }
}

export function* onGetPlayListStart() {
  yield takeLatest(UserActionType.GET_PLAYLIST_START, getPlayListAsync);
}

export function* triggerPlayList(action) {
  yield put(getPlayListStart(action.payload));
}

export function* onUserSignInSuccess() {
  yield takeLatest(UserActionType.SIGNIN_SUCCESS, triggerPlayList);
}

export function* userSagas() {
  yield all([
    call(onGetPlayListStart),
    call(onDeleteVideoStart),
    call(onUserSignInSuccess),
    call(onAddVideoStart),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
  ]);
}
