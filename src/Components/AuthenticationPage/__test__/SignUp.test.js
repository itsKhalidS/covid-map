import React from "react"
import { render, cleanup, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"

import SignUp from "../SignUp.js"
afterEach(cleanup)

const email = "helloWorld"
const password = "helloWorld!"
const message = "helloWorld"
const mockFunc = jest.fn()

it("Renders SignUp Component", () => {
	render(<SignUp />)
})

it("Displays Email", () => {
	const { getByPlaceholderText } = render(
		<SignUp email={email} loginCredentialHandler={mockFunc} />
	)
	expect(getByPlaceholderText("Enter your Email")).toHaveValue(email)
})

it("Updates email", () => {
	const { getByPlaceholderText } = render(
		<SignUp email={email} loginCredentialHandler={mockFunc} />
	)
	fireEvent.change(getByPlaceholderText("Enter your Email"), {
		target: { value: "a" },
	})
	expect(mockFunc).toHaveBeenCalledTimes(1)
})

it("Displays Password", () => {
	const { getByPlaceholderText } = render(
		<SignUp password={password} loginCredentialHandler={mockFunc} />
	)
	expect(getByPlaceholderText("Enter Password")).toHaveValue(password)
})

it("Updates Password", () => {
	const { getByPlaceholderText } = render(
		<SignUp password={password} loginCredentialHandler={mockFunc} />
	)
	fireEvent.change(getByPlaceholderText("Enter Password"), {
		target: { value: "a" },
	})
	expect(mockFunc).toHaveBeenCalledTimes(1)
})

it("Displays Confirm Password", () => {
	const { getByPlaceholderText } = render(
		<SignUp password2={password} loginCredentialHandler={mockFunc} />
	)
	expect(getByPlaceholderText("Re-enter Password")).toHaveValue(password)
})

it("Updates Confirm Password field", () => {
	const { getByPlaceholderText } = render(
		<SignUp password={password} loginCredentialHandler={mockFunc} />
	)
	fireEvent.change(getByPlaceholderText("Re-enter Password"), {
		target: { value: "a" },
	})
	expect(mockFunc).toHaveBeenCalledTimes(1)
})

it(" Displays Message ", () => {
	const { getByTestId } = render(<SignUp message={message} />)
	expect(getByTestId("msg-cont")).toHaveTextContent(message)
})

it("Sign Up Button works", () => {
	const { getByTestId } = render(
		<SignUp isLoading={false} signUpClick={mockFunc} />
	)
	fireEvent.click(getByTestId("sign-up-btn"))
	expect(mockFunc).toHaveBeenCalledTimes(1)
})

it("Disables Sign Up button", () => {
	const { getByTestId } = render(
		<SignUp isLoading={true} signUpClick={mockFunc} />
	)
	expect(getByTestId("sign-up-btn")).toBeDisabled()
})

it("Login Button works", () => {
	const { getByText } = render(
		<SignUp isLoading={false} changeForm={mockFunc} />
	)
	fireEvent.click(getByText("Log In"))
	expect(mockFunc).toHaveBeenCalledTimes(1)
})

it("Disables Login button", () => {
	const { getByText } = render(
		<SignUp isLoading={true} changeForm={mockFunc} />
	)
	expect(getByText("Log In")).toBeDisabled()
})
