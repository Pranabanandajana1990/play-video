import React from "react";
import ReactDOM from "react-dom";
import { DeleteButton } from "./delete_button";

import Enzyme, { shallow, render, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Testing sum", () => {
  const deleteButtonObject = {
    video: "video",
    user: "user",
    deleteVideoStart: "deleteVideoStart",
  };

  it("renders correctly enzyme", () => {
    const wrapper = shallow(<DeleteButton {...deleteButtonObject} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
