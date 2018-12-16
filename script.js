
$(document).ready(function () { 
  var term;
  var getlocation = $('#getlocation');    // MAIN LOCATION
  var locationStatus = $('#mainType');    // WHETHER ITS HAZE, SMOKY, SUNNY .... ETC
  var showTemp = $('#showTemp');          // WILL SHOW EXACT TEMP
  var shortNews = $('#shortNews');        // WILL SHOW THE SHORT REPORT SUMMARY
  var dataTable = $('#dataTable');        // DATA TABLE WITH DETAILED INFO

  // TEMPORARILY HIDING HTML DATA

  function clearScreen() { 
    getlocation.html('');
    locationStatus.html('');
    showTemp.html('');
    shortNews.html('');
    dataTable.hide();
    $('#errorMessage').hide();
   }

  clearScreen();

  $('#location').keypress(function (e) {
    var key = e.which;
    if(key == 13){
        term = $('#location').val();
        document.getElementById('location').value = '';
        if (term != undefined && term != null && term != '' && term != ' ')
            clearScreen();
            searchLocation(term);
            e.preventDefault();
    }
  });
  $('#searchBtn').click(function (e) { 
      e.preventDefault();
      term = $('#location').val();        
      document.getElementById('location').value = '';
      if (term != undefined && term != null && term != '' && term != ' ')
              clearScreen();
              searchLocation(term);
  });

  function searchLocation(currentLocation) {
    $('#errorMessage').html("");
    axios({
        method:'get',
        url:`http://api.openweathermap.org/data/2.5/weather?q=${currentLocation}&appid=9fbc7ccff6470a8201aaac9d32862582&units=metric`
    }).then(function(response) {
      
      var weatherData = response.data; 

      getlocation.html(`${weatherData.name}`);
      locationStatus.html(`${weatherData.weather[0].main}`);
      showTemp.html(`${response.data.main.temp + String.fromCharCode(176) }C`);
      shortNews.html(`Today: ${weatherData.weather[0].main} currently. The low will be ${weatherData.main.temp_min + String.fromCharCode(176)}C and high will be ${weatherData.main.temp_max + String.fromCharCode(176)}C.`);
      dataTable.show();
      dataTable.html(`
      <div class="col text-center details">
        <ul id="detailTopics">
            <li>&nbsp;</li>
            <li>Humidity</li>
            <li>Pressure</li>
            <li>Min Temp</li>
            <li>Max Temp</li>
            <li>Wind Speed</li>
        </ul>
      </div>
      <div class="col text-center data">
        <ul id="detailData">
            <li>&nbsp;</li>
            <li>${weatherData.main.pressure} pa</li>
            <li>${weatherData.main.humidity}%</li>
            <li>${weatherData.main.temp_min + String.fromCharCode(176)}C</li>
            <li>${weatherData.main.temp_max + String.fromCharCode(176)}C</li>
            <li>${weatherData.wind.speed} m/s</li>
        </ul>
      </div>
      `);
      $(this.dataTable).addClass('data-table');

      console.log(response);
      console.log(response.data.name);
      console.log(response.data.main.temp + String.fromCharCode(176) + 'C');
       
      }).catch(function (error) {
        console.log(error);
        $('#errorMessage').show();
        $('#errorMessage').html("Sorry, location Not Found! <br><i class=\"far fa-sad-tear\"></i>");
      });
  }


 });
