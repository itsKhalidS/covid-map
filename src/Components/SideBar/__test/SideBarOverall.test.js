import React from "react"
import { render, cleanup, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"

import SideBarOverall from "../SideBarOverall.js"
afterEach(cleanup)

const mockFunc = jest.fn()
const currentCountry = {
	Country: "United States of America",
	NewConfirmed: 221267,
	TotalConfirmed: 15386562,
	NewDeaths: 0,
	TotalDeaths: 286249,
	NewRecovered: 102981,
	TotalRecovered: 5889896,
}
const countries = [
	{
		Country: "United Kingdom",
		NewConfirmed: 16634,
		TotalConfirmed: 1771545,
		NewDeaths: 0,
		TotalDeaths: 62130,
		NewRecovered: 13,
		TotalRecovered: 3778,
	},
	{
		Country: "United States of America",
		NewConfirmed: 221267,
		TotalConfirmed: 15386562,
		NewDeaths: 0,
		TotalDeaths: 286249,
		NewRecovered: 102981,
		TotalRecovered: 5889896,
	},
]

it("Renders Correctly", () => {
	render(<SideBarOverall />)
})

it("Displays Loading Symbol ", () => {
	const { getByTestId } = render(
		<SideBarOverall isLoading={true} loadSuccessful={false} />
	)
	expect(getByTestId("spinner")).toBeInTheDocument()
})

it("Displays Failed to Load ", () => {
	const { getByTestId } = render(
		<SideBarOverall isLoading={false} loadSuccessful={false} />
	)
	expect(getByTestId("failed")).toBeInTheDocument()
})

it("Displays Data Correctly", () => {
	const { getByTestId } = render(
		<SideBarOverall
			isLoading={false}
			loadSuccessful={true}
			countries={countries}
			currentCountry={currentCountry}
			onCountryChange={mockFunc}
		/>
	)
	expect(getByTestId("totConf")).toHaveTextContent("15386562")
	expect(getByTestId("newConf")).toHaveTextContent("221267")
	expect(getByTestId("totDeath")).toHaveTextContent("286249")
	expect(getByTestId("newDeath")).toHaveTextContent("0")
	expect(getByTestId("totRec")).toHaveTextContent("5889896")
	expect(getByTestId("newRec")).toHaveTextContent("102981")
})

it("Displays Select Tag correctly while loading ", () => {
	const { getByTestId } = render(
		<SideBarOverall isLoading={true} loadSuccessful={false} />
	)
	expect(getByTestId("select")).toHaveValue("Choose Country")
})

it("Displays Select Tag correctly when load fails ", () => {
	const { getByTestId } = render(
		<SideBarOverall isLoading={false} loadSuccessful={false} />
	)
	expect(getByTestId("select")).toHaveValue("Choose Country")
})

it("Displays Select Tag correctly when load completes ", () => {
	const { getByTestId } = render(
		<SideBarOverall
			isLoading={false}
			loadSuccessful={true}
			countries={countries}
			currentCountry={currentCountry}
			onCountryChange={mockFunc}
		/>
	)
	expect(getByTestId("select")).toHaveValue("United States of America")
})

it("Changes Select Tag Values", () => {
	const { getByTestId } = render(
		<SideBarOverall
			isLoading={false}
			loadSuccessful={true}
			countries={countries}
			currentCountry={currentCountry}
			onCountryChange={mockFunc}
		/>
	)
	fireEvent.change(getByTestId("select"), {
		target: { value: "United Kingdom" },
	})
	expect(mockFunc).toHaveBeenCalled()
})
