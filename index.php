<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Weather App</title>
    <!-- <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous"> -->
    <link rel="stylesheet" href="https://bootswatch.com/4/lux/bootstrap.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link rel="stylesheet" href="custom-style.css">
</head>
<body>

    <!-- for Search -->
    <div class="">
        <div class="jumbotron">
            <form class="justify-content-center form-inline my-2 my-lg-0"  action="" id="searchForm">
              <input class="form-control text-center mr-sm-2" type="text" id="location" placeholder="Search..." autocomplete autofocus>
            </form>
        </div>
    </div>

    <!-- Loader -->
    <div id="loader"></div>

    <!-- Weather  Informations-->
    <div class="container" id="contentContainer">
        <div class="error">
            <h5 class="text-center display-4 " id="errorMessage"></h5>
        </div>
        <div id="weather" class="row pt-4">
            <!-- <div class="col">
                <img src="img/cloudy.jpg" alt="image-placeholder" class="img" id="setImg">
            </div> -->
            <div class="col">

                <div class="row">
                    <div class="col p-3">
                        <ul>
                                <li class="location text-center">
                                    <h1 id="getlocation"></h1>
                                </li>
                                <li class="main text-center">
                                    <h5 class="main-type" id="mainType"></h5></li>
                                    <h1 class="show-temp text-center" id="showTemp"></h1>
                        </ul>
                    </div>
                    <div class="col weather-icon">
                        <span id="weatherIcon"></span>
                    </div>
                </div>

                
                <div class="desc text-center" id="shortNews"></div>
                <div class="row" id="dataTable">
                </div>
            </div>
        </div>
    </div>
    
    

    <!-- JQUERY -->
        <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <!-- AXIOS -->
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <!-- MAIN SCRIPT -->
    <script src="script.js"></script>

</body>
</html>