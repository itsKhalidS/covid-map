import React from "react"
import "./styles.css"

const WatchListCard = (props) => {
	const showCurrentData = () => {
		const data = props.countries.find(
			(s) => s.Country === props.country.Country
		)
		return data.TotalConfirmed
	}
	const onDeleteClick = () => {
		props.deleteWatchCountry(props.country)
	}
	return (
		<div
			className="watch-list-card"
			onClick={() => {
				props.onCountryChange({
					target: { value: props.country.Country },
				})
			}}
		>
			<button className="delete-btn" onClick={onDeleteClick}>
				&times;
			</button>
			{props.country.Country.length > 8
				? `${props.country.Country.substring(0, 6)}...`
				: props.country.Country}
			<br />({props.country.CountryCode})
			<br />
			<span className="danger">{showCurrentData()}</span>
		</div>
	)
}
export default WatchListCard
