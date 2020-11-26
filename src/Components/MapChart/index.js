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

  const MapChart = (props) => {
    const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

    const colorScale = scaleLinear()
    .domain([0, 13000000])
    .range(["#ffedea", "#ff0000"]);

    return (
        <div>
          <ComposableMap width={1050}>
            <ZoomableGroup center={[props.longitude,props.latitude]} zoom={props.zoom}>
            <Sphere stroke="#D2D3D4" strokeWidth={0.5}/>
            <Graticule stroke="#D2D3D4" strokeWidth={0.5} />
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map(geo => {
                    const d = props.countries.find((s) => s.CountryCode === geo.properties.ISO_A2);
                    const c = geo.properties.ISO_A2 === props.countryCode
                    return(
                        <Geography key={geo.rsmKey} geography={geo} stroke="#000000" strokeWidth={c ? 1.25 : 0.1 } 
                        fill={d?colorScale(d.TotalConfirmed):"#FFFFFF"}/>
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