import "./App.scss";
import HomePage from "./pages/home-page/home-page";
import { Switch, Route } from "react-router-dom";
import VideoPlayer from "./pages/video-palyer-page/video-palyer";
import Header from "./components/header/header";
const App = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/player" component={VideoPlayer} />
      </Switch>
    </div>
  );
};

export default App;
