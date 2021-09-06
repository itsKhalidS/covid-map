import React from "react";
import AppHeader from "../AppHeader/index.js";
import SideBarOverall from "../SideBar/SideBarOverall.js";
import SideBarMonth from "../SideBar/SideBarMonth.js";
import MapChart from "../MapChart/index.js";
import WatchList from "../WatchList/index.js";
import "./styles.css";

class Body extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      loadSuccessful: false,
      global: {},
      countries: [],
      currentCountry: {},
      coordinates: [],
      countryCode: "",
      latitude: 0,
      longitude: 0,
      zoom: 1.15,
      plotCondition: 0,
      SideBarOverall: true,
      startDate: "2020-01-22",
      endDate: "2020-02-22",
      isComponentLoading: false,
      componentLoadSuccessful: false,
      data: {
        confirmed: 0,
        recovered: 0,
        dead: 0,
      },
    };
  }
  componentDidMount = () => {
    this._isMounted = true;
    this.fetchData();
  };
  componentWillUnmount = () => {
    this._isMounted = false;
  };
  fetchData = () => {
    const url = "https://api.covid19api.com/summary";
    this.setState({ isLoading: true });
    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        this.fetchLatitudeLongitude(result);
      })
      .catch((error) => {
        alert(
          "Failed to retrieve data from server\nPlease check your Internet connection and try again"
        );
        if (this._isMounted) {
          this.setState({
            isLoading: false,
            loadSuccessful: false,
          });
        }
      });
  };
  fetchLatitudeLongitude = (result) => {
    let countryData = {},
      newCoordinates = [];
    const url_latLon = "https://restcountries.eu/rest/v2/all";
    fetch(url_latLon, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        newCoordinates = res.map((country) => {
          return {
            CountryCode: country.alpha2Code.toUpperCase(),
            Latitude: country.latlng[0],
            Longitude: country.latlng[1],
          };
        });
        countryData = result.Countries.find(
          (s) => s.Country === "United States of America"
        );
        if (this._isMounted) {
          this.setState({
            isLoading: false,
            loadSuccessful: true,
            global: result.Global,
            countries: result.Countries,
            currentCountry: countryData,
            coordinates: newCoordinates,
          });
        }
      })
      .catch((error) => {
        alert(
          "Failed to retrieve data from server\nPlease check your Internet connection and try again"
        );
        if (this._isMounted) {
          this.setState({
            isLoading: false,
            loadSuccessful: false,
          });
        }
      });
  };
  changeToOverallSidebar = () => {
    if (this.state.SideBarOverall !== true) {
      this.setState({
        SideBarOverall: true,
      });
    }
  };
  changeToMonthlySidebar = () => {
    if (this.state.SideBarOverall !== false) {
      this.setState({
        SideBarOverall: false,
      });
      this.dateValidation();
    }
  };
  onCountryChange = (event) => {
    const countryData = this.state.countries.find(
      (s) => s.Country === event.target.value
    );
    this.setState({
      currentCountry: countryData,
    });
    const d = this.state.coordinates.find(
      (s) => s.CountryCode === countryData.CountryCode
    );
    if (d) {
      this.setState({
        countryCode: d.CountryCode,
        latitude: d.Latitude,
        longitude: d.Longitude,
        zoom: 3,
      });
    } else {
      this.setState({
        countryCode: "",
        latitude: 0,
        longitude: 0,
        zoom: 1.15,
      });
    }
  };
  onStartDateChange = (event) => {
    this.setState({
      startDate: event.target.value,
    });
  };
  onEndDateChange = (event) => {
    this.setState({
      endDate: event.target.value,
    });
  };
  dateValidation = () => {
    let raiseAlert = false;
    const startYear = parseInt(this.state.startDate.substr(0, 4));
    const startMonth = parseInt(
      this.state.startDate.substr(this.state.startDate.indexOf("-") + 1, 2)
    );
    const startDay = parseInt(
      this.state.startDate.substr(this.state.startDate.lastIndexOf("-") + 1, 2)
    );
    const endYear = parseInt(this.state.endDate.substr(0, 4));
    const endMonth = parseInt(
      this.state.endDate.substr(this.state.endDate.indexOf("-") + 1, 2)
    );
    const endDay = parseInt(
      this.state.endDate.substr(this.state.endDate.lastIndexOf("-") + 1, 2)
    );
    if (startYear > endYear) {
      raiseAlert = true;
    } else if (startYear === endYear) {
      if (startMonth > endMonth) {
        raiseAlert = true;
      } else if (startMonth === endMonth) {
        if (startDay >= endDay) {
          raiseAlert = true;
        }
      } else {
        raiseAlert = false;
      }
    } else {
      raiseAlert = false;
    }
    if (raiseAlert) {
      alert("Start Day should be at least one day less than End Day");
      return;
    }
    this.fetchRangeData();
  };
  fetchRangeData = () => {
    const url = `https://api.covid19api.com/country/${this.state.currentCountry.Slug}?from=${this.state.startDate}T00:00:00Z&to=${this.state.endDate}T00:00:00Z`;
    this.setState({ isComponentLoading: true });
    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        let i,
          stConfirmed = 0,
          stRecovered = 0,
          stDeaths = 0,
          endConfirmed = 0,
          endRecovered = 0,
          endDeaths = 0,
          firstDate = result[0].Date,
          lastDate = result[result.length - 1].Date;
        for (i = 0; i < result.length; i++) {
          if (result[i].Date === firstDate) {
            stConfirmed = stConfirmed + result[i].Confirmed;
            stRecovered = stRecovered + result[i].Recovered;
            stDeaths = stDeaths + result[i].Deaths;
          }
          if (result[i].Date === lastDate) {
            endConfirmed = endConfirmed + result[i].Confirmed;
            endRecovered = endRecovered + result[i].Recovered;
            endDeaths = endDeaths + result[i].Deaths;
          }
        }
        if (this._isMounted) {
          this.setState({
            isComponentLoading: false,
            componentLoadSuccessful: true,
            data: {
              confirmed: endConfirmed - stConfirmed,
              recovered: endRecovered - stRecovered,
              dead: endDeaths - stDeaths,
            },
          });
        }
      })
      .catch((error) => {
        alert(
          "Failed to retrieve data from server\nPlease check your Internet connection and try again"
        );
        if (this._isMounted) {
          this.setState({
            isComponentLoading: false,
            componentLoadSuccessful: false,
          });
        }
      });
  };
  plotByDeathCases = () => {
    if (this.state.plotCondition !== 1) {
      this.setState({
        plotCondition: 1,
      });
    }
  };
  plotByConfirmedCases = () => {
    if (this.state.plotCondition !== 0) {
      this.setState({
        plotCondition: 0,
      });
    }
  };
  render = () => {
    return (
      <div className="container-fluid app-background">
        <AppHeader
          isLoading={this.state.isLoading}
          loadSuccessful={this.state.loadSuccessful}
          data={this.state.global}
        />
        <div className="row app-body-cont">
          <div className="col-lg-3 country-cont">
            <div className="button-cont">
              <button
                className={
                  this.state.isLoading || this.state.loadSuccessful === false
                    ? "hide"
                    : this.state.SideBarOverall
                    ? "butn butn-active"
                    : "butn"
                }
                onClick={this.changeToOverallSidebar}
                disabled={
                  this.state.isLoading || this.state.loadSuccessful === false
                }
              >
                Overall Data
              </button>
              <button
                className={
                  this.state.isLoading || this.state.loadSuccessful === false
                    ? "hide"
                    : this.state.SideBarOverall
                    ? "butn"
                    : "butn butn-active"
                }
                onClick={this.changeToMonthlySidebar}
                disabled={
                  this.state.isLoading || this.state.loadSuccessful === false
                }
              >
                Ranged Data
              </button>
            </div>
            {this.state.SideBarOverall ? (
              <SideBarOverall
                isLoading={this.state.isLoading}
                loadSuccessful={this.state.loadSuccessful}
                countries={this.state.countries}
                currentCountry={this.state.currentCountry}
                onCountryChange={this.onCountryChange}
              />
            ) : (
              <SideBarMonth
                countries={this.state.countries}
                currentCountry={this.state.currentCountry}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                isComponentLoading={this.state.isComponentLoading}
                componentLoadSuccessful={this.state.componentLoadSuccessful}
                data={this.state.data}
                onCountryChange={this.onCountryChange}
                onStartDateChange={this.onStartDateChange}
                onEndDateChange={this.onEndDateChange}
                dateValidation={this.dateValidation}
              />
            )}
            <div className="watchlist-container">
              <WatchList
                isLoading={this.state.isLoading}
                loadSuccessful={this.state.loadSuccessful}
                countries={this.state.countries}
                currentCountry={this.state.currentCountry}
                changeLoginStatus={this.props.changeLoginStatus}
                onCountryChange={this.onCountryChange}
                changeToOverallSidebar={this.changeToOverallSidebar}
              />
            </div>
          </div>
          <div className="col-lg-9 map-cont">
            <MapChart
              countries={this.state.countries}
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
    );
  };
}
export default Body;
