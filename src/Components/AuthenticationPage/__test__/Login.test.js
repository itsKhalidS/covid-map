import React from "react"
import { render, cleanup, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"

import Login from "../Login.js"
afterEach(cleanup)

const email = "helloWorld"
const password = "helloWorld!"
const message = "helloWorld"
const mockFunc = jest.fn()

it("renders Login page", () => {
	render(<Login />)
})

it("Displays Email", () => {
	const { getByPlaceholderText } = render(
		<Login email={email} loginCredentialHandler={mockFunc} />
	)
	expect(getByPlaceholderText("Enter your Email")).toHaveValue(email)
})

it("Displays Password", () => {
	const { getByPlaceholderText } = render(
		<Login password={password} loginCredentialHandler={mockFunc} />
	)
	expect(getByPlaceholderText("Enter Password")).toHaveValue(password)
})

it(" Displays Message ", () => {
	const { getByTestId } = render(<Login message={message} />)
	expect(getByTestId("msg-cont")).toHaveTextContent(message)
})

it("Updates email", () => {
	const { getByPlaceholderText } = render(
		<Login email={email} loginCredentialHandler={mockFunc} />
	)
	fireEvent.change(getByPlaceholderText("Enter your Email"), {
		target: { value: "a" },
	})
	expect(mockFunc).toHaveBeenCalledTimes(1)
})

it("Updates Password", () => {
	const { getByPlaceholderText } = render(
		<Login password={password} loginCredentialHandler={mockFunc} />
	)
	fireEvent.change(getByPlaceholderText("Enter Password"), {
		target: { value: "a" },
	})
	expect(mockFunc).toHaveBeenCalledTimes(1)
})

it("Login Button works", () => {
	const { getByText } = render(
		<Login isLoading={false} logInClick={mockFunc} />
	)
	fireEvent.click(getByText("Log In"))
	expect(mockFunc).toHaveBeenCalledTimes(1)
})

it("Disables Login button", () => {
	const { getByText } = render(<Login isLoading={true} logInClick={mockFunc} />)
	expect(getByText("Log In")).toBeDisabled()
})

it("Sign Up Button works", () => {
	const { getByText } = render(
		<Login isLoading={false} changeForm={mockFunc} />
	)
	fireEvent.click(getByText("Sign Up"))
	expect(mockFunc).toHaveBeenCalledTimes(1)
})

it("Disables Sign Up button", () => {
	const { getByText } = render(<Login isLoading={true} changeForm={mockFunc} />)
	expect(getByText("Sign Up")).toBeDisabled()
})

it("Forgot Password Button works", () => {
	const { getByText } = render(
		<Login isLoading={false} changeForm={mockFunc} />
	)
	fireEvent.click(getByText("Forgot Password ?"))
	expect(mockFunc).toHaveBeenCalledTimes(1)
})

it("Disables Login button", () => {
	const { getByText } = render(<Login isLoading={true} changeForm={mockFunc} />)
	expect(getByText("Forgot Password ?")).toBeDisabled()
})
