import React from "react"
import { scaleLinear } from "d3-scale"
import {
	ComposableMap,
	Geographies,
	Geography,
	ZoomableGroup,
	Sphere,
	Graticule,
} from "react-simple-maps"
import "./styles.css"

const MapChart = (props) => {
	const geoUrl =
		"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

	const deathPMScale = scaleLinear()
		.domain([0, 3500])
		.range(["#FFE1C3", "#CE0A05"])

	const confirmedPMScale = scaleLinear()
		.domain([0, 130000])
		.range(["#FFE1C3", "#CE0A05"])

	const totalCasesPerMillion = (totalCases, population) => {
		const result = (totalCases * 1000000) / population
		return confirmedPMScale(result)
	}

	const totalDeathsPerMillion = (totalDeaths, population) => {
		const r = (totalDeaths * 1000000) / population
		return deathPMScale(r)
	}

	return (
		<div className="map-container">
			<div className="button-container">
				<button
					className={props.plotCondition ? "button" : "button button-active"}
					onClick={props.plotByConfirmedCases}
				>
					Total Cases (per million)
				</button>
				<button
					className={props.plotCondition ? "button button-active" : "button"}
					onClick={props.plotByDeathCases}
				>
					Total Deaths (per million)
				</button>
			</div>

			<div className="color-palette-container">
				<div className="case-indicator">
					<span>Low</span>
					<span>High</span>
				</div>
				<div className="color-palette">
					<span className="span-1"></span>
					<span className="span-2"></span>
					<span className="span-3"></span>
					<span className="span-4"></span>
					<span className="span-5"></span>
					<span className="span-6"></span>
				</div>
			</div>

			<ComposableMap width={1145}>
				<ZoomableGroup
					center={[props.longitude, props.latitude]}
					zoom={props.zoom}
				>
					<Sphere stroke="#E4E5E6" strokeWidth={0.5} />
					<Graticule stroke="#E4E5E6" strokeWidth={0.5} />
					<Geographies geography={geoUrl}>
						{({ geographies }) =>
							geographies.map((geo) => {
								const d = props.countries.find(
									(s) => s.CountryCode === geo.properties.ISO_A2
								)
								const c = geo.properties.ISO_A2 === props.countryCode
								return (
									<Geography
										key={geo.rsmKey}
										geography={geo}
										stroke="#000000"
										strokeWidth={c ? 1.25 : 0.1}
										fill={
											d
												? props.plotCondition
													? totalDeathsPerMillion(
															d.TotalDeaths,
															geo.properties.POP_EST
													  )
													: totalCasesPerMillion(
															d.TotalConfirmed,
															geo.properties.POP_EST
													  )
												: "#FFFFFF"
										}
									/>
								)
							})
						}
					</Geographies>
				</ZoomableGroup>
			</ComposableMap>

			<p className="self">
				Designed and built by{" "}
				<a
					className="linkedin"
					href="https://www.linkedin.com/in/md-khalid-shahzad-7b63611b1"
					target="_blank"
					rel="noreferrer"
				>
					Md Khalid Shahzad
				</a>
			</p>
		</div>
	)
}
export default MapChart
