import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'b19cbd716c3efdd2306cb69a3ee41230';

export const fetchWeather = async (city) => {
    const { data } = await axios.get(URL, {
        params: {
            q: city,
            units: 'metric',
            APPID: API_KEY
        }
    });

    return data;
};

