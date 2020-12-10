import React from "react"
import Navbar from "../Navbar/index.js"
import Body from "../Body/index.js"
import AuthenticationPage from "../AuthenticationPage/index.js"
import fire from "../../Config/fire.js"

class Background extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: false,
			user: null,
			showLogin: false,
		}
	}
	componentDidMount = () => {
		this.authListener()
	}
	authListener = () => {
		this.setState({ isLoading: true })
		fire.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					isLoading: false,
					user: user,
				})
			} else {
				this.setState({
					isLoading: false,
					user: null,
				})
			}
		})
	}
	changeLoginStatus = (val) => {
		this.setState({
			showLogin: val,
		})
	}
	render = () => {
		return (
			<div>
				{this.state.showLogin ? (
					<AuthenticationPage changeLoginStatus={this.changeLoginStatus} />
				) : (
					<>
						<Navbar
							isLoading={this.state.isLoading}
							user={this.state.user}
							changeLoginStatus={this.changeLoginStatus}
						/>
						<Body changeLoginStatus={this.changeLoginStatus} />
					</>
				)}
			</div>
		)
	}
}
export default Background
