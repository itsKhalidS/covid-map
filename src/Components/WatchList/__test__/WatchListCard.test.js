import React from "react"
import { render, cleanup, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"

import WatchListCard from "../WatchListCard.js"
afterEach(cleanup)

const country = { id: 1, Country: "USA", CountryCode: "US" }
const countries = [{ Country: "USA", TotalConfirmed: 1000 }]
const mockFunc = jest.fn()
const mock = jest.fn()
const mockFunction = jest.fn()

it("Renders WatchList Correctly", () => {
	render(
		<WatchListCard
			country={country}
			countries={countries}
			onCountryChange={mockFunc}
			changeToOverallSidebar={mock}
		/>
	)
})

it("Displays Country Correctly", () => {
	const { container } = render(
		<WatchListCard
			country={country}
			countries={countries}
			onCountryChange={mockFunc}
			changeToOverallSidebar={mock}
		/>
	)
	expect(container.querySelector(".watch-list-card")).toHaveTextContent("USA")
	expect(container.querySelector(".watch-list-card")).toHaveTextContent("(US)")
})

it("Displays Data Correctly", () => {
	const { container } = render(
		<WatchListCard
			country={country}
			countries={countries}
			onCountryChange={mockFunc}
			changeToOverallSidebar={mock}
		/>
	)
	expect(container.querySelector(".danger")).toHaveTextContent("1000")
})

it("Watch List Card click works", () => {
	const { container } = render(
		<WatchListCard
			country={country}
			countries={countries}
			onCountryChange={mockFunc}
			changeToOverallSidebar={mock}
		/>
	)
	fireEvent.click(container.querySelector(".watch-list-card"))
	expect(mockFunc).toHaveBeenCalled()
	expect(mockFunc).toHaveBeenCalledWith({ target: { value: "USA" } })
	expect(mock).toHaveBeenCalled()
})

it("Delete button Works", () => {
	const { container } = render(
		<WatchListCard
			country={country}
			countries={countries}
			onCountryChange={mockFunc}
			deleteWatchCountry={mockFunction}
			changeToOverallSidebar={mock}
		/>
	)
	fireEvent.click(container.querySelector(".delete-btn"))
	expect(mockFunction).toHaveBeenCalled()
	expect(mockFunction).toHaveBeenCalledWith(country)
})
