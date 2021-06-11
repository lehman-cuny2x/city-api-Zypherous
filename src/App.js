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
      cityApi: "http://ctp-zip-api.herokuapp.com/city/",
      displayData: [],
    };
    // this.apiData = []
    this.handleUserInput = this.handleUserInput.bind(this);
    this.createCard = this.createCard.bind(this);
    this.createZipCard = this.createZipCard.bind(this);
    this.handleCitySearch = this.handleCitySearch.bind(this);
    this.createUL = this.createUL.bind(this);
    this.getDataforArray = this.getDataforArray.bind(this);
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
        <li key={index+3}>Population Est.: {data.EstimatedPopulation}</li>
        <li key={index+4}>Total Wages: {data.TotalWages}</li>
      </div>
    );
  }
  createZipCard = (data) => {
    return(
    <div className="zipList">
      <li>{data.Zipcode}</li>
      <li>{data.State}</li>
      <li>{data.City}</li>
    </div>
    // <div><li key={index}>:Zip:{data.Zipcode}+:State:{data.State}+:City:{data.City}</li></div>
    // <div>
    //   <li key={index}>:Zip:{data.Zipcode}
    //   :State:{data.State}
    //   :City:{data.City}</li>
    // </div>
    
    );
  }

  getDataforArray(list){
    let arrayForSort = [];
    list.forEach(zipcode =>{
      let url = this.handleZip(zipcode);
      fetch(url)
      .then(response =>response.json())
      .then((json) => {
        json.forEach(item =>{
        let obj = {}
        obj["State"] = item.State;
        // console.log(item.State);
        obj["Zipcode"] = item.Zipcode;
        obj["City"] = item.City;
        // console.log(obj);
        arrayForSort.push(obj);
        });
       })
    .catch(err =>{
      console.error(err);
    });
   });
   arrayForSort = arrayForSort.sort((a, b) => (a.State > b.State) ? 1 : (a.State === b.State) ? ((a.Zipcode > b.Zipcode) ? 1 : -1) : -1 );
   console.log("array for sort after sort:" );
   console.log(arrayForSort);
   
  //  arrayForSort.forEach((object,index) =>{
  //   let element = this.createZipCard(object,index);
  //   console.log(element);
  //   this.setState({displayData: this.state.displayData.concat([element])});
  //  })
   let disDat = [];
   for(var i = 0; i <arrayForSort.length;i++){
    let ele = this.createZipCard(arrayForSort[i]);
    disDat.push(ele);
   }
   console.log(disDat);
   this.setState({displayData: []});
   }
  

  createUL = (data) =>{
    return(
      <ul className="zipList">{data}</ul>
    );
  }

  handleCitySearch(event) {
    this.setState({displayData: []});

    let city = document.getElementById("cityBar").value;
    document.getElementById("cityBar").value = "";
    // console.log(city);
    let citytrim = city.trim();
    let cityUpper = citytrim.toUpperCase();
    // console.log(cityUpper);
    let url = this.state.cityApi + cityUpper ;
    
    fetch(url)
    .then(response => response.json())
    //  console.log(response.json);
    .then((json) => {
      // if(json.parse() === "Cannot GET /city/" ){
      //   this.setState({displayData: this.state.displayData.concat(["Cannot GET /city/"])});
      //   return;
      // }
      // let array = json.map(element);
      this.getDataforArray(json);

      // let cityZip = json.map((element, index) =>  this.createZipCard(element, index));
      // cityZip.forEach((element, index) =>{
      //   this.setState({displayData: this.state.displayData.concat([element])});
      // })
      // // use create UL to order the list nicer
      // let ziplist = this.createUL(this.state.displayData);
      // this.setState({displayData: []});
      // this.setState({displayData: this.state.displayData.concat([ziplist])});
      })
    .catch((err) => {
      console.error(err);
      // this.setState({displayData: err});
    });
  }

  handleUserInput(event) {
    // console.log("input value" +event.target.value);
    let userInput = document.getElementById("searchBar").value;
    let url = this.handleZip(userInput);
    // console.log("handle:" + url);
    document.getElementById("searchBar").value = "";

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
                                                                                        // console.log("json:" + JSON.stringify(json));
                                                                                        // json.forEach(element =>{
                                                                                        //   createCard(element);
                                                                                        // this.displayData = //useset state

        this.setState({displayData: []});
        if(json === undefined){
          this.setState({displayData: this.state.displayData.concat(["Not Found"])});
          return;
        }
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
        console.error(err);
        this.setState({displayData: []});
        this.setState({displayData: this.state.displayData.concat(["Not Found"])});
      });
  }


  handleZip(zipCode) {
    let url = this.state.apiUrl;
    // console.log("url in handlezip pre zip" +url +" zip in handle zip" +zipCode);
    if (isNaN(zipCode) || zipCode.toString().length < 5) {
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
          <div className= "">
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
