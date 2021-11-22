import React, { createContext, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "./Context/GlobalState";
import "./Thapa.css";
import * as reactBootstrap from "react-bootstrap";

const Thapa = () => {


  const { dispatch, state } = useContext(GlobalContext);

  const getMode = () => {
    return JSON.parse(localStorage.getItem("mode")) || false;
  };

  const [globalaData, setGlobalData] = useState([]);

  const [dark, setDark] = useState(getMode());

  const getData = async () => {
    const response = await fetch(
      "https://disease.sh/v3/covid-19/countries"
    ).catch((err) => {
      dispatch({
        type: "error",
        payload: {error: err.message}
      })
    });
    if (!response.ok) {
      throw Error("can not fetch the data");
    }
    const data = await response.json();
    console.log({ response });
    if (data.length > 0) {
      dispatch({
        type: "ADD_COUNTRY",
        payload: { countryData: data },
      });
    }
    dispatch({
      type: "loading",
      payload: { loading: true },
    });

    //setData(await response.json());
    console.log("I AM GET DATA");
  };
  const filterByRegion = async (continent) => {
    if (continent === "") return;
    const res = await fetch(
      `https://disease.sh/v3/covid-19/countries/${continent}`
    );

    const data = await res.json();
    console.log(data, "continent");
    await dispatch({
      type: "ADD_COUNTRY",
      payload: { countryData: data },
    });
  };
  const searchCountry = async (country) => {
    if (country.length > 0) {
      const res = await fetch(
        `https://disease.sh/v3/covid-19/countries/${country}`
      );
      const data = await res.json();
      console.log(data, "searchc data");
      if (data.length > 0) {
        dispatch({
          type: "SEARCH_COUNTRY",
          payload: { searchCountryData: data },
        });
      }
    } else if (country.length === 0) {
      const res = await fetch(`https://disease.sh/v3/covid-19/countries`);
      const data = await res.json();
    }
  };

  // const getCovidData = async () => {
  //   const response = await fetch("https://disease.sh/v3/covid-19/all");
  //   setCovidData(await response.json());
  // };
  const getGlobalData = async () => {
    const response = await fetch("https://disease.sh/v3/covid-19/all");
    setGlobalData(await response.json());
    console.log("I AM GET GLOBAL DATA");
  };
  // const restCountry = async () => {
  //   const response = await fetch("https://disease.sh/v3/covid-19/all");
  //   setRestCountryData(await response.json());
  //   console.log("I AM REST COUNTRY");
  // };

  useEffect(() => {
    getData();

    getGlobalData();
    // restCountry();
  }, []);

  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(dark));
  }, [dark]);

  return (
    <>
      <Link to="/">
        <div className={dark ? "navbar navbar-light" : "navbar"}>
          <h3 className="heading">Where in the world?</h3>
          <h6 className="dark-mode" onClick={() => setDark(!dark)}>
            {/* <i className="fas fa-moon"></i> */}
            {dark ? "🌜 Dark mode" : " ☀️ Light mode"}
          </h6>
        </div>
        <div className={dark ? "app-body white-mode" : "app-body"}>
          <input
            type="search"
            className={dark ? "search-bar search-light" : "search-bar"}
            placeholder="search for a country"
            onChange={(term) => searchCountry(term.target.value)}
          />
          <select
            className={dark ? "dropdown dropdown-light" : "dropdown"}
            // onChange={(val) => filterByRegion(val.target.value)}
          >
            <option value="">Filter by Region</option>
            <option value="africa">Africa</option>
            <option value="america">America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>

          <div>{<h2>Total Cases: {globalaData.cases}</h2>}</div>

          <div className="container">
            <section className="gird">
              
              {state.loading ? (
                state.countryData.map((currElem, id) => {
                  return (
                    <Link key={id} to={`/${currElem.country}`}>
                      <div className="container">
                        {/* <h1 className="flag">{currElem.flag}</h1> */}
                        <img src={currElem.countryInfo.flag} />
                        <div className={dark ? "card card-light" : "card"}>
                          {/* <h4 className="country-name">{currElem.name.common}</h4>
                          <span>population: {currElem.population}</span>
                          <span>Region: {currElem.region}</span>
                          <span>Capital: {currElem.capital}</span>
                         {
                           <span>{covidData.cases}</span>
                         } 
                         */}
                          <span>{currElem.country}</span>
                          <span>population: {currElem.population}</span>
                          <span>Region: {currElem.continent}</span>
                          <span>Total Cases: {currElem.cases}</span>
                        </div>
                      </div>

                      {/* {restCountryData.map((restElem) => {
                        return (
                          <div>
                            <Link to={`/${restElem.name.common}`}>
                              <h1>{restElem.name.common}</h1>
                            </Link>
                          </div>
                        );
                      })} */}
                    </Link>
                  );
                })
              ) : (
                <div className="laoding-text">
                  <reactBootstrap.Spinner
                    animation="border"
                    className="loading-animation"
                  />
                </div>
              )}
            </section>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Thapa;
