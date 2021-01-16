import React from "react";
import ReactDOM from "react-dom";
import { AddButton } from "./add_button";

import Enzyme, { shallow, render, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Testing sum", () => {
  const addButtonObject = {
    video: "video",
    user: "user",
    addVideoStart: "addVideoStart",
  };

  it("renders correctly enzyme", () => {
    const wrapper = shallow(<AddButton {...addButtonObject} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
