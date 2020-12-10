import React from "react"
import { render, cleanup, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"

import MapChart from "../index.js"
afterEach(cleanup)

jest.mock("react-simple-maps", () => {
	return {
		ComposableMap: () => <div data-testid="composable-map"></div>,
		Geographies: () => <div></div>,
		Geography: () => <div></div>,
		ZoomableGroup: () => <div></div>,
		Sphere: () => <div></div>,
		Graticule: () => <div></div>,
	}
})
const mockFunc = jest.fn()

it("renders correctly", () => {
	render(<MapChart />)
})

it("renders Map", () => {
	const { getByTestId } = render(<MapChart />)
	expect(getByTestId("composable-map")).toBeInTheDocument()
})

it("Total Cases button works", () => {
	const { getByText } = render(
		<MapChart plotByConfirmedCases={mockFunc} plotCondition={0} />
	)
	fireEvent.click(getByText("Total Cases (per million)"))
	expect(mockFunc).toHaveBeenCalled()
})

it("Total Cases button gets active", () => {
	const { getByText } = render(
		<MapChart plotByConfirmedCases={mockFunc} plotCondition={0} />
	)
	expect(getByText("Total Cases (per million)")).toHaveClass(
		"button button-active"
	)
})

it("Total Deaths button works", () => {
	const { getByText } = render(
		<MapChart plotByDeathCases={mockFunc} plotCondition={1} />
	)
	fireEvent.click(getByText("Total Deaths (per million)"))
	expect(mockFunc).toHaveBeenCalled()
})

it("Total Deaths button gets active", () => {
	const { getByText } = render(
		<MapChart plotByDeathCases={mockFunc} plotCondition={1} />
	)
	expect(getByText("Total Deaths (per million)")).toHaveClass(
		"button button-active"
	)
})

it("Indicator Present ", () => {
	const { getByText } = render(<MapChart />)
	expect(getByText("Low")).toBeInTheDocument()
	expect(getByText("High")).toBeInTheDocument()
})

it("Name Present", () => {
	const { getByText } = render(<MapChart />)
	expect(getByText("Md Khalid Shahzad")).toBeInTheDocument()
})
