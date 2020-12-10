import React from "react"
import { render, cleanup, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"

import SideBarMonth from "../SideBarMonth.js"
afterEach(cleanup)

const mockFunc = jest.fn()
const currentCountry = { Country: "United States of America" }
const countries = [
	{ Country: "United Kingdom" },
	{ Country: "United States of America" },
]
const data = {
	confirmed: 1000,
	dead: 20,
	recovered: 780,
}
const dateToday = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
	new Date().getDate() < 9 ? "0" + new Date().getDate() : new Date().getDate()
}`

it("Renders Correctly", () => {
	render(
		<SideBarMonth
			countries={countries}
			currentCountry={currentCountry}
			onCountryChange={mockFunc}
		/>
	)
})

it("Displays Select Tag Correctly", () => {
	const { getByTestId } = render(
		<SideBarMonth
			countries={countries}
			currentCountry={currentCountry}
			onCountryChange={mockFunc}
			isComponentLoading={false}
		/>
	)
	expect(getByTestId("select")).toHaveValue("United States of America")
})

it("Changes Select Tag Correctly", () => {
	const { getByTestId } = render(
		<SideBarMonth
			countries={countries}
			currentCountry={currentCountry}
			onCountryChange={mockFunc}
			isComponentLoading={false}
		/>
	)
	fireEvent.change(getByTestId("select"), {
		target: { value: "United Kingdom" },
	})
	expect(mockFunc).toHaveBeenCalledTimes(1)
})

it("Displays Start Date Correctly", () => {
	const { getByTestId } = render(
		<SideBarMonth
			countries={countries}
			currentCountry={currentCountry}
			onCountryChange={mockFunc}
			startDate={"2020-02-01"}
			onStartDateChange={mockFunc}
			isComponentLoading={false}
		/>
	)
	expect(getByTestId("startDateInput")).toHaveValue("2020-02-01")
})

it("Changes Start Date Correctly", () => {
	const { getByTestId } = render(
		<SideBarMonth
			countries={countries}
			currentCountry={currentCountry}
			onCountryChange={mockFunc}
			startDate={"2020-02-01"}
			onStartDateChange={mockFunc}
			isComponentLoading={false}
		/>
	)
	fireEvent.change(getByTestId("startDateInput"), {
		target: { value: "2020-12-01" },
	})
	expect(mockFunc).toHaveBeenCalledTimes(1)
})

it("Displays End Date Correctly", () => {
	const { getByTestId } = render(
		<SideBarMonth
			countries={countries}
			currentCountry={currentCountry}
			onCountryChange={mockFunc}
			endDate={"2020-02-01"}
			onEndDateChange={mockFunc}
			isComponentLoading={false}
		/>
	)
	expect(getByTestId("endDateInput")).toHaveValue("2020-02-01")
})

it("Changes End Date Correctly", () => {
	const { getByTestId } = render(
		<SideBarMonth
			countries={countries}
			currentCountry={currentCountry}
			onCountryChange={mockFunc}
			endDate={"2020-02-01"}
			onEndDateChange={mockFunc}
			isComponentLoading={false}
		/>
	)
	fireEvent.change(getByTestId("endDateInput"), {
		target: { value: "2020-12-01" },
	})
	expect(mockFunc).toHaveBeenCalledTimes(1)
})

it("Sets minimum/maximum date correctly", () => {
	const { getByTestId } = render(
		<SideBarMonth
			countries={countries}
			currentCountry={currentCountry}
			onCountryChange={mockFunc}
			startDate={"2020-02-01"}
			endDate={"2020-12-02"}
			onStartDateChange={mockFunc}
			onEndDateChange={mockFunc}
			isComponentLoading={false}
		/>
	)
	expect(getByTestId("startDateInput").min).toBe("2020-01-22")
	expect(getByTestId("endDateInput").min).toBe("2020-01-22")
	expect(getByTestId("startDateInput").max).toBe(dateToday)
	expect(getByTestId("endDateInput").max).toBe(dateToday)
})

it("Clicks Search Button", () => {
	const { getByTestId } = render(
		<SideBarMonth
			countries={countries}
			currentCountry={currentCountry}
			onCountryChange={mockFunc}
			isComponentLoading={false}
			dateValidation={mockFunc}
		/>
	)
	fireEvent.click(getByTestId("search"))
	expect(mockFunc).toHaveBeenCalled()
})

it("Disables Input/Button/Select Fields", () => {
	const { getByTestId } = render(
		<SideBarMonth
			countries={countries}
			currentCountry={currentCountry}
			onCountryChange={mockFunc}
			isComponentLoading={true}
		/>
	)
	expect(getByTestId("select")).toBeDisabled()
	expect(getByTestId("startDateInput")).toBeDisabled()
	expect(getByTestId("endDateInput")).toBeDisabled()
	expect(getByTestId("search")).toBeDisabled()
})

it("Displays Spinner", () => {
	const { getByTestId } = render(
		<SideBarMonth
			countries={countries}
			currentCountry={currentCountry}
			onCountryChange={mockFunc}
			isComponentLoading={true}
			componentLoadSuccessful={false}
			data={data}
		/>
	)
	expect(getByTestId("spinner")).toBeInTheDocument()
})

it("Displays Failed To Load", () => {
	const { getByTestId } = render(
		<SideBarMonth
			countries={countries}
			currentCountry={currentCountry}
			onCountryChange={mockFunc}
			isComponentLoading={false}
			componentLoadSuccessful={false}
			data={data}
		/>
	)
	expect(getByTestId("conf")).toHaveTextContent("Failed to Load")
	expect(getByTestId("death")).toHaveTextContent("Failed to Load")
	expect(getByTestId("recov")).toHaveTextContent("Failed to Load")
})

it("Displays Data Correctly", () => {
	const { getByTestId } = render(
		<SideBarMonth
			countries={countries}
			currentCountry={currentCountry}
			onCountryChange={mockFunc}
			isComponentLoading={false}
			componentLoadSuccessful={true}
			data={data}
		/>
	)
	expect(getByTestId("conf")).toHaveTextContent("1000")
	expect(getByTestId("death")).toHaveTextContent("20")
	expect(getByTestId("recov")).toHaveTextContent("780")
})
