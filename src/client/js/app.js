import axios from 'axios';

const fetchGeo = async () => {
  try {
    const apiUsername = 'luisdaniel';
    const placeName = document.querySelector("#locationForm");
    const country = document.querySelector("#city");
    const response = await axios.get(`http://api.geonames.org/searchJSON?name=${placeName.value}&username=${apiUsername}`)
      .then(apidata => {
        const latitude = apidata.data.geonames[0].lat;
        const longitude = apidata.data.geonames[0].lng;
        const countryName = apidata.data.geonames[0].countryName;
        country.innerHTML = `Country: ${countryName}`

        fetchWeather(latitude, longitude);

      })
  } catch (error) {
    console.log(error);
  }
}

const fetchWeather = async (latitude, longitude) => {
  try {
    const options = {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }
    let dateForm = document.querySelector('#dateForm')
    let dateString = dateForm.value;
    let date = new Date(dateString);
    let isoDate = date.toLocaleDateString('en-us', options);
    console.log(isoDate)
    const weatherURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
    const weatherURLkey = '13452e40883e46dd8937414037e5b0f8';
    const response = await axios.get(`${weatherURL}lat=${latitude}&lon=${longitude}&key=${weatherURLkey}&units=I&days=16`)
    console.log(response)

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
  dates.innerHTML = `Days until trip: ${roundedDaysUntilTrip}`
}

const button = document.querySelector("#button")
button.addEventListener("click", (e) => {
  e.preventDefault();
  fetchGeo();
  fetchDaysuntilTrip();


})



