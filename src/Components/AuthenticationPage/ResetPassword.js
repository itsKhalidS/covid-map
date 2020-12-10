import React from "react"
import "./styles.css"

const ResetPassword = (props) => {
	return (
		<div className="form-container">
			<h4>Trouble Logging In</h4>
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
			<div className="reset-page-btn-cont">
				<button
					className={props.isLoading ? "page-btn disabled-btn" : "page-btn"}
					onClick={props.resetClick}
					disabled={props.isLoading}
				>
					Send Password Reset Link
				</button>
				<button
					className={props.isLoading ? "page-btn disabled-btn" : "page-btn"}
					name="login"
					onClick={props.changeForm}
					disabled={props.isLoading}
				>
					Cancel
				</button>
			</div>
		</div>
	)
}
export default ResetPassword
