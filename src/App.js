import logo from "./logo.svg";
import "./App.css";
import "./API.js";
import axios from "axios";
import { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      apiUrl: "http://ctp-zip-api.herokuapp.com/zip/",
      cityApi: "",
      displayData: [],
    };
    // this.apiData = []
    this.handleUserInput = this.handleUserInput.bind(this);
    this.createCard = this.createCard.bind(this);
  }

  createCard = (data, index) => {
    return (
      <div>
        <h1>
          {data.City}, {data.State}
        </h1>
        <li key={index+1}>State: {data.State}</li>
        <li key={index+2}>
          Location: ({data.Lat},{data.Long})
        </li>
        <li key={index+3}>Populagtion Est.: {data.EstimatedPopulation}</li>
        <li key={index+4}>Total Wages: {data.TotalWages}</li>
      </div>
    );
  }

  handleCitySearch(event) {
    let city = document.getElementById("cityBar").value;
    console.log(city);
    let citytrim = city.trim();
    let cityUpper = citytrim.toUpperCase();
    console.log(cityUpper);
    url = "http://ctp-zip-api.herokuapp.com/city/" + cityUpper ;
    
    fetch(url)
    .then(response =>response.json())
    .then((json) => {
      
    })
    .catch((err) => {
      console.error(err);
    })
  }

  handleUserInput(event) {
    // console.log("input value" +event.target.value);
    let userInput = document.getElementById("searchBar").value;
    let url = this.handleZip(userInput);
    // console.log("handle:" + url);
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
                                                                                        // console.log("json:" + JSON.stringify(json));
                                                                                        // json.forEach(element =>{
                                                                                        //   createCard(element);
                                                                                        // this.displayData = //useset state

        this.setState({displayData: []});
                                                                                        // let data = JSON.parse(JSON.stringify(json));
                                                                                        // console.log(data);
        let cards = json.map((element, index) =>this.createCard(element, index));
        // console.log(cards);
        cards.forEach(card =>{
                                                                                        // var card = {};
                                                                                        // card["City"] = obj.City;
                                                                                        // card["State"] = obj.State;
                                                                                        // card["EstimatedPopulation"] = obj.EstimatedPopulation;
                                                                                        // card["TotalWages"] = obj.TotalWages;
                                                                                        // card["Lat"] = obj.Lat;
                                                                                        // card["Long"] = obj.Long;

          this.setState({displayData: this.state.displayData.concat([card])});
          //this.displayData.push(card);
        });
        // })
        // this.state.displayData.concat(this.apiData);
        console.log(this.state.displayData);
      })
      .catch((err) => {
        console.error('Error: ',err);
      });
  }

  handleZip(zipCode) {
    let url = this.state.apiUrl;
    // console.log("url in handlezip pre zip" +url +" zip in handle zip" +zipCode);
    if (isNaN(zipCode)) {
      url = url + "0";
      alert("Please enter a 5 digit zip-code");
    } else {
      url = url + zipCode;
    }
    // console.log("handlezip" + url);
    return url;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Zip Code Search</p>
          <form>
            <input
              id="searchBar"
              name="zipCode"
              type="text"
              placeholder="Zip Code"
              maxLength="5"
            ></input>
            </form>
            <button name="zipSearch" onClick={this.handleUserInput}>Search</button>
            <p>City Search</p>
          <form>
            <input
              id="cityBar"
              name="citySearch"
              type="text"
              placeholder="City Name"
              maxLength="50"
            ></input>
            </form>
            <button name="citySearch" onClick={this.handleCitySearch}>Search</button>
          <div>
            {this.state.displayData}
          </div>
         
        </header>
        
      </div>
    );
  }
}

export default App;

// class ZipSearch extends Component {
//   render() {
//     return <>{}<>;
//   }
// }
