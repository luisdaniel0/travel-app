import axios from 'axios';

const button = document.querySelector("#button")

const apiUsername = 'luisdaniel';
const placeName = document.querySelector("#locationForm");
const country = document.querySelector("#city");
const dateForm = document.querySelector("#dateForm");
const dates = document.querySelector('#dates');

const fetchGeo = async () => {
  try {
    const response = await axios.get(`http://api.geonames.org/searchJSON?name=${placeName.value}&username=${apiUsername}`)
      .then(apidata => {
        const latitude = apidata.data.geonames[0].lat;
        const longitude = apidata.data.geonames[0].lng;
        const countryName = apidata.data.geonames[0].countryName;
        country.innerHTML = `Country: ${countryName}`
        console.log(latitude);
        console.log(longitude);
        console.log(countryName);
        // console.log(dateForm)
        // let dateString = dateForm.value;
        // console.log(dateForm.value)
        // let targetDate = new Date(dateString);
        // let currentDate = new Date();
        // let timeDiff = targetDate.getTime() - currentDate.getTime();
        // let daysUntilTrip = timeDiff / (1000 * 3600 * 24);
        // console.log("Days until trip: " + daysUntilTrip)
        // const tripDate = `Days until trip: ${daysUntilTrip}`
        return response
      })
  } catch (error) {
    console.log(error);
  }
}

const fetchDaysuntilTrip = () => {
  let dateString = dateForm.value;
  console.log(dateForm.value)
  let targetDate = new Date(dateString);
  let currentDate = new Date();
  let timeDiff = targetDate.getTime() - currentDate.getTime();
  let daysUntilTrip = timeDiff / (1000 * 3600 * 24);
  let roundedDaysUntilTrip = Math.ceil(daysUntilTrip);
  console.log("Days until trip: " + roundedDaysUntilTrip)
  dates.innerHTML = `Days until trip: ${roundedDaysUntilTrip}`

}


button.addEventListener("click", (e) => {
  e.preventDefault();
  fetchGeo();
  fetchDaysuntilTrip();
})



