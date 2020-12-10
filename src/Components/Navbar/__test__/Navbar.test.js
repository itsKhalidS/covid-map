import React from "react"
import { render, cleanup, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"

import Navbar from "../index.js"
afterEach(cleanup)

const mockFunc = jest.fn()

const user = { email: "helloWorld" }
it("renders Navbar", () => {
	render(<Navbar isLoading={false} user={user} />)
})

it("Shows Login button", () => {
	const { getByTestId } = render(<Navbar isLoading={false} user={null} />)
	expect(getByTestId("loginBtn")).toBeInTheDocument()
})

it("Shows signout buttons", () => {
	const { getByTestId } = render(<Navbar isLoading={false} user={user} />)
	expect(getByTestId("signOutButtonsCont")).toBeInTheDocument()
})

it("Displays username correctly", () => {
	const { getByTestId } = render(<Navbar isLoading={false} user={user} />)
	expect(getByTestId("nameDisplay")).toHaveTextContent(/Hi, helloW../i)
})

it("hides Login when loading", () => {
	const { getByText } = render(<Navbar isLoading={true} user={null} />)
	expect(getByText("Login or Sign Up")).toHaveClass("hidden")
})

it("hides  Sign Out when loading", () => {
	const { getByText } = render(<Navbar isLoading={true} user={user} />)
	expect(getByText("Sign Out")).toHaveClass("hidden")
	expect(getByText("Delete Account")).toHaveClass("hidden")
})

it("Login Button Works", () => {
	const { getByText } = render(
		<Navbar isLoading={false} user={null} changeLoginStatus={mockFunc} />
	)
	fireEvent.click(getByText("Login or Sign Up"))
	expect(mockFunc).toHaveBeenCalled()
	expect(mockFunc).toHaveBeenCalledWith(true)
})
