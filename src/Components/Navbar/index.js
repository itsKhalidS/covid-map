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
							<button
								className={
									this.state.isLoading ? "hidden auth-btn" : "auth-btn"
								}
								onClick={this.signUserOut}
								disabled={this.state.isLoading}
							>
								Sign Out
							</button>
						</div>
					)}
				</div>
			</div>
		)
	}
}
export default Navbar
