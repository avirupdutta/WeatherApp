
$(document).ready(function () { 
  var term;

  $('#location').keypress(function (e) {
    var key = e.which;
    if(key == 13){
        term = $('#location').val();
        document.getElementById('location').value = '';
        if (term != undefined && term != null && term != '' && term != ' ')
            searchLocation(term);
            e.preventDefault();
    }
  });
  $('#searchBtn').click(function (e) { 
      e.preventDefault();
      term = $('#location').val();        
      document.getElementById('location').value = '';
      if (term != undefined && term != null && term != '' && term != ' ')
              searchLocation(term);
  });

  function searchLocation(currentLocation) {
    $('#errorMessage').html("");
    axios({
        method:'get',
        url:`http://api.openweathermap.org/data/2.5/weather?q=${currentLocation}&appid=9fbc7ccff6470a8201aaac9d32862582&units=metric`
      })
        .then(function(response) {
        console.log(response.data.name);
        console.log(response.data.main.temp + String.fromCharCode(176) + 'C');
      })
      .catch(function (error) {
        console.log(error);
        $('#errorMessage').html("Sorry, location Not Found! <br><i class=\"far fa-sad-tear\"></i>");
      });
  }


 });
