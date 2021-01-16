import React from "react";
import ReactDOM from "react-dom";
import { CustomButton } from "./custom-button";

import Enzyme, { shallow, render, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Testing sum", () => {
  it("renders correctly enzyme", () => {
    const wrapper = shallow(<CustomButton />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
