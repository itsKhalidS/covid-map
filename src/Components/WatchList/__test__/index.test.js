import React from "react"
import { render, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom"

import WatchList from "../index.js"
afterEach(cleanup)

jest.mock("../WatchListCard.js", () => () => <div data-testid="card"></div>)

const countries = [
	{ Country: "United Kingdom" },
	{ Country: "United States of America" },
]

it("Renders WatchList Correctly", () => {
	render(<WatchList />)
})

it("Initially Displays Add Country button", () => {
	const { getByTestId } = render(
		<WatchList isLoading={true} loadSuccessful={false} />
	)
	expect(getByTestId("initial-add-country")).toBeInTheDocument()
})
