import React from "react"
import WatchListCard from "./WatchListCard.js"
import fire from "../../Config/fire.js"
import "./styles.css"

class WatchList extends React.Component {
	_isMounted = false
	constructor(props) {
		super(props)
		this.state = {
			user: null,
			isLoading: props.isLoading,
			loadSuccessful: props.loadSuccessful,
			countries: props.countries,
			currentCountry: props.currentCountry,
			compLoading: false,
			compSuccess: false,
			showInput: false,
			watchList: [],
		}
	}
	static getDerivedStateFromProps(props, state) {
		if (props.isLoading !== state.isLoading) {
			return {
				isLoading: props.isLoading,
				loadSuccessful: props.loadSuccessful,
				countries: props.countries,
				currentCountry: props.currentCountry,
			}
		}
		return null
	}
	componentDidMount = () => {
		this._isMounted = true
		this.authListener()
	}
	componentWillUnmount = () => {
		this._isMounted = false
	}
	authListener = () => {
		this.setState({ compLoading: true })
		fire.auth().onAuthStateChanged((user) => {
			if (user) {
				this.retrieveData(user)
			} else {
				if (this._isMounted) {
					this.setState({
						compLoading: false,
						compSuccess: true,
						user: null,
					})
				}
			}
		})
	}
	retrieveData = (user) => {
		const readRef = fire.database().ref(user.uid)
		readRef.on("value", (snapshot) => {
			const watchCountries = []
			const response = snapshot.val()
			for (let id in response) {
				watchCountries.push({ id, ...response[id] })
			}
			if (this._isMounted) {
				this.setState({
					compLoading: false,
					compSuccess: true,
					user: user,
					watchList: watchCountries,
				})
			}
		})
	}
	databasePush = () => {
		if (
			this.state.watchList.find(
				(s) => s.Country === this.state.currentCountry.Country
			)
		) {
			this.setState({ showInput: false })
			return
		}
		const databaseRef = fire.database().ref(this.state.user.uid)
		const watchCountry = {
			Country: this.state.currentCountry.Country,
			CountryCode: this.state.currentCountry.CountryCode,
		}
		databaseRef.push(watchCountry)
		this.setState({ showInput: false })
	}
	deleteWatchCountry = (country) => {
		const databaseRef = fire
			.database()
			.ref(this.state.user.uid)
			.child(country.id)
		databaseRef.remove()
	}
	changeShowInputStatus = (event) => {
		if (event.target.name === "add") {
			this.setState({ showInput: true })
		} else {
			this.setState({ showInput: false })
		}
	}
	handleChange = (event) => {
		const countryData = this.state.countries.find(
			(s) => s.Country === event.target.value
		)
		this.setState({ currentCountry: countryData })
	}
	render = () => {
		return (
			<div className="watch-list">
				<h6>WatchList</h6>
				{this.state.user === null ||
				this.state.isLoading ||
				this.state.compLoading ||
				this.state.loadSuccessful === false ? (
					<div className="card-cont">
						<button
							data-testid="initial-add-country"
							className={
								this.state.isLoading ||
								this.state.compLoading ||
								this.state.loadSuccessful === false
									? "watch-list-card disable-button"
									: "watch-list-card c-blue"
							}
							onClick={() => {
								this.props.changeLoginStatus(true)
							}}
							disabled={
								this.state.isLoading ||
								this.state.compLoading ||
								this.state.loadSuccessful === false
							}
						>
							Add <br /> Country
							<br /> +
						</button>
					</div>
				) : this.state.showInput ? (
					<div className="country-drop-cont">
						<select
							className="country-dropdown"
							value={this.state.currentCountry.Country}
							onChange={this.handleChange}
						>
							{this.state.countries.map((c) => {
								return (
									<option key={c.Country} value={c.Country}>
										{c.Country}
									</option>
								)
							})}
						</select>
						<div className="db-add-btn-cont">
							<button
								name="cancel"
								className="db-add-btn"
								onClick={this.changeShowInputStatus}
							>
								Cancel
							</button>
							<button onClick={this.databasePush} className="db-add-btn">
								Add
							</button>
						</div>
					</div>
				) : (
					<div className="card-cont">
						{this.state.watchList.map((country) => {
							return (
								<WatchListCard
									key={country.Country}
									country={country}
									countries={this.state.countries}
									onCountryChange={this.props.onCountryChange}
									deleteWatchCountry={this.deleteWatchCountry}
									changeToOverallSidebar={this.props.changeToOverallSidebar}
								/>
							)
						})}
						<button
							name="add"
							className={
								this.state.watchList.length < 3
									? "watch-list-card c-blue"
									: "d-none"
							}
							onClick={this.changeShowInputStatus}
						>
							Add <br /> Country
							<br /> +
						</button>
					</div>
				)}
			</div>
		)
	}
}
export default WatchList
