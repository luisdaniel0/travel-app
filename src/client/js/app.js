let trip = {};

const getCountry = async (geonamesKEY) => {
  const response = await fetch(`http://api.geonames.org/searchJSON?username=luisdaniel&q=${trip.city}&maxRows=1`);
  try {
    const data = await response.json();
    console.log(data)
    trip.country = data.geonames[0].countryName;
  } catch (error) {
    trip.country = "ooops, country does not exist";
    console.log("error");
  }
}
getCountry();