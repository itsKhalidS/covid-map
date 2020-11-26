import React from "react"
import "./styles.css"
import AppHeader from "../AppHeader/index.js"
import SideBar from "../SideBar/index.js"
import MapChart from "../MapChart/index.js";

class Background extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            loadSuccessful: false,
            global:{},
            countries: [],
            currrentCountry: {},
            coordinates:[],
            countryCode:"",
            latitude:0,
            longitude:0,
            zoom:1.12,
            plotCondition: 0
        }
    }

    componentDidMount = () => {
        this.fetchData();
    }

    fetchData = () => {
        const url="https://api.covid19api.com/summary"
        this.setState({isLoading:true})
        fetch(url,{
            method: "GET"
        }).then((response) => {
            return response.json()
        }).then((result) => {
            this.fetchLatitudeLongitude(result)
        }).catch((error) => {
            alert("Failed to retrieve data from server\nPlease check your Internet connection and try again");
            this.setState({
                isLoading: false,
                loadSuccessful: false
            })
        })
    }
    
    fetchLatitudeLongitude = (result) => {
        let countryData={},newCoordinates=[]
        const url_latLon="https://www.trackcorona.live/api/countries"
        fetch(url_latLon,{
            method:"GET"
        }).then((response) => {
            return response.json()
        }).then((res) => {            
            newCoordinates=res.data.map((country) => {
                return {
                    CountryCode: country.country_code.toUpperCase(),
                    Latitude: country.latitude,
                    Longitude: country.longitude
                }
            })
            countryData=result.Countries.find((s)=>s.Country==="United States of America")
            this.setState({
                isLoading:false,
                loadSuccessful: true,
                global:result.Global,
                countries:result.Countries,
                currrentCountry:countryData,
                coordinates:newCoordinates
            })
        })        
        .catch((error) => {
            alert("Failed to retrieve data from server\nPlease check your Internet connection and try again");
            this.setState({
                isLoading: false,
                loadSuccessful: false
            })
        })
    }

    changeCoordinates= (c) => { 
        const d=this.state.coordinates.find((s) => s.CountryCode===c.CountryCode)
        console.log("changeCoordinatesCalled",c,d)
        if(d){
            this.setState({
                countryCode: d.CountryCode,
                latitude: d.Latitude,
                longitude: d.Longitude,
                zoom:3
            })
        }else{
            this.setState({
                countryCode: "",
                latitude: 0,
                longitude: 0,
                zoom: 1.12
            })
        }
    }

    plotByDeathCases = (e) => {
        if(this.state.plotCondition !== 1){
            this.setState({
                plotCondition: 1
            })
        }
    }
    plotByConfirmedCases = (e) => {
        if(this.state.plotCondition !== 0){
            this.setState({
                plotCondition: 0
            })
        }
    }

    render = () => {        
        return(            
            <div className="container-fluid app-background">
                <AppHeader 
                    isLoading={this.state.isLoading} 
                    loadSuccessful={this.state.loadSuccessful} 
                    data={this.state.global}
                />
                <div className="row app-body-cont">
                    <div className="col-md-3 country-cont">
                        <SideBar isLoading={this.state.isLoading} 
                            loadSuccessful={this.state.loadSuccessful}
                            countries={this.state.countries}
                            currrentCountry={this.state.currrentCountry}
                            changeCoordinates={this.changeCoordinates}
                        />
                    </div>
                    <div className="col-md-9 map-cont"><MapChart countries={this.state.countries}
                                                        countryCode={this.state.countryCode}
                                                        latitude={this.state.latitude}
                                                        longitude={this.state.longitude}
                                                        zoom={this.state.zoom}
                                                        plotByConfirmedCases={this.plotByConfirmedCases}
                                                        plotByDeathCases={this.plotByDeathCases}
                                                        plotCondition={this.state.plotCondition}
                                                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default Background;