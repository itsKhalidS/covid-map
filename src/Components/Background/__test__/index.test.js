import React from "react"
import { render, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom"

import Background from "../index.js"
afterEach(cleanup)
jest.mock("../../AuthenticationPage/index.js", () => () => (
	<div data-testid="AuthPage"></div>
))
jest.mock("../../Navbar/index.js", () => () => <div data-testid="Navbar"></div>)
jest.mock("../../Body/index.js", () => () => <div data-testid="Body"></div>)

it("renders correctly", () => {
	render(<Background />)
})

it("Renders Navbar and Body Initaially", () => {
	const { getByTestId } = render(<Background />)
	expect(getByTestId("Navbar")).toBeInTheDocument()
	expect(getByTestId("Body")).toBeInTheDocument()
})
