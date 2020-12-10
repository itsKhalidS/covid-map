import React from "react"
import { render, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom"

import Body from "../index.js"
afterEach(cleanup)

jest.mock("../../AppHeader/index.js", () => () => (
	<div data-testid="app-header"></div>
))
jest.mock("../../SideBar/SideBarOverall.js", () => () => (
	<div data-testid="sidebar-overall"></div>
))
jest.mock("../../SideBar/SideBarMonth.js", () => () => (
	<div data-testid="sidebar-month"></div>
))
jest.mock("../../MapChart/index.js", () => () => (
	<div data-testid="mapchart"></div>
))
jest.mock("../../WatchList/index.js", () => () => (
	<div data-testid="watchlist"></div>
))

it("renders correctly", () => {
	render(<Body />)
})

it("renders App Header", () => {
	const { getByTestId } = render(<Body />)
	expect(getByTestId("app-header")).toBeInTheDocument()
})

it("renders Overall Side bar", () => {
	const { getByTestId } = render(<Body />)
	expect(getByTestId("sidebar-overall")).toBeInTheDocument()
})

it("renders WatchList", () => {
	const { getByTestId } = render(<Body />)
	expect(getByTestId("watchlist")).toBeInTheDocument()
})

it("renders Map Chart", () => {
	const { getByTestId } = render(<Body />)
	expect(getByTestId("mapchart")).toBeInTheDocument()
})

it("Disables Overall Sidebar Button", () => {
	const { getByText } = render(<Body />)
	expect(getByText("Overall Data")).toBeDisabled()
})

it("Disables Ranged Sidebar Button", () => {
	const { getByText } = render(<Body />)
	expect(getByText("Ranged Data")).toBeDisabled()
})
