import React from "react"
import "./styles.css"

const AppHeader = (props) => {
    return(
        <div className="container-fluid row app-header">
            <div className="col-md-3 brand-cont "><h2>Covid-19 Tracker</h2></div>
            <div className="col-md-9 global-data-cont">
                <div className="global-title-div"><h5>Global</h5></div>
                <div className="global-div"><p className="global-cont-p"><span>Total Confirmed&nbsp;:</span>
                    {props.isLoading ? 
                        (<span className="global-num-cont"><span className="spinner-border spinner-border-sm text-dark"></span></span>) 
                        :(props.loadSuccessful ? (<span className="global-num-cont danger-1">{props.data.TotalConfirmed}</span>)
                            :(<span className="global-num-cont danger-1">Failed to Load</span>))
                    }</p>
                </div>
                <div className="global-div"><p className="global-cont-p"><span>New Confirmed&nbsp;:</span>
                    {props.isLoading ? 
                        (<span className="global-num-cont"><span className="spinner-border spinner-border-sm text-dark"></span></span>) 
                    :(props.loadSuccessful ? (<span className="global-num-cont">{props.data.NewConfirmed}</span>)
                            :(<span className="global-num-cont">Failed to Load</span>))
                    }</p>
                </div>
                <div className="global-div"><p className="global-cont-p"><span>&nbsp;Total Deaths&nbsp;:&nbsp;</span>
                    {props.isLoading ? 
                        (<span className="global-num-cont"><span className="spinner-border spinner-border-sm text-dark"></span></span>) 
                        :(props.loadSuccessful ? (<span className="global-num-cont">{props.data.TotalDeaths}</span>)
                            :(<span className="global-num-cont">Failed to Load</span>))
                    }</p>
                </div>                
                <div className="global-div"><p className="global-cont-p"><span>&nbsp;New Deaths&nbsp;:&nbsp;</span>
                    {props.isLoading ? 
                        (<span className="global-num-cont"><span className="spinner-border spinner-border-sm text-dark"></span></span>) 
                        :(props.loadSuccessful ? (<span className="global-num-cont">{props.data.NewDeaths}</span>)
                            :(<span className="global-num-cont">Failed to Load</span>))
                    }</p>
                </div>
                <div className="global-div"><p className="global-cont-p"><span>Total Recovered&nbsp;:</span>
                    {props.isLoading ? 
                        (<span className="global-num-cont"><span className="spinner-border spinner-border-sm text-dark"></span></span>) 
                        :(props.loadSuccessful ? (<span className="global-num-cont">{props.data.TotalRecovered}</span>)
                            :(<span className="global-num-cont">Failed to Load</span>))
                    }</p>
                </div>
                <div className="global-div"><p className="global-cont-p"><span>New Recovered&nbsp;:</span>
                    {props.isLoading ? 
                        (<span className="global-num-cont"><span className="spinner-border spinner-border-sm text-dark"></span></span>) 
                        :(props.loadSuccessful ? (<span className="global-num-cont">{props.data.NewRecovered}</span>)
                            :(<span className="global-num-cont">Failed to Load</span>))
                    }</p>
                </div>
            </div>                
        </div>
    )

}
export default AppHeader;