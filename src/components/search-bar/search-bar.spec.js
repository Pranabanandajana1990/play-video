import React from "react";
import { SearchBar } from "./search-bar";

import Enzyme, { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
const temp = {
  history: {
    location: {
      pathname: "ggfg",
    },
  },
};
describe("Testing sum", () => {
  it("renders correctly enzyme", () => {
    const wrapper = shallow(<SearchBar {...temp} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
