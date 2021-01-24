import React from "react";
import { VideoCard } from "./video-card";

import Enzyme, { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Testing sum", () => {
  const videoObject = {
    title: "title",
    videoId: "videoId",
    description: "description",
    thumbnails: { medium: "medium" },
  };

  it("renders correctly enzyme", () => {
    const wrapper = shallow(<VideoCard {...videoObject} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
