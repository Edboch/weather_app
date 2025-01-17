import "./style.css"

async function getLocationWeather(loc) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}?unitGroup=uk&key=974CB98EEDPG3VEFFCX2KQUDW&contentType=json`;
    const response = await fetch(url,{"method":"GET", "headers":{}});
    const data = await response.json();
    console.log(data);
}

getLocationWeather("JaPAN");