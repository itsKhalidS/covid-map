import React from "react"
import "./styles.css"

const SideBarMonth = (props) => {
	return (
		<div className="container-fluid sideBar">
			<div className="sidebar-div">
				<h6>Select Country&nbsp;:</h6>
				<select
					data-testid="select"
					className="country-dropdown"
					disabled={props.isComponentLoading}
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
			</div>
			<div className="sidebar-div">
				<span>From&nbsp;:</span>
				<input
					data-testid="startDateInput"
					className="sidebar-input"
					type="date"
					min="2020-01-22"
					max={`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
						new Date().getDate() < 9
							? "0" + new Date().getDate()
							: new Date().getDate()
					}`}
					value={props.startDate}
					onChange={props.onStartDateChange}
					disabled={props.isComponentLoading}
				/>
			</div>
			<div className="sidebar-div">
				<span>To&nbsp;:</span>
				<input
					data-testid="endDateInput"
					className="sidebar-input"
					type="date"
					min="2020-01-22"
					max={`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
						new Date().getDate() < 9
							? "0" + new Date().getDate()
							: new Date().getDate()
					}`}
					value={props.endDate}
					onChange={props.onEndDateChange}
					disabled={props.isComponentLoading}
				/>
			</div>
			<div className="sidebar-div">
				<button
					data-testid="search"
					className="sidebar-button"
					disabled={props.isComponentLoading}
					onClick={props.dateValidation}
				>
					Search
				</button>
			</div>
			<div className="sidebar-div">
				<p className="sidebar-cont-p">
					<span>Confirmed&nbsp;:</span>
					{props.isComponentLoading ? (
						<span data-testid="conf" className="sidebar-num-cont">
							<span className="spinner-border spinner-border-sm text-dark"></span>
						</span>
					) : props.componentLoadSuccessful ? (
						<span data-testid="conf" className="sidebar-num-cont">
							{props.data.confirmed}
						</span>
					) : (
						<span data-testid="conf" className="sidebar-num-cont">
							Failed to Load
						</span>
					)}
				</p>
			</div>
			<div className="sidebar-div">
				<p className="sidebar-cont-p">
					<span>Deaths&nbsp;:</span>
					{props.isComponentLoading ? (
						<span data-testid="death" className="sidebar-num-cont">
							<span className="spinner-border spinner-border-sm text-dark"></span>
						</span>
					) : props.componentLoadSuccessful ? (
						<span data-testid="death" className="sidebar-num-cont">
							{props.data.dead}
						</span>
					) : (
						<span data-testid="death" className="sidebar-num-cont">
							Failed to Load
						</span>
					)}
				</p>
			</div>
			<div className="sidebar-div">
				<p className="sidebar-cont-p">
					<span>Recoveries&nbsp;:</span>
					{props.isComponentLoading ? (
						<span data-testid="recov" className="sidebar-num-cont">
							<span
								data-testid="spinner"
								className="spinner-border spinner-border-sm text-dark"
							></span>
						</span>
					) : props.componentLoadSuccessful ? (
						<span data-testid="recov" className="sidebar-num-cont">
							{props.data.recovered}
						</span>
					) : (
						<span data-testid="recov" className="sidebar-num-cont">
							Failed to Load
						</span>
					)}
				</p>
			</div>
		</div>
	)
}
export default SideBarMonth
