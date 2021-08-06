document.addEventListener("click", function (event) {
     if (!event.target.matches("#button")) return;

  /*
  Here we send a request to the API
  Then process the response into JSON
  Then pass the data to our renderJoke function.
  */
  fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => response.json())
    .then((data) => renderCountryInfo(data))
    .catch(() => renderError());
});

function renderCountryInfo(data) {
    // Get text elements
    var countryIndex = getRandomNumber();
    const countryName = document.getElementById("country-name");
    const countryCapital = document.getElementById("country-capital");
    const countryLanguage = document.getElementById("country-language");
    const countryCurrency = document.getElementById("country-currency");
    const countryFlag = document.getElementById("country-flag");
    
    // Set Country Stats
    countryName.innerHTML = data[countryIndex].name;
    countryCapital.innerHTML = "Capital: " + data[countryIndex].capital;
    countryLanguage.innerHTML = "Language(s): ";
    // Loops through country languages because many have multiple
    data[countryIndex].languages.forEach(function (language) {
        countryLanguage.innerHTML += ""+ language.name + "<br> ";
    });
    // Loops through country currencies
    countryCurrency.innerHTML = "Currency: " ;
    data[countryIndex].currencies.forEach(function (currency) {
        countryCurrency.innerHTML +=  currency.name + "<br>";
    });
    //Add country flag image
    countryFlag.innerHTML = "<img src=" + data[countryIndex].flag + ">";

    //Checking Latitude
    
    var latitude = data[countryIndex].latlng[0];
    console.log(latitude);
    setBgImage(latitude);
    
    


    const error = document.getElementById("error");
    // Hide error
    error.innerHTML = "";
     
}

// function renderError() {
//   const error = document.getElementById("error");
//   error.innerHTML = "Whoops, something went wrong. Please try again later!";
// }

function getRandomNumber() {
    return Math.floor(Math.random() * 250);
}

// function setBgImage(lat) {
//     var l = Math.abs(lat);
//     if (l < 23.26) {
//         document.getElementById("content-container").style.backgroundImage = "url('img/palm.jpg')";
//     }
//     else if (l > 23.26 && l < 35) {
//         document.getElementById("content-container").style.backgroundImage = "url('img/subtropics.jpg')";
//     }
// }
 