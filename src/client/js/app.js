import axios from 'axios';

const button = document.querySelector("#button")

const apiUsername = 'luisdaniel';
const placeName = document.querySelector("#locationForm")

const fetchGeo = async () => {
  try {
    const response = await axios.get(`http://api.geonames.org/searchJSON?name=${placeName.value}&username=${apiUsername}`)
      .then(apidata => {
        console.log(apidata);
        const latitude = apidata.data.geonames[0].lat;
        const longitude = apidata.data.geonames[0].lng;
        const countryName = apidata.data.geonames[0].countryName;
        console.log(latitude);
        console.log(longitude);
        console.log(countryName)
      })


  } catch (error) {
    console.log(error);
  }
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  fetchGeo();
})

