import React from "react"
import "./styles.css"

const SignUp = (props) => {
	return (
		<div className="form-container">
			<h4>Sign Up</h4>
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
			<div className="input-div">
				<span>Confirm Password :</span>
				<input
					className="input-field"
					name="password2"
					type="password"
					placeholder="Re-enter Password"
					value={props.password2}
					onChange={props.loginCredentialHandler}
				/>
			</div>
			<button
				data-testid="sign-up-btn"
				className={props.isLoading ? "page-btn disabled-btn" : "page-btn"}
				onClick={props.signUpClick}
				disabled={props.isLoading}
			>
				Sign Up
			</button>
			<div className="form-changer">
				Already have an account ?{" "}
				<button
					className={
						props.isLoading ? "form-change-btn disabled-btn" : "form-change-btn"
					}
					name="login"
					onClick={props.changeForm}
					disabled={props.isLoading}
				>
					Log In
				</button>
			</div>
		</div>
	)
}
export default SignUp
