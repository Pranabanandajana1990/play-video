import { all, call } from "redux-saga/effects";
import { userSagas } from "./user/user.sagas";
import { homeSagas } from "./home/home.sagas";
export default function* rootSaga() {
  yield all([call(userSagas), call(homeSagas)]);
}
