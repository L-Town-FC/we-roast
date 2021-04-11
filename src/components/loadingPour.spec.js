import React from "react"
import renderer from "react-test-renderer"

import LoadingPour from "./loadingPour"

describe("Header", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<LoadingPour />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})