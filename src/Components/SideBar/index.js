import React from "react"
import "./styles.css"

class SideBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: props.isLoading,
            loadSuccessful: props.loadSuccessful,
            countries: props.countries,
            currrentCountry: props.currrentCountry
        }
    }
    static getDerivedStateFromProps(props,state){
        if(props.isLoading === state.isLoading){
            return null;
        }
        else{
            return{
                isLoading: props.isLoading,
                loadSuccessful: props.loadSuccessful,
                countries: props.countries,
                currrentCountry: props.currrentCountry
            }
        }
    }
    onCountryChange = (event) => {
        let countryData={}
        let L=0,U=this.state.countries.length-1,mid
            while(L<=U)
            {
                mid=Math.floor((L+U)/2)
                if(event.target.value>this.state.countries[mid].Country){
                    L=mid+1
                }
                else if(event.target.value<this.state.countries[mid].Country){
                    U=mid-1
                }
                else{
                    countryData=this.state.countries[mid];
                    break;  
                }
            }            
            this.setState({
                currrentCountry:countryData
            })
            this.props.changeCoordinates(countryData)
    }    
    render = () => {
        return(
            <div className="container-fluid sideBar">
                <div className="sidebar-div">
                    <h6>Select Country&nbsp;:</h6>            
                    {this.state.isLoading ? (
                        <select className="country-dropdown">
                            <option>Choose Country</option>
                        </select>                
                     )
                     :(this.state.loadSuccessful?(
                        <select className="country-dropdown" value={this.state.currrentCountry.Country}  onChange={this.onCountryChange}>
                            {
                                this.state.countries.map((c) => {
                                    return <option key={c.Country} value={c.Country}>{c.Country}</option>
                                })
                            }
                        </select>                    
                     ):(
                        <select className="country-dropdown">
                            <option>Choose Country</option>
                        </select>))
                    }
                </div>
                <div className="sidebar-div"><p className="sidebar-cont-p"><span>New Confirmed&nbsp;:</span>
                    {this.state.isLoading ? 
                        (<span className="sidebar-num-cont"><span className="spinner-border spinner-border-sm text-dark"></span></span>) 
                        :(this.state.loadSuccessful ? (<span className="sidebar-num-cont">{this.state.currrentCountry.NewConfirmed}</span>)
                            :(<span className="sidebar-num-cont">Failed to Load</span>))
                    }</p>
                </div>
                <div className="sidebar-div"><p className="sidebar-cont-p"><span>Total Confirmed&nbsp;:</span>
                    {this.state.isLoading ? 
                        (<span className="sidebar-num-cont"><span className="spinner-border spinner-border-sm text-dark"></span></span>) 
                        :(this.state.loadSuccessful ? (<span className="sidebar-num-cont">{this.state.currrentCountry.TotalConfirmed}</span>)
                            :(<span className="sidebar-num-cont">Failed to Load</span>))
                    }</p>
                </div>
                <div className="sidebar-div"><p className="sidebar-cont-p"><span>New Deaths&nbsp;:</span>
                    {this.state.isLoading ? 
                        (<span className="sidebar-num-cont"><span className="spinner-border spinner-border-sm text-dark"></span></span>) 
                        :(this.state.loadSuccessful ? (<span className="sidebar-num-cont">{this.state.currrentCountry.NewDeaths}</span>)
                            :(<span className="sidebar-num-cont">Failed to Load</span>))
                    }</p>
                </div>
                <div className="sidebar-div"><p className="sidebar-cont-p"><span>Total Deaths&nbsp;:</span>
                    {this.state.isLoading ? 
                        (<span className="sidebar-num-cont"><span className="spinner-border spinner-border-sm text-dark"></span></span>) 
                        :(this.state.loadSuccessful ? (<span className="sidebar-num-cont">{this.state.currrentCountry.TotalDeaths}</span>)
                            :(<span className="sidebar-num-cont">Failed to Load</span>))
                    }</p>
                </div>
                <div className="sidebar-div"><p className="sidebar-cont-p"><span>New Recovered&nbsp;:</span>
                    {this.state.isLoading ? 
                        (<span className="sidebar-num-cont"><span className="spinner-border spinner-border-sm text-dark"></span></span>) 
                        :(this.state.loadSuccessful ? (<span className="sidebar-num-cont">{this.state.currrentCountry.NewRecovered}</span>)
                            :(<span className="sidebar-num-cont">Failed to Load</span>))
                    }</p>
                </div>
                <div className="sidebar-div"><p className="sidebar-cont-p"><span>Total Recovered&nbsp;:</span>
                    {this.state.isLoading ? 
                        (<span className="sidebar-num-cont"><span className="spinner-border spinner-border-sm text-dark"></span></span>) 
                        :(this.state.loadSuccessful ? (<span className="sidebar-num-cont">{this.state.currrentCountry.TotalRecovered}</span>)
                            :(<span className="sidebar-num-cont">Failed to Load</span>))
                    }</p>
                </div>
            </div>
        )
    }
}
export default SideBar;