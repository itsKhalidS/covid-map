import React from "react"
import "./styles.css"
import AppHeader from "../AppHeader/index.js"
class Background extends React.Component{
    
    render = () => {
        
        return(            
            <div className="container-fluid app-background">
                <div><AppHeader/></div>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-10"></div>
                </div>
            </div>
        )
    }
}export default Background;