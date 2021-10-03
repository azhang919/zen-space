import { Button, Card, CardActions, CardContent, TextField } from '@material-ui/core';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {

    const [weather, setWeather] = useState({});
    const [city, setCity] = useState('Raleigh');
    const [searchMsg, setSearchMsg] = useState('');

    useEffect(() => {
        getWeather();
        const weatherInterval = setInterval(() => {
            getWeather();
        }, 300000);

        return () => clearInterval(weatherInterval);
    }, []);

    const getWeather = async() => {
        const result = await axios({
            method: 'GET',
            url: `https://api.weatherbit.io/v2.0/current?key=${process.env.REACT_APP_WEATHER_API_KEY}&city=${city}&country=US&units=I`,
        });

        if (result.status === 200) {
            setWeather({
                temp: result.data.data[0].temp,
                desc: result.data.data[0].weather.description,
            })
            setSearchMsg(`Closest match: ${result.data.data[0].city_name}, ${result.data.data[0].state}`);
        } else {
            setWeather({});
            setSearchMsg('City weather not found. Please search again.');
        }
    }

    const handleCityChange = (e) => {
        e.preventDefault();
        setCity(e.target.value);
    }

    return (
        <Card>
            <CardActions>
                <TextField
                    variant="outlined"
                    margin="normal"
                    label="Current weather for"
                    name="city"
                    value={city}
                    onChange={handleCityChange}
                >
                </TextField>
                <Button size="small" color="primary" onClick={getWeather}>Update</Button>
            </CardActions>
            <CardContent>
                <p>Weather updates occur every 5 min.</p>
                <p>{searchMsg}</p>
                <p>Temperature: {weather.temp}</p>
                <p>Weather: {weather.desc}</p>
            </CardContent>
        </Card>
    )

}

export default Weather;