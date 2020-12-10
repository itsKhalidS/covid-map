import React from "react"
import { render, cleanup, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"

import ResetPassword from "../ResetPassword.js"
afterEach(cleanup)

const email = "helloWorld"
const message = "helloWorld"
const mockFunc = jest.fn()

it("Renders Reset Password Page", () => {
	render(<ResetPassword />)
})

it("Displays Email", () => {
	const { getByPlaceholderText } = render(
		<ResetPassword email={email} loginCredentialHandler={mockFunc} />
	)
	expect(getByPlaceholderText("Enter your Email")).toHaveValue(email)
})

it(" Displays Message ", () => {
	const { getByTestId } = render(<ResetPassword message={message} />)
	expect(getByTestId("msg-cont")).toHaveTextContent(message)
})

it("Updates email", () => {
	const { getByPlaceholderText } = render(
		<ResetPassword email={email} loginCredentialHandler={mockFunc} />
	)
	fireEvent.change(getByPlaceholderText("Enter your Email"), {
		target: { value: "a" },
	})
	expect(mockFunc).toHaveBeenCalledTimes(1)
})

it("Password Reset Button works", () => {
	const { getByText } = render(
		<ResetPassword isLoading={false} resetClick={mockFunc} />
	)
	fireEvent.click(getByText("Send Password Reset Link"))
	expect(mockFunc).toHaveBeenCalledTimes(1)
})

it("Cancel Button works", () => {
	const { getByText } = render(
		<ResetPassword isLoading={false} changeForm={mockFunc} />
	)
	fireEvent.click(getByText("Cancel"))
	expect(mockFunc).toHaveBeenCalledTimes(1)
})

it("Disables Password Reset button", () => {
	const { getByText } = render(
		<ResetPassword isLoading={true} resetClick={mockFunc} />
	)
	expect(getByText("Send Password Reset Link")).toBeDisabled()
})

it("Disables Cancel button", () => {
	const { getByText } = render(
		<ResetPassword isLoading={true} changeForm={mockFunc} />
	)
	expect(getByText("Cancel")).toBeDisabled()
})
