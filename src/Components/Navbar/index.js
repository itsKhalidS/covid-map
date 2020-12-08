import React from "react"
import fire from "../../Config/fire.js"
import "./styles.css"

class Navbar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: props.isLoading,
			user: props.user,
		}
	}
	static getDerivedStateFromProps(props, state) {
		if (props.user !== state.user || props.isLoading !== state.isLoading) {
			return {
				isLoading: props.isLoading,
				user: props.user,
			}
		}
		return null
	}
	signUserOut = () => {
		fire.auth().signOut()
	}
	deleteUser = () => {
		if (
			window.confirm(
				"Deleting your account will delete all your data including your Watch List"
			)
		) {
			const uid = this.state.user.uid
			let user = fire.auth().currentUser
			user
				.delete()
				.then(() => {
					const dbRef = fire.database().ref(uid)
					dbRef.remove()
					alert("Your Account has been permanantly deleted")
				})
				.catch(() => {
					alert(
						"There was an error while deleting your account\nTry re-logging in to complete request"
					)
				})
		}
	}
	render = () => {
		return (
			<div className="my-navbar">
				<div className="app-brand">
					<img
						className="app-logo"
						src="../../../covid-app-logo.png"
						alt="App Logo"
					/>
					Covid-19&nbsp;Tracker
				</div>
				<div>
					{this.state.user === null ? (
						<button
							className={this.state.isLoading ? "hidden auth-btn" : "auth-btn"}
							onClick={() => {
								this.props.changeLoginStatus(true)
							}}
							disabled={this.state.isLoading}
						>
							Login or Sign Up
						</button>
					) : (
						<div>
							<span className="welcome-cont">
								Hi, {this.state.user.email.slice(0, 7) + ".."}
							</span>
							<button
								className={
									this.state.isLoading ? "hidden auth-btn" : "auth-btn"
								}
								onClick={this.signUserOut}
								disabled={this.state.isLoading}
							>
								Sign Out
							</button>
							<button
								className={
									this.state.isLoading
										? "hidden auth-btn delete-user"
										: "auth-btn delete-user"
								}
								onClick={this.deleteUser}
								disabled={this.state.isLoading}
							>
								Delete Account
							</button>
						</div>
					)}
				</div>
			</div>
		)
	}
}
export default Navbar
