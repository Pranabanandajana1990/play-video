import { takeLatest, put, all, call } from "redux-saga/effects";
import React from "react";
import toaster from "toasted-notes";
import { homeActionTypes } from "./home.types";
import { youTubeQuerry } from "../../api/index";
import {
  setSearchField,
  searchFieldSuccess,
  searchFieldFaliure,
} from "./home.actions";
import { setSelectedVideo } from "../../redux/player/player.actions";
export function* searchFieldAsync(action) {
  try {
    const result = yield youTubeQuerry(action.payload);
    yield put(setSearchField(action.payload));
    yield put(searchFieldSuccess(result));
    yield put(setSelectedVideo(result[25]));
  } catch (error) {
    yield put(searchFieldFaliure(error));
    yield toaster.notify(<h5>{error.message}</h5>, {
      duration: 5000,
    });
  }
}

export function* onSelectSearchFiledStart() {
  yield takeLatest(homeActionTypes.SEARCH_FILED_START, searchFieldAsync);
}

export function* homeSagas() {
  yield all([call(onSelectSearchFiledStart)]);
}
