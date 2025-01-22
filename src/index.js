import "./style.css"
import * as data from './data.json'

async function getLocationWeather(loc) {
    // const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}?unitGroup=uk&key=974CB98EEDPG3VEFFCX2KQUDW&contentType=json`;
    // const response = await fetch(url,{"method":"GET", "headers":{}});
    // const data = await response.json();
    console.log(data);
    renderCurrentForecast(data);
}

getLocationWeather("London");



function renderCurrentForecast(data) {
    const current = document.querySelector('.current-forecast');
    const tempDisplay = current.querySelector('.temp-display');
    const details = current.querySelector('.details');
    const currentForecast = data.currentConditions;

    const location = document.createElement('p');
    const temp = document.createElement('p');
    const condition = document.createElement('p');
    const feelslike = document.createElement('p');
    const humidity = document.createElement('p');
    const visibility = document.createElement('p');
    const windspeed = document.createElement('p');
    const time = document.createElement('p');

    location.classList.add('location');
    temp.classList.add('temp');
    condition.classList.add('condition');
    feelslike.classList.add('feelslike');
    humidity.classList.add('humidity');
    visibility.classList.add('visibility');
    windspeed.classList.add('windspeed');
    time.classList.add('last-checked')

    location.textContent = data.resolvedAddress;
    temp.textContent = currentForecast.temp + ' °C';
    condition.textContent = capitalise(currentForecast.icon);
    feelslike.textContent = 'Feels Like ' + currentForecast.feelslike + ' °C';
    humidity.textContent = 'Humidity : ' + currentForecast.humidity+ '%';
    visibility.textContent = 'Visibility : ' + currentForecast.visibility + ' miles';
    windspeed.textContent = 'Wind Speed : ' + currentForecast.windspeed + ' mph';
    time.textContent = 'Last Checked : ' + currentForecast.datetime;

    tempDisplay.append(
        location,
        temp,
        condition,
        feelslike
    )
    details.append(
        humidity,
        visibility,
        windspeed,
        time
    )
}

function capitalise(string) {
    let words = string.split(' ');
    let result = '';
    for (const word of words) {
        let firstLetter = word.charAt(0);
        let remainder = word.slice(1);
        let capitalised = firstLetter.toUpperCase()+remainder;
        result = result.concat(' ',capitalised);
    }
    return result
}
