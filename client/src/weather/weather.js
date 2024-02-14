import React, { useState } from 'react';
import './weather.css';
import cloudy from './cloudy.png';


export default function Weather() {
    const [temperature, setTemperature] = useState('');
    const [city, setCity] = useState('');

    const api_key = "c730f1518183b8ba0090892fa116b36e";

    const Search = async () => {
        const element = document.getElementsByClassName('searchbox')[0];
        if (element.value === '') {
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&appid=${api_key}`;
            fetch(url).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                if (data.cod == '404') {
                    setCity(data.message);
                    return

                }
                const tempInCelsius = data.main.temp - 273.15;
                setTemperature(tempInCelsius.toFixed(2));
                setCity(data.name);

            })

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div className='container'>
            <div className='searchbar'>
                <input className='searchbox' placeholder='Type city name' type='text' />
                <button onClick={Search}>Search</button>
            </div>
            <div className='cloudimg'>
                <img style={{ width: '50px' }} src={cloudy} alt='' />
            </div>

            <div className='temp'>{temperature}°C</div>
            <div className='city'>{city}</div>


        </div>
    );
}
