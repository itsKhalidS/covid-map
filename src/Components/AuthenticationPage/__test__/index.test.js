import React from "react"
import { render, cleanup, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"

import AuthenticationPage from "../index.js"
afterEach(cleanup)

jest.mock("../Login.js", () => () => <div data-testid="loginPage"></div>)
const mockFunc = jest.fn()

it("renders Authentication Page", () => {
	render(<AuthenticationPage />)
})

it("Displays Login Page Initially", () => {
	const { getByTestId } = render(<AuthenticationPage />)
	expect(getByTestId("loginPage")).toBeInTheDocument()
})

it("Displays App Logo ", () => {
	const { container } = render(<AuthenticationPage />)
	expect(container.querySelector(".app-img")).toBeInTheDocument()
})

it("Home Button Works", () => {
	const { container } = render(
		<AuthenticationPage changeLoginStatus={mockFunc} />
	)
	fireEvent.click(container.querySelector(".home-btn"))
	expect(mockFunc).toHaveBeenCalled()
	expect(mockFunc).toHaveBeenCalledWith(false)
})
