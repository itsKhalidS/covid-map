import React from "react"
import "./styles.css"
import AppHeader from "../AppHeader/index.js"
import SideBar from "../SideBar/index.js"
class Background extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            loadSuccessful: false,
            global:{},
            countries: [],
            currrentCountry: {}
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
            let countryData={},i
            for(i=0;i<result.Countries.length;i++)
            {
                if(result.Countries[i].Country==="United States of America")
                {
                    countryData=result.Countries[i];
                    break;
                }
            }
            this.setState({
                isLoading:false,
                loadSuccessful: true,
                global:result.Global,
                countries:result.Countries,
                currrentCountry:countryData
            })
        }).catch((error) => {
            alert("Failed to retrieve data from server\nPlease check your Internet connection and try again");
            this.setState({
                isLoading: false,
                loadSuccessful: false
            })
        })
    }    
    render = () => {
        
        return(            
            <div className="container-fluid app-background">
                <AppHeader isLoading={this.state.isLoading} loadSuccessful={this.state.loadSuccessful} data={this.state.global}/>
                <div className="row app-body-cont">
                    <div className="col-md-3 country-cont">
                        <SideBar isLoading={this.state.isLoading} 
                            loadSuccessful={this.state.loadSuccessful}
                            countries={this.state.countries}
                            currrentCountry={this.state.currrentCountry}
                        />
                    </div>
                    <div className="col-md-9 map-cont"></div>
                </div>
            </div>
        )
    }
}
export default Background;