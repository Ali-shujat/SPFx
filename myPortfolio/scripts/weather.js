

$(document).ready(function () {
    //instantiate variables
    $location = $("#location");
    $weather = $("#weather");
    $type = $("#type");
    $temp = $("#temp");
    $degree = $("#degree");
    $unit = $("#unit");
    $todaysIcon = $("#todaysIcon");

    //ajax call function
    function ajax(URL, callback) {
        return $.ajax({
            url: URL,
            dataType: 'json',
            success: callback
        });
    }

    $.ajax({
        // url: "https://geoip-db.com/jsonp",
        url: "https://freegeoip.net/json/",
        jsonpCallback: "callback",
        dataType: "jsonp",
        success: function (location) {
            locationCallback(location)
        }
    });
    //call location API, run callback
    // ajax("https://geoip-db.com/jsonp");

    //callback function for location API, including weather API call
    function locationCallback(locObj) {
        console.log("city is " + locObj.city);
        $location.html(locObj.city);
        var coords = [locObj.latitude, locObj.longitude];
        // call weather API using location data
        ajax("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + coords[0] +
            "&lon=" + coords[1] +
            "&APPID=184529f2144f13de78724759ad14142d", todaysWeatherCallback);
        ajax("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + coords[0] +
            "&lon=" + coords[1] +
            "&cnt=5&APPID=184529f2144f13de78724759ad14142d", fiveDayCallback);

    }

    //callback function for weather API
    function todaysWeatherCallback(weatherObj) {
        var tempC = Math.round(weatherObj.main.temp - 273.15);
        tempF = Math.round((tempC * (9 / 5)) + 32);
        $type.html(titleCase(weatherObj.weather[0].description) + " |");

        $degree.html(tempF);
        $unit.html("&deg;F");
        $todaysIcon.addClass(getIcon(weatherObj.weather[0].icon));
        setTheme(weatherObj.weather[0].icon);

    }
    var daysChart = [];//for popupchart
    var highTempChart = [];//for popupchart
    var lowTempChart = [];//for popupchart
    function fiveDayCallback(weatherObj) {
        console.log(weatherObj);
        $.each(weatherObj.list, function (i, obj) {
            var high = Math.round((obj.temp.max - 273.15) * (9 / 5) + 32);
            highTempChart[i] = high; //for popupchart
            var low = Math.round((obj.temp.min - 273.15) * (9 / 5) + 32);
            lowTempChart[i] = low; //for popupchart
            var icon = getIcon(obj.weather[0].icon);
            var day = "#day" + (i + 1);

            var weather = obj.weather[0].main;
            $(day).html("<p>" + getDay(i + 1) + "</p>");
            daysChart[i] = (getDay(i + 1)); //for popupchart

            $(day).append("<i class=\"wi " + icon + "\"></i>");
            $(day).append("<p class=\"small-weather\">" + weather + "</p>");

            $(day).append("<p class=\"high-low\">" + high + "&deg;F | " + low + "&deg;F</p>");
            // $("#main").fadeIn();

        });
    }
    //  console.log(daysChart);
    //get weather icon function
    function getIcon(icon) {
        switch (icon) {
            case "01d":
                return "wi-day-sunny";
            case "01n":
                return "wi-night-clear";
            case "02d":
                return "wi-day-sunny-overcast";
            case "02n":
                return "wi-night-alt-partly-cloudy";
            case "03d":
                return "wi-day-cloudy";
            case "03n":
                return "wi-night-cloudy";
            case "04d":
                return "wi-cloudy";
            case "04n":
                return "wi-cloudy";
            case "09d":
                return "wi-day-showers";
            case "09n":
                return "wi-night-showers";
            case "10d":
                return "wi-day-rain";
            case "10n":
                return "wi-night-rain";
            case "11d":
                return "wi-day-thunderstorm";
            case "11n":
                return "wi-night-thunderstorm";
            case "13d":
                return "wi-day-snow";
            case "13n":
                return "wi-night-snow";
            case "50d":
                return "wi-day-fog";
            case "50n":
                return "wi-night-fog";
        }
    }

    // set background color and font color
    function setTheme(weatherIcon) {
        switch (weatherIcon) {
            case "01d":
                $("#main").css("color", "white");
                $("#main").css("background", "skyblue");
                $("#todaysIcon").css("color", "#FF9");
                $("#todaysIcon").css("margin-bottom", "15px");
                $("#todaysIcon").addClass("glyphicon-spin");
                break;
            case "01n":
                $("#main").css("color", "white");
                $("#main").css("background", "#546bab");
                $("#todaysIcon").css("color", "#FFFF99");
                $("#todaysIcon").css("margin-bottom", "15px");
                $("#todaysIcon").addClass("glyphicon-rock");
                break;
            case "02d":
                $("#main").css("color", "black");
                $("#main").css("background", "#A4A09B");
                $("#todaysIcon").addClass("glyphicon-slide");
                $("#todaysIcon").css("color", "#414141");
                break;
            case "02n":
                $("#main").css("color", "black");
                $("#main").css("background", "#87889c");
                $("#todaysIcon").css("top", "-5px");
                $("#todaysIcon").addClass("glyphicon-slide");
                $("#todaysIcon").css("color", "#414141");
                break;
            case "03d":
                $("#main").css("color", "black");
                $("#main").css("background", "#A4A09B");
                $("#todaysIcon").addClass("glyphicon-slide");
                $("#todaysIcon").css("color", "#414141");
                break;
            case "03n":
                $("#main").css("color", "black");
                $("#main").css("background", "#87889c");
                $("#todaysIcon").css("top", "2px");
                $("#todaysIcon").addClass("glyphicon-slide");
                $("#todaysIcon").css("color", "#414141");
                break;
            case "04d":
                $("#main").css("color", "black");
                $("#main").css("background", "#A4A09B");
                $("#todaysIcon").addClass("glyphicon-slide");
                $("#todaysIcon").css("color", "#414141");
                $("#todaysIcon").css("top", "2px");
                break;
            case "04n":
                $("#main").css("color", "black");
                $("#main").css("background", "#87889c");
                $("#todaysIcon").css("top", "0px");
                $("#todaysIcon").addClass("glyphicon-slide");
                $("#todaysIcon").css("color", "#414141");
                break;
            case "09d":
                $("#main").css("color", "black");
                $("#main").css("background", "#6d6d6d");
                $("#todaysIcon").css("margin-bottom", "20px").css("margin-top", "5px");
                $("#todaysIcon").css("color", "#414141").addClass("glyphicon-slide");
                break;
            case "09n":
                $("#main").css("color", "black");
                $("#main").css("background", "#87889c");
                $("#todaysIcon").css("top", "-5px");
                $("#todaysIcon").css("color", "#414141").addClass("glyphicon-slide");
                break;
            case "10d":
                $("#main").css("color", "black");
                $("#main").css("background", "#6d6d6d");
                $("#todaysIcon").css("margin-bottom", "20px").css("margin-top", "5px");
                $("#todaysIcon").css("color", "#414141").addClass("glyphicon-slide");
                break;
            case "10n":
                $("#main").css("color", "black");
                $("#main").css("background", "#87889c");
                $("#todaysIcon").css("top", "-5px");
                $("#todaysIcon").css("color", "#414141").addClass("glyphicon-slide");
                break;
            case "11d":
                $("#main").css("color", "black");
                $("#main").css("background", "#6d6d6d");
                $("#todaysIcon").css("margin-bottom", "20px").css("margin-top", "5px");
                $("#todaysIcon").css("color", "#414141").addClass("glyphicon-slide");
                break;
            case "11n":
                $("#main").css("color", "black");
                $("#main").css("background", "#87889c");
                $("#todaysIcon").css("top", "-5px");
                $("#todaysIcon").css("color", "#414141").addClass("glyphicon-slide");
                break;
            case "13d":
                $("#main").css("color", "black");
                $("#main").css("background", "#D1DDDD");
                $("#todaysIcon").css("margin-bottom", "20px").css("margin-top", "5px");
                $("#todaysIcon").addClass("glyphicon-slide");
                break;
            case "13n":
                $("#main").css("color", "white");
                $("#main").css("background", "#031B35");
                $("#todaysIcon").css("margin-bottom", "20px");
                $("#todaysIcon").addClass("glyphicon-slide");
                break;
            case "50d":
                $("#main").css("color", "white");
                $("#main").css("background", "#A9AEB2");
                $("#todaysIcon").css("margin-bottom", "10px").css("margin-top", "10px");
                $("#todaysIcon").addClass("glyphicon-slide");
                break;
            case "50n":
                $("#main").css("color", "#3B4044");
                $("#main").css("background", "#87889c");
                $("#todaysIcon").css("margin-bottom", "10px");
                $("#todaysIcon").addClass("glyphicon-slide");
                break;
        }
    }

    //click handler for temperature conversion
    $temp.on("click", $unit, function () {
        convertMain();
        convertWeekly();


    });

    $(".forecast").on("click", ".high-low", function () {
        convertMain();
        convertWeekly();
    })

    // convert temperature function
    function convertTemp(degree, unit) {
        if (unit.includes("F")) {
            var newDegree = Math.round((degree - 32) * (5 / 9));
            unit = "C";
        } else {
            var newDegree = Math.round((degree * (9 / 5)) + 32);
            unit = "F"
        }

        return [newDegree, unit];
    }

    function titleCase(str) {
        words = str.toLowerCase().split(' ');

        for (var i = 0; i < words.length; i++) {
            var letters = words[i].split('');
            letters[0] = letters[0].toUpperCase();
            words[i] = letters.join('');
        }
        return words.join(' ');
    }

    function getDay(number) {
        var d = new Date();
        var today = d.getDay();
        var forecastedDay = today + number;

        if (forecastedDay > 6) {
            forecastedDay -= 7;
        }

        switch (forecastedDay) {
            case 0:
                return "Sunday";
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
        }
    }

    function convertMain() {
        var unit = $unit.html();
        var degree = $degree.html();
        var newTemp = convertTemp(degree, unit);
        $degree.html(newTemp[0]);
        $unit.html("&deg;" + newTemp[1]);
    }

    function convertWeekly() {
        var elements = document.getElementsByClassName("high-low");
        for (var i = 0, len = elements.length; i < len; i++) {

            var tempsre = /-?\d+/g;
            var unitre = /[FC]/

            var temp = elements[i].innerHTML;
            var temps = temp.match(tempsre);
            var unit = temp.match(unitre);
            // console.log("High is " + temps[0] + " and low is " + temps[1]);
            // console.log ("Unit is " + unit[0]);

            var newHigh = convertTemp(temps[0], unit[0]);
            var newLow = convertTemp(temps[1], unit[0]);

            var newTemps = newHigh[0] + "&deg;" + newHigh[1] + " | " + newLow[0] + "&deg;" + newLow[1];
            console.log(newHigh[0], newLow[0]);// get data fromhere shujat 
            highTempChart[i] = newHigh[0];
            lowTempChart[i] = newLow[0]

            elements[i].innerHTML = newTemps;
        }
    }
    // my code begin

//     function fiveDayChart(weatherObj) {
//         var ctx = document.getElementById("myChart").getContext('2d');
//         var myChart = new Chart(ctx, {
//             type: 'line',
//             data: {
//                 labels: daysChart,//["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//                 datasets: [{
//                     label: "High Temperature",
//                     backgroundColor: 'rgb(255, 0, 0)',
//                     borderColor: 'rgb(255, 99, 132)',
//                     fill: false,
//                     data: highTempChart,  // [14,13,16,17,12,18,16],   
//                 }, {
//                     label: "Low Temperature",
//                     backgroundColor: 'rgb(0, 0, 255)',
//                     borderColor: 'rgb(115, 99, 132)',
//                     fill: false,
//                     data: lowTempChart,   //[12,13,14,19,16,12,14], 
//                 }]
//             },
//             options: {
//                 elements: {
//                     line: { tension: 0, }// disables bezier curves
//                 },
//                 scales: {
//                     xAxes: [{
//                         display: true,
//                         scaleLabel: {
//                             display: true,
//                             labelString: 'Next 5 Days'
//                         }
//                     }],
//                     yAxes: [{
//                         display: true,
//                         scaleLabel: {
//                             display: true,
//                             labelString: 'Temperature'
//                         },
//                         ticks: {
//                             min: -25,
//                             max: 50,
//                             // forces step size to be 5 units
//                             stepSize: 5
//                         }
//                     }]
//                 }
//             }
//         });
//     }
//     $("#popupData").click(fiveDayChart);
 });

$(document).ready(function() {
    const dt = new Date();
    const getIP = "https://freegeoip.net/json/";
    // https://freegeoip.net/json/";
    // https://geoip-db.com/json/

    const url = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather";
    const weatherApiKey = "364862038984a82f816fa1c3262254d6";
    var days = [      "Sunday",      "Monday",      "Tuesday",      "Wednesday",      "Thursday",      "Friday",      "Saturday"    ];

    var date = dt.getDate() + "." + (dt.getMonth() + 1) + "." + dt.getFullYear();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
  
    $.getJSON(getIP, function(data) {
      $(document).trigger("location_found", [data]);
    });
  
    function getCardinal(angle) {
      //easy to customize by changing the number of directions you have
      var directions = 8;
  
      var degree = 360 / directions;
      angle = angle + degree / 2;
  
      if (angle >= 0 * degree && angle < 1 * degree) return "N";
      if (angle >= 1 * degree && angle < 2 * degree) return "NE";
      if (angle >= 2 * degree && angle < 3 * degree) return "E";
      if (angle >= 3 * degree && angle < 4 * degree) return "SE";
      if (angle >= 4 * degree && angle < 5 * degree) return "S";
      if (angle >= 5 * degree && angle < 6 * degree) return "SW";
      if (angle >= 6 * degree && angle < 7 * degree) return "W";
      if (angle >= 7 * degree && angle < 8 * degree) return "NW";
      //Should never happen:
      return "N";
    }
  
    $(document).on("location_found", getWeather);
  
    function getWeather(e, location) {
      $.ajax({
        url: url,
        dataType: "json",
        data: {
          lat: location.latitude,
          lon: location.longitude,
          units: "metric",
          APPID: weatherApiKey
        },
        success: function(response) {
          console.log(response);
          var imageURL ="https://source.unsplash.com/1920x1080/?" + escape(response.weather[0].description);
          var sunrise = new Date(response.sys.sunrise * 1000);
          var sunset = new Date(response.sys.sunset * 1000);
          $("#sunrise").html(
            "<i class='wi wi-sunrise'></i>" + sunrise.getHours() +":" + sunrise.getMinutes() + " AM"
          );
          $("#sunset").html(
            "<i class='wi wi-sunset'></i>" +
              sunset.getHours() +
              ":" +
              sunset.getMinutes() +
              " PM"
          );
          $("#humidity").html(
            "<i class='wi wi-humidity'></i>" + response.main.humidity + " %"
          );
          $("#pressure").html(
            "<i class='wi wi-barometer'></i>" + response.main.pressure + " hPa"
          );
          $("#wind").html(
            "<i class='wi wi-strong-wind'></i>" + response.wind.speed + " m/s"
          );
          $("#wind-direction").html(
            "<i class='wi wi-wind from-" +
              Math.round(response.wind.deg) +
              "-deg'></i>" +
              getCardinal(response.wind.deg)
          );
          $(".weatherbox").css("background-image", 'url("' + imageURL + '")');
          $(".condition").html(
            '<i class="wi wi-owm-' +
              response.weather[0].id +
              '"></i>' +
              response.weather[0].description
          );
          $(".temp").html(Math.ceil(response.main.temp));
          $(".city").html(response.name);
        }
      });
    }
    $(".day").html(days[dt.getDay()] + ", ");
    $(".date").html(date);
  });
  