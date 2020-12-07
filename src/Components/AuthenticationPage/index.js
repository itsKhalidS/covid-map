import React from "react"
import fire from "../../Config/fire.js"
import Login from "./Login.js"
import SignUp from "./SignUp.js"
import ResetPassword from "./ResetPassword.js"
import "./styles.css"

class AuthenticationPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: false,
			email: "",
			password: "",
			password2: "",
			message: "",
			pageStatus: 1,
		}
	}
	loginCredentialHandler = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		})
	}
	logInClick = (event) => {
		event.preventDefault()
		this.setState({ isLoading: true })
		fire
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then(() => {
				this.setState({ isLoading: false })
				this.props.changeLoginStatus(false)
			})
			.catch((error) => {
				let msg = ""
				switch (error.code) {
					case "auth/invalid-email":
						msg = "Invalid email address"
						break
					case "auth/wrong-password":
						msg = "Incorrect Password"
						break
					default:
						msg = "User not found"
						break
				}
				this.setState({
					isLoading: false,
					password: "",
					password2: "",
					message: msg,
				})
			})
	}
	signUpClick = (event) => {
		event.preventDefault()
		if (this.state.password === this.state.password2) {
			this.setState({ isLoading: true })
			fire
				.auth()
				.createUserWithEmailAndPassword(this.state.email, this.state.password)
				.then(() => {
					this.setState({ isLoading: false })
					this.props.changeLoginStatus(false)
				})
				.catch((error) => {
					let msg = ""
					switch (error.code) {
						case "auth/email-already-in-use":
							msg = "This Email Address is already in use"
							break
						case "auth/invalid-email":
							msg = "Invalid Email Address"
							break
						case "auth/weak-password":
							msg =
								"The Password which you have entered is too weak. Passwods should have at least 6 characters and may also contain numbers and symbols"
							break
						default:
							msg = "There was an error during Signing Up"
							break
					}
					this.setState({
						isLoading: false,
						password: "",
						password2: "",
						message: msg,
					})
				})
		} else {
			this.setState({
				password: "",
				password2: "",
				message: "The Passwords don't match",
			})
		}
	}
	resetClick = (event) => {
		event.preventDefault()
		this.setState({ isLoading: true })
		fire
			.auth()
			.sendPasswordResetEmail(this.state.email)
			.then(() => {
				this.setState({
					isLoading: false,
					email: "",
					message: "A password reset link has been sent to your email",
				})
			})
			.catch(() => {
				this.setState({
					isLoading: false,
					email: "",
					message: "Invalid Email Address / User not found",
				})
			})
	}
	changeForm = (event) => {
		let newPageStatus
		if (event.target.name === "login") {
			newPageStatus = 1
		}
		if (event.target.name === "signup") {
			newPageStatus = 2
		}
		if (event.target.name === "reset") {
			newPageStatus = 3
		}
		this.setState({
			pageStatus: newPageStatus,
			email: "",
			password: "",
			password2: "",
			message: "",
		})
	}
	render = () => {
		return (
			<div>
				<div className="nav">
					<div className="app-name">
						<img
							className="app-img"
							src="../../../covid-app-logo.png"
							alt="App Logo"
						/>
						Covid-19&nbsp;Tracker
					</div>
					<div>
						<button
							className="home-btn"
							onClick={() => {
								this.props.changeLoginStatus(false)
							}}
						>
							Home
						</button>
					</div>
				</div>
				<div className="page-body">
					{this.state.pageStatus === 1 ? (
						<Login
							isLoading={this.state.isLoading}
							email={this.state.email}
							password={this.state.password}
							message={this.state.message}
							loginCredentialHandler={this.loginCredentialHandler}
							logInClick={this.logInClick}
							changeForm={this.changeForm}
						/>
					) : this.state.pageStatus === 2 ? (
						<SignUp
							isLoading={this.state.isLoading}
							email={this.state.email}
							password={this.state.password}
							password2={this.state.password2}
							message={this.state.message}
							loginCredentialHandler={this.loginCredentialHandler}
							signUpClick={this.signUpClick}
							changeForm={this.changeForm}
						/>
					) : (
						<ResetPassword
							isLoading={this.state.isLoading}
							message={this.state.message}
							email={this.state.email}
							loginCredentialHandler={this.loginCredentialHandler}
							changeForm={this.changeForm}
							resetClick={this.resetClick}
						/>
					)}
				</div>
			</div>
		)
	}
}
export default AuthenticationPage
