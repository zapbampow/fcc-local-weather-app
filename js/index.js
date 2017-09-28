if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    //console.log(lat, long);

    var jsonAddress =
      "https://fcc-weather-api.glitch.me/api/current?lat=" +
      lat +
      "&lon=" +
      long;
    //console.log(jsonAddress);

    $.getJSON(jsonAddress, function(json) {
      //console.log(json.main.temp);
      var city = json.name;
      var country = json.sys.country;
      var tempC = Math.round(json.main.temp);
      var tempF = Math.round(tempC * 1.8 + 32);
      var tempDisplay = tempF;
      var weatherid = json.weather[0].id;
      var weatherDesc = json.weather[0].main;
      var weatherIcon;
      console.log(tempF);
      //console.log(city, country, tempC, tempF, weatherid);
      
      //Changes text to city, country, and temperature
      document.getElementById("location").innerHTML = city + ", " + country;
      document.getElementById("temp").innerHTML = tempDisplay  + "&deg; F";
      document.getElementById("description").innerHTML = weatherDesc;

      //Figures out what the weather is like and points to an icon to display    
      if (weatherid >= 200 && weatherid < 300) {
        weatherIcon = '<i class="wi wi-thunderstorm"></i>';
      } else if (weatherid >= 300 && weatherid < 400) {
        weatherIcon = '<i class="wi wi-sprinkle"></i>';
      } else if (weatherid >= 400 && weatherid < 500) {
        weatherIcon = '<i class="wi wi-showers"></i>';
      } else if (weatherid >= 500 && weatherid < 600) {
        weatherIcon = '<i class="wi wi-snow"></i>';
      } else if (weatherid >= 800 && weatherid < 900) {
        weatherIcon = '<i class="wi wi-day-sunny"></i>';
      } else {
        weatherIcon = '<i class="wi wi-alien"></i>';
      }

      //console.log(weatherIcon);
      //Adjusts the weather image based on what weather comes back
      document.getElementById("weather-icon").innerHTML = weatherIcon;
      
      //Code to change temp between Fahrenheit and Celcius
      $("#content-box").on("click", function(){
        
        if (tempDisplay == tempF){
          tempDisplay = tempC;
          document.getElementById("temp").innerHTML = tempDisplay  + "&deg; C"; 
        }
        else {
          tempDisplay = tempF;
          document.getElementById("temp").innerHTML = tempDisplay  + "&deg; F";
        }    
      });
      
    });
  });
}