import React from "react"
import "./styles.css"

const Login = (props) => {
	return (
		<div className="form-container">
			<h4>Login</h4>
			<div
				data-testid="msg-cont"
				className={props.message ? "message" : "hide"}
			>
				{`* ${props.message}`}
			</div>
			<div className="input-div">
				<span>Email :</span>
				<input
					className="input-field"
					name="email"
					type="email"
					placeholder="Enter your Email"
					value={props.email}
					onChange={props.loginCredentialHandler}
				/>
			</div>
			<div className="input-div">
				<span>Password :</span>
				<input
					className="input-field"
					name="password"
					type="password"
					placeholder="Enter Password"
					value={props.password}
					onChange={props.loginCredentialHandler}
				/>
			</div>
			<button
				className={props.isLoading ? "page-btn disabled-btn" : "page-btn"}
				onClick={props.logInClick}
				disabled={props.isLoading}
			>
				Log In
			</button>
			<button
				name="reset"
				className={
					props.isLoading
						? "reset-page-taker disabled-reset-page-taker"
						: "reset-page-taker"
				}
				onClick={props.changeForm}
				disabled={props.isLoading}
			>
				Forgot Password ?
			</button>
			<div className="form-changer">
				Don't have an account ?{" "}
				<button
					className={
						props.isLoading ? "form-change-btn disabled-btn" : "form-change-btn"
					}
					name="signup"
					onClick={props.changeForm}
					disabled={props.isLoading}
				>
					Sign Up
				</button>
			</div>
		</div>
	)
}
export default Login
