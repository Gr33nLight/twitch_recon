import React from "react";
import renderer from "react-test-renderer";
import Home from "./index";

describe("<Home />", () => {
  it("renders correctly", async () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
