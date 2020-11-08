import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import homeReducer from "./home/home.reducer";
import playerReducer from "./player/player.reducer";
import { persistReducer } from "redux-persist";
import localStorage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root-playMate",
  storage: localStorage,
  blacklist: ["user", "home"],
};

const rootreducer = combineReducers({
  user: userReducer,
  home: homeReducer,
  player: playerReducer,
});
export default persistReducer(persistConfig, rootreducer);
