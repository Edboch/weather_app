import "./style.css"
// import * as data from './data.json'

async function getLocationWeather(loc) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}?unitGroup=uk&key=974CB98EEDPG3VEFFCX2KQUDW&contentType=json`;
    try {
        const response = await fetch(url,{"method":"GET", "headers":{}});
        const data = await response.json();
        console.log(data);
        renderCurrentForecast(data);
        renderDayForecast(data);
    } catch (error) {
        console.error(error);
    }
}

function clearCurrentForecast() {
    const tempDisplay = document.querySelector('.temp-display');
    const details = document.querySelector('.details');
    tempDisplay.innerHTML = '';
    details.innerHTML = '';
}

function renderDayForecast(data) {
    const container = document.querySelector('.day-forecast');
    const hours = data.days["0"].hours;
    hours.forEach(hour => {
        const hourCard = document.createElement('div');
        hourCard.setAttribute('data-hour',hour.datetime);

        const time = document.createElement('p');
        const condition = document.createElement('p');
        const temp = document.createElement('p');

        time.textContent = hour.datetime.substring(0,5);
        condition.textContent = hour.icon;
        temp.textContent = hour.temp + " °";
        
        hourCard.append(time,condition,temp);
        container.append(hourCard);
    });
}

function renderCurrentForecast(data) {
    clearCurrentForecast();
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


    location.classList.add('location');
    temp.classList.add('temp');
    condition.classList.add('condition');
    feelslike.classList.add('feelslike');
    humidity.classList.add('humidity');
    visibility.classList.add('visibility');
    windspeed.classList.add('windspeed');


    location.textContent = data.resolvedAddress;
    temp.textContent = currentForecast.temp + ' °C';
    condition.textContent = capitalise(currentForecast.icon);
    feelslike.textContent = 'Feels Like ' + currentForecast.feelslike + ' °C';
    humidity.textContent = 'Humidity : ' + currentForecast.humidity+ '%';
    visibility.textContent = 'Visibility : ' + currentForecast.visibility + ' miles';
    windspeed.textContent = 'Wind Speed : ' + currentForecast.windspeed + ' mph';


    tempDisplay.append(
        location,
        temp,
        condition,
        feelslike
    )
    details.append(
        humidity,
        visibility,
        windspeed
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

function makeSearchListener() {
    const form = document.querySelector('.search');
    const searchBar = form.querySelector('#search-bar');

    form.addEventListener('submit',(e) => {
        e.preventDefault();
        const loc = searchBar.value;
        getLocationWeather(loc);
        searchBar.value = '';
    })
}

document.addEventListener("DOMContentLoaded", () => {
    getLocationWeather("London");
    makeSearchListener();
})