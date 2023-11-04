import React, { useState } from "react";
import './RowWeather.css'

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';


const RowWeather = () => {

    let api_key="1f9a2942b3e64064be6104937230411";

    const[wicon, setWicon] = useState(cloud_icon);

    const search=async()=>{
        const element=document.getElementsByClassName("cityInput")
        if(element[0].value===""){
            return 0;
        }
        let url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${element[0].value}`;
        let response=await fetch(url);
        let data = await response.json();

        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temp = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.current.humidity+" %";
        wind[0].innerHTML = data.current.wind_kph+" km/hr";
        temp[0].innerHTML = data.current.temp_c+"°C";
        location[0].innerHTML = data.location.name;

        if(data.current.condition.code===1003||data.current.condition.code===1006||data.current.condition.code===1030){
            setWicon(cloud_icon);
        }
        else if(data.current.condition.code===1000||data.current.condition.code===1009||data.current.condition.code===1069||data.current.condition.code===1117){
            setWicon(clear_icon);
        }
        else if(data.current.condition.code===1069||data.current.condition.code===1072||data.current.condition.code===1135||data.current.condition.code===1147||data.current.condition.code===1150||data.current.condition.code===1153||data.current.condition.code===1168||data.current.condition.code===1171){
            setWicon(drizzle_icon);
        }
        else if(data.current.condition.code===1063||data.current.condition.code===1087||data.current.condition.code===1180||data.current.condition.code===1183||data.current.condition.code===1186||data.current.condition.code===1189||data.current.condition.code===1192||data.current.condition.code===1195||data.current.condition.code===1198||data.current.condition.code===1201){
            setWicon(rain_icon);
        }
        else if(data.current.condition.code===1210||data.current.condition.code===1213||data.current.condition.code===1216||data.current.condition.code===1219||data.current.condition.code===1222||data.current.condition.code===1225||data.current.condition.code===1237){
            setWicon(snow_icon);
        }
        else{
            setWicon(cloud_icon);
        }
    }

    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder="Search"/>
                <div className="search-icon" onClick={()=>{search()}}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">24°C</div>
            <div className="weather-location">Delhi</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">64 %</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">3 km/hr</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RowWeather