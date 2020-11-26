import React from "react";
import { scaleLinear } from "d3-scale";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup,
    Sphere,
    Graticule
  } from "react-simple-maps";
import "./styles.css"

  const MapChart = (props) => {
    const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

    const deathPMScale = scaleLinear()
    .domain([0, 1500])
    .range(["#FFE1C3", "#CE0A05"]);

    const confirmedPMScale = scaleLinear()
    .domain([0, 55000])
    .range(["#FFE1C3", "#CE0A05"]);

    const totalCasesPerMillion = (totalCases,population,code) => {
      const result=totalCases*1000000/population
      console.log(code," total cases per million ---->",result)
      return(confirmedPMScale(result))
    }

    const totalDeathsPerMillion = (totalDeaths,population,c) => {
      const r=totalDeaths*1000000/population
      console.log(c,"total DEATHS per million---->",r)
      return(deathPMScale(r))
    }

    return (
        <div className="map-container">
          <div className="button-container">
            <button 
              className={props.plotCondition?"button":"button button-active"}
              onClick={props.plotByConfirmedCases}>
                Total Cases (per million)
            </button>
            <button 
              className={props.plotCondition?"button button-active":"button"}
              onClick={props.plotByDeathCases}>
                Total Deaths (per million)
            </button>
          </div>
          <ComposableMap width={1050}>
            <ZoomableGroup center={[props.longitude,props.latitude]} zoom={props.zoom}>
            <Sphere stroke="#E4E5E6" strokeWidth={0.5}/>
            <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const d = props.countries.find((s) => s.CountryCode === geo.properties.ISO_A2);
                    const c = geo.properties.ISO_A2 === props.countryCode
                    return(
                        <Geography key={geo.rsmKey} geography={geo} stroke="#000000" strokeWidth={c ? 1.25 : 0.1 } 
                        fill={d?(
                            (props.plotCondition)?(totalDeathsPerMillion(d.TotalDeaths,geo.properties.POP_EST,geo.properties.ISO_A2))
                            :(totalCasesPerMillion(d.TotalConfirmed,geo.properties.POP_EST,geo.properties.ISO_A2)))
                          :"#FFFFFF"}/>
                    )
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      );

  }

  export default MapChart;