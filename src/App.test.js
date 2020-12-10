import React from "react"
import { render, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom"

import App from "./App.js"
afterEach(cleanup)
jest.mock("./Components/Background/index.js", () => () => (
	<div data-testid="Background"></div>
))

it("Renders App Component", () => {
	render(<App />)
})

it("Displays Background Component", () => {
	const { getByTestId } = render(<App />)
	expect(getByTestId("Background")).toBeInTheDocument()
})
