import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalContext, GlobalProvider } from "./Context/GlobalState";
import "./Country1.css";

export const Country1 = () => {
  const { dispatch, state } = useContext(GlobalContext);
  const value = useContext(GlobalProvider);
  console.log("no data", value);
  const getMode = () => {
    return JSON.parse(localStorage.getItem("mode")) || false;
  };

  const [dark, setDark] = useState(getMode());
  const [countryData, setCountryData] = useState({});
  const { country } = useParams();
  // const getData = async () => {
  //   const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  //   setCountry(await response.json());
  //   console.log(data);
  // };
  const getData = async () => {
    const response = await fetch(
      `https://disease.sh/v3/covid-19/countries/${country}`
    );
    const data = await response.json();
    //setCountryData(await response.json());
    // if (data) {
    //   country(data);
    // }
    console.log("single country data", data)
    if (data) {
      dispatch({
        type: "SINGLE_COUNTRY",
        payload: { country: data },
      });

    }
    dispatch({
      type: "loading",
      payload: {loading: true},
    })
    // console.log(data, countryData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className={dark ? "navbar navbar-light" : "navbar"}>
        <h3 className="heading">Where in the world?</h3>
        <h6 className="dark-mode" onClick={() => setDark(!dark)}>
          {/* <i className="fas fa-moon"></i> */}
          {dark ? "🌜 Dark mode" : " ☀️ Light mode"}
        </h6>
      </div>
      <div className={dark ? "main-body main2" : "main-body"}>
        <Link to="/">
          <button className="back-button">Back</button>
        </Link>
        <div className="asdasd">
          {/* {
            state.country.countryInfo.map((element)=>{
              <img src={element.flag}/>
            })
          }
          <img src={state.country} */}
          
          {state.country.country}
          <h2>{state.country.cases}</h2>
            
          <h2>{value}</h2>
        </div>

        {/* {countryData.map((elem) => {
          return (
            <div className="container">
              <div className="country-data">
                <div className="row">
                  <div className="col-lg-4">
                    
                  </div>

                  <div className="col-lg-4">
                    <div className="second-column">
                      <h2>{elem.country}</h2>
                      
                      <p>population: {elem.population}</p>
                      
                      <div className="row">
                        <p>Border Countries:</p>
                       
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="third-column">
                      =
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};
