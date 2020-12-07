import React from "react"
import "./styles.css"

const AppHeader = (props) => {
	return (
		<div className="container-fluid row app-header">
			<div className="col-lg-3 global-title-div">
				<h5>Global&nbsp;:</h5>
			</div>
			<div className="col-lg-9 global-data-cont">
				<div className="global-div">
					<span>
						Total
						<br />
						Confirmed&nbsp;:
					</span>
					{props.isLoading ? (
						<span className="global-num-cont">
							<span className="spinner-border spinner-border-sm text-dark"></span>
						</span>
					) : props.loadSuccessful ? (
						<span className="global-num-cont">{props.data.TotalConfirmed}</span>
					) : (
						<span className="global-num-cont">Failed to Load</span>
					)}
				</div>
				<div className="global-div">
					<span>
						New
						<br />
						Confirmed&nbsp;:
					</span>
					{props.isLoading ? (
						<span className="global-num-cont">
							<span className="spinner-border spinner-border-sm text-dark"></span>
						</span>
					) : props.loadSuccessful ? (
						<span className="global-num-cont">{props.data.NewConfirmed}</span>
					) : (
						<span className="global-num-cont">Failed to Load</span>
					)}
				</div>
				<div className="global-div">
					<span>
						Total
						<br />
						Deaths&nbsp;:
					</span>
					{props.isLoading ? (
						<span className="global-num-cont">
							<span className="spinner-border spinner-border-sm text-dark"></span>
						</span>
					) : props.loadSuccessful ? (
						<span className="global-num-cont">{props.data.TotalDeaths}</span>
					) : (
						<span className="global-num-cont">Failed to Load</span>
					)}
				</div>
				<div className="global-div">
					<span>
						New
						<br />
						Deaths&nbsp;:
					</span>
					{props.isLoading ? (
						<span className="global-num-cont">
							<span className="spinner-border spinner-border-sm text-dark"></span>
						</span>
					) : props.loadSuccessful ? (
						<span className="global-num-cont">{props.data.NewDeaths}</span>
					) : (
						<span className="global-num-cont">Failed to Load</span>
					)}
				</div>
				<div className="global-div">
					<span>
						Total
						<br />
						Recovered&nbsp;:
					</span>
					{props.isLoading ? (
						<span className="global-num-cont">
							<span className="spinner-border spinner-border-sm text-dark"></span>
						</span>
					) : props.loadSuccessful ? (
						<span className="global-num-cont">{props.data.TotalRecovered}</span>
					) : (
						<span className="global-num-cont">Failed to Load</span>
					)}
				</div>
				<div className="global-div">
					<span>
						New
						<br />
						Recovered&nbsp;:
					</span>
					{props.isLoading ? (
						<span className="global-num-cont">
							<span className="spinner-border spinner-border-sm text-dark"></span>
						</span>
					) : props.loadSuccessful ? (
						<span className="global-num-cont">{props.data.NewRecovered}</span>
					) : (
						<span className="global-num-cont">Failed to Load</span>
					)}
				</div>
			</div>
		</div>
	)
}
export default AppHeader
