import axios from 'axios';
import moment from "moment";

const currentWeather = document.querySelector('#weather')
const weatherDescription = document.querySelector("#weather_description")
const imgContainer = document.querySelector("#imageContainer")

const fetchGeo = async () => {
  try {
    const apiUsername = 'luisdaniel';
    const placeName = document.querySelector("#locationForm");
    const country = document.querySelector("#city");
    const response = await axios.get(`http://api.geonames.org/searchJSON?q=${placeName.value}&maxRows=10&username=${apiUsername}`)
      .then(apidata => {
        const latitude = apidata.data.geonames[0].lat;
        const longitude = apidata.data.geonames[0].lng;
        const countryName = apidata.data.geonames[0].countryName;
        country.innerHTML = `Country: ${countryName}`

        fetchWeather(latitude, longitude);
        fetchImages();

      })
  } catch (error) {
    console.log(error);
  }
}

const fetchWeather = async (latitude, longitude) => {
  try {
    const departure = document.querySelector("#departure")
    const country = document.querySelector("#city");
    const options = {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }
    let dateForm = document.querySelector('#dateForm')
    let dateString = dateForm.value;
    let date = moment(dateString);
    let isoDate = date.format('LL');
    departure.innerHTML = isoDate
    const weatherURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
    const weatherURLkey = '13452e40883e46dd8937414037e5b0f8';
    const response = await axios.get(`${weatherURL}lat=${latitude}&lon=${longitude}&key=${weatherURLkey}&units=I&days=16`)
    console.log(response)
    country.innerHTML = ` ${response.data.city_name}, ${response.data.country_code}`
    currentWeather.innerHTML = `${response.data.data[0].temp}° Fahrenheit`
    weatherDescription.innerHTML = `${response.data.data[0].weather.description}`



  } catch (error) {
    console.log(error);
  }
}

const fetchImages = async () => {
  try {
    let img = new Image();
    const api_key = "33063681-110732469b82324d36c382211";
    const placeName = document.querySelector("#locationForm");
    const url = `https://pixabay.com/api/?key=${api_key}&q=${placeName.value}`

    const response = await axios.get(url)
    console.log(response)
    img.src = response.data.hits[0].largeImageURL
    console.log(img)
    imgContainer.appendChild(img);



  } catch (error) {
    console.log(error);
  }

}

//days until trip, rounded
const fetchDaysuntilTrip = () => {
  const dateForm = document.querySelector("#dateForm");
  const dates = document.querySelector('#dates');
  let dateString = dateForm.value;
  let targetDate = new Date(dateString);
  let currentDate = new Date();
  let timeDiff = targetDate.getTime() - currentDate.getTime();
  let daysUntilTrip = timeDiff / (1000 * 3600 * 24);
  let roundedDaysUntilTrip = Math.ceil(daysUntilTrip);
  dates.innerHTML = `Due in ${roundedDaysUntilTrip} days`
}

const button = document.querySelector("#button")
button.addEventListener("click", (e) => {
  e.preventDefault();
  fetchGeo();
  fetchDaysuntilTrip();


})



//get weather information on departue date..display city and country, departure date and countdown and below all that infromation display the tempeartue and weather conditions 

// data.city_name

//get weather for specifc date user inputs 