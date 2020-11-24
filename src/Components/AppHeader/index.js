import React from "react"
import "./styles.css"

class AppHeader extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isLoading: false,
            newConfirmed: "-",
            totalConfirmed: "-",
            newDeaths: "-",
            totalDeaths: "-",
            newRecovered: "-",
            totalRecovered: "-"
        }
    }
    componentDidMount = () => {
        this.fetchGlobalData();
    }

    fetchGlobalData = () => {
        const url="https://api.covid19api.com/summary"
        this.setState({isLoading: true})
        fetch(url,{
            method: "GET"
        }).then((response) => {
            return response.json()
        }).then((result) => {
            this.setState({
                isLoading: false,
                newConfirmed: result.Global.NewConfirmed,
                totalConfirmed: result.Global.TotalConfirmed,
                newDeaths: result.Global.NewDeaths,
                totalDeaths: result.Global.TotalDeaths,
                newRecovered: result.Global.NewRecovered,
                totalRecovered: result.Global.TotalRecovered
            })
        }).catch((error) => {
            alert("Failed to fetch data from server\nPlease check your Internet connection and try again")
            this.setState({
                isLoading: false,
                newConfirmed: "Failed to Load",
                totalConfirmed: "Failed to Load",
                newDeaths: "Failed to Load",
                totalDeaths: "Failed to Load",
                newRecovered: "Failed to Load",
                totalRecovered: "Failed to Load"
            })
        })
    }
        
    render = () => {
        return(
            <div className="container-fluid row app-header">
                <div className="col-md-3 brand-cont py-2"><h2 className="app-brand">Covid-19 Tracker</h2></div>
                <div className="col-md-9 global-data-cont">
                    <div className="global-div"><h5>Global</h5></div>
                    <div className="global-div"><p className="global-cont-p"><span>New Confirmed&nbsp;:</span>
                        {this.state.isLoading ? 
                            (<span className="num-cont"><span className="spinner-border spinner-border-sm text-dark"></span></span>) 
                            :(<span className="num-cont">{this.state.newConfirmed}</span>)
                        }</p>
                    </div>
                    <div className="global-div"><p className="global-cont-p"><span>Total Confirmed&nbsp;:</span>
                        {this.state.isLoading ? 
                            (<span className="num-cont"><span className="spinner-border spinner-border-sm text-dark"></span></span>) 
                            :(<span className="num-cont">{this.state.totalConfirmed}</span>)
                        }</p>
                    </div>
                    <div className="global-div"><p className="global-cont-p"><span>New Deaths&nbsp;:</span>
                        {this.state.isLoading ? 
                            (<span className="num-cont"><span className="spinner-border spinner-border-sm text-dark"></span></span>) 
                            :(<span className="num-cont">{this.state.newDeaths}</span>)
                        }</p>
                    </div>
                    <div className="global-div"><p className="global-cont-p"><span>Total Deaths&nbsp;:</span>
                        {this.state.isLoading ? 
                            (<span className="num-cont"><span className="spinner-border spinner-border-sm text-dark"></span></span>) 
                            :(<span className="num-cont">{this.state.totalDeaths}</span>)
                        }</p>
                    </div>
                    <div className="global-div"><p className="global-cont-p"><span>New Recovered&nbsp;:</span>
                        {this.state.isLoading ? 
                            (<span className="num-cont"><span className="spinner-border spinner-border-sm text-dark"></span></span>) 
                            :(<span className="num-cont">{this.state.newRecovered}</span>)
                        }</p>
                    </div>
                    <div className="global-div"><p className="global-cont-p"><span>Total Recovered&nbsp;:</span>
                        {this.state.isLoading ? 
                            (<span className="num-cont"><span className="spinner-border spinner-border-sm text-dark"></span></span>) 
                            :(<span className="num-cont">{this.state.totalRecovered}</span>)
                        }</p>
                    </div>
                </div>                
            </div>
        )
    }
}
export default AppHeader;