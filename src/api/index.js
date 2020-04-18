import axios from 'axios';


const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changeableURL = url;

    // if country is passed then return specific country data
    if(country) {
        changeableURL = `${url}/countries/${country}`;
    }

    try {
        // deep destructuring of response.data
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableURL);
       
        // variable names are the same so we dont need "confirmed: data.confirmed" etc
        return { confirmed, recovered, deaths, lastUpdate }

    } catch (error) {
        console.log(error);
    }
}


export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);

        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total, 
            deaths: dailyData.deaths.total, 
            date: dailyData.reportDate
        }));

        console.log(modifiedData)
        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}


export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);

        return countries.map((country) => country.name);
    } catch (error) {
        console.log(error);
    }
}