import React from "react"
import "./styles.css"

const SideBarOverall = (props) => {
	return (
		<div className="container-fluid sideBar">
			<div className="sidebar-div">
				<h6>Select Country&nbsp;:</h6>
				{props.isLoading ? (
					<select className="country-dropdown">
						<option>Choose Country</option>
					</select>
				) : props.loadSuccessful ? (
					<select
						className="country-dropdown"
						value={props.currentCountry.Country}
						onChange={props.onCountryChange}
					>
						{props.countries.map((c) => {
							return (
								<option key={c.Country} value={c.Country}>
									{c.Country}
								</option>
							)
						})}
					</select>
				) : (
					<select className="country-dropdown">
						<option>Choose Country</option>
					</select>
				)}
			</div>
			<div className="sidebar-div">
				<p className="sidebar-cont-p">
					<span>Total Confirmed&nbsp;:</span>
					{props.isLoading ? (
						<span className="sidebar-num-cont">
							<span className="spinner-border spinner-border-sm text-dark"></span>
						</span>
					) : props.loadSuccessful ? (
						<span className="sidebar-num-cont">
							{props.currentCountry.TotalConfirmed}
						</span>
					) : (
						<span className="sidebar-num-cont">Failed to Load</span>
					)}
				</p>
			</div>
			<div className="sidebar-div">
				<p className="sidebar-cont-p">
					<span>New Confirmed&nbsp;:</span>
					{props.isLoading ? (
						<span className="sidebar-num-cont">
							<span className="spinner-border spinner-border-sm text-dark"></span>
						</span>
					) : props.loadSuccessful ? (
						<span className="sidebar-num-cont">
							{props.currentCountry.NewConfirmed}
						</span>
					) : (
						<span className="sidebar-num-cont">Failed to Load</span>
					)}
				</p>
			</div>
			<div className="sidebar-div">
				<p className="sidebar-cont-p">
					<span>Total Deaths&nbsp;:</span>
					{props.isLoading ? (
						<span className="sidebar-num-cont">
							<span className="spinner-border spinner-border-sm text-dark"></span>
						</span>
					) : props.loadSuccessful ? (
						<span className="sidebar-num-cont">
							{props.currentCountry.TotalDeaths}
						</span>
					) : (
						<span className="sidebar-num-cont">Failed to Load</span>
					)}
				</p>
			</div>
			<div className="sidebar-div">
				<p className="sidebar-cont-p">
					<span>New Deaths&nbsp;:</span>
					{props.isLoading ? (
						<span className="sidebar-num-cont">
							<span className="spinner-border spinner-border-sm text-dark"></span>
						</span>
					) : props.loadSuccessful ? (
						<span className="sidebar-num-cont">
							{props.currentCountry.NewDeaths}
						</span>
					) : (
						<span className="sidebar-num-cont">Failed to Load</span>
					)}
				</p>
			</div>
			<div className="sidebar-div">
				<p className="sidebar-cont-p">
					<span>Total Recovered&nbsp;:</span>
					{props.isLoading ? (
						<span className="sidebar-num-cont">
							<span className="spinner-border spinner-border-sm text-dark"></span>
						</span>
					) : props.loadSuccessful ? (
						<span className="sidebar-num-cont">
							{props.currentCountry.TotalRecovered}
						</span>
					) : (
						<span className="sidebar-num-cont">Failed to Load</span>
					)}
				</p>
			</div>
			<div className="sidebar-div">
				<p className="sidebar-cont-p">
					<span>New Recovered&nbsp;:</span>
					{props.isLoading ? (
						<span className="sidebar-num-cont">
							<span className="spinner-border spinner-border-sm text-dark"></span>
						</span>
					) : props.loadSuccessful ? (
						<span className="sidebar-num-cont">
							{props.currentCountry.NewRecovered}
						</span>
					) : (
						<span className="sidebar-num-cont">Failed to Load</span>
					)}
				</p>
			</div>
		</div>
	)
}
export default SideBarOverall
