$(document).ready(function() {

  var term;
  var getlocation = $("#getlocation"); // MAIN LOCATION
  var locationStatus = $("#mainType"); // WHETHER ITS HAZE, SMOKY, SUNNY .... ETC
  var showTemp = $("#showTemp"); // WILL SHOW EXACT TEMP
  var shortNews = $("#shortNews"); // WILL SHOW THE SHORT REPORT SUMMARY
  var dataTable = $("#dataTable"); // DATA TABLE WITH DETAILED INFO
  var content = $("#contentContainer");
  var loader = $("#loader");
  var icons = [
    { type: "Haze", icon: '<i class="fas fa-cloud-sun"></i>' },
    { type: "Rain", icon: '<i class="fas fa-cloud-showers-heavy"></i>' },
    { type: "Smoke", icon: '<i class="fas fa-smog"></i>' },
    { type: "Clouds", icon: '<i class="fas fa-cloud"></i>' },
    { type: "Clear", icon: '<i class="fas fa-sun"></i>' },
    { type: "Snow", icon: '<i class="far fa-snowflake"></i>' },
    { type: "Other", icon: '<i class="fas fa-wind"></i>' }
  ];

  // TEMPORARILY HIDING HTML DATA
  function clearScreen() {
    getlocation.html("");
    locationStatus.html("");
    showTemp.html("");
    shortNews.html("");
    dataTable.hide();
    $("#errorMessage").hide();
    content.hide();
    loader.hide();
  }

  clearScreen();

  $("#location").keypress(function(e) {
    var key = e.which;
    if (key == 13) {
      term = $("#location").val();
      document.getElementById("location").value = "";
      if (term != undefined && term != null && term != "" && term != " ")
        clearScreen();
      searchLocation(term);
      e.preventDefault();
    }
  });
  $("#searchBtn").click(function(e) {
    e.preventDefault();
    term = $("#location").val();
    document.getElementById("location").value = "";
    if (term != undefined && term != null && term != "" && term != " ")
      clearScreen();
    searchLocation(term);
  });

  function searchLocation(currentLocation) {
    $("#errorMessage").html("");
    loader.show();
    axios({
      method: "get",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${currentLocation}&appid=9fbc7ccff6470a8201aaac9d32862582&units=metric`
    })
      .then(function(response) {
        loader.hide();
        content.show();

        var weatherData = response.data;
        getlocation.html(`${weatherData.name}`);
        var weatherType = weatherData.weather[0].main;

        locationStatus.html(`${weatherType}`);

        for (var i = 0; i < icons.length; i++) {
          if (icons[i].type === weatherType) {
            break;
          } else if (icons[i].type !== weatherType && i == icons.length - 1) {
            weatherType = "Other";
          }
        }

        console.log(weatherType);
        for (var i = 0; i < icons.length; i++) {
          if (icons[i].type === weatherType) {
            $("#weatherIcon").html(icons[i].icon);
          }
        }

        showTemp.html(`${response.data.main.temp + String.fromCharCode(176)}C`);
        shortNews.html(
          `Today: ${
            weatherData.weather[0].main
          } currently. The low will be ${weatherData.main.temp_min +
            String.fromCharCode(176)}C and high will be ${weatherData.main
            .temp_max + String.fromCharCode(176)}C.`
        );
        dataTable.show();
        dataTable.html(`
      <div class="col text-center details">
        <ul id="detailTopics">
            <li>Pressure</li>
            <li>Humidity</li>
            <li>Min Temp</li>
            <li>Max Temp</li>
            <li>Wind</li>
        </ul>
      </div>
      <div class="col text-center data">
        <ul id="detailData">
            <li>${weatherData.main.pressure} pa</li>
            <li>${weatherData.main.humidity}%</li>
            <li>${weatherData.main.temp_min + String.fromCharCode(176)}C</li>
            <li>${weatherData.main.temp_max + String.fromCharCode(176)}C</li>
            <li>${weatherData.wind.speed} m/s</li>
        </ul>
      </div>
      `);
        $(this.dataTable).addClass("data-table");

        console.log(response);
        console.log(response.data.name);
        console.log(response.data.main.temp + String.fromCharCode(176) + "C");
      })
      .catch(function(error) {
        console.log(error);
        content.show();
        loader.hide();
        $("#weatherIcon").hide();
        $("#errorMessage").show();
        $("#errorMessage").html(
          "Sorry, location Not Found! <br> <i class='far fa-frown-open'></i>"
        );
      });
  }
});
