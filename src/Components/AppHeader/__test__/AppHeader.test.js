import React from "react"
import { render, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import AppHeader from "../index.js"
afterEach(cleanup)

it("renders App Header", () => {
	render(<AppHeader />)
})

it("renders Loading Spinner", () => {
	const { getByTestId } = render(
		<AppHeader isLoading={true} loadSuccessful={false} data={{}} />
	)
	expect(getByTestId("loadSpan")).toBeInTheDocument()
})

it("renders Confirmed Data", () => {
	const { getByTestId } = render(
		<AppHeader
			isLoading={false}
			loadSuccessful={true}
			data={{ TotalConfirmed: 300 }}
		/>
	)
	expect(getByTestId("TotConfspan")).toHaveTextContent("300")
})

it("renders New Recovered Data", () => {
	const { getByTestId } = render(
		<AppHeader
			isLoading={false}
			loadSuccessful={true}
			data={{ NewRecovered: 700 }}
		/>
	)
	expect(getByTestId("NewRecov")).toHaveTextContent("700")
})

it("renders Failed to Load", () => {
	const { getByTestId } = render(
		<AppHeader isLoading={false} loadSuccessful={false} data={{}} />
	)
	expect(getByTestId("TotConfspan")).toHaveTextContent("Failed to Load")
})
