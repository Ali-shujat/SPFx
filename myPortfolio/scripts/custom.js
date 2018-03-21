function myFunction(){
  var x = document.getElementById("mySelect");
      var i = x.selectedIndex;
  switch (i) {
          case 0:
              var var0 = parseFloat(document.getElementById("inputId").value); //Celcius
              var var1 = var0 * 9 / 5 + 32;               //Celcius to far
              var var2 = var0 + 273.15;             //Celcius to kelvin
              var var3 = var1 + 459.67;              //Celcius to Rankine
              document.getElementById("out1").innerHTML = var0;
              document.getElementById("out2").innerHTML = var1.toFixed(2);
              document.getElementById("out3").innerHTML = var2;
              document.getElementById("out4").innerHTML = var3.toFixed(2);
              break;
          case 1:
              var var0 = parseFloat(document.getElementById("inputId").value);
              var var1 = (var0 - 32) * 5 / 9;                // fah to celsius
              var var2 = var1 + 273.15;                         //fah to kavin
              var var3 = var0 + 459.67;                          // fah to Ran
              document.getElementById("out1").innerHTML = var1.toFixed(2);
              document.getElementById("out2").innerHTML = var0;
              document.getElementById("out3").innerHTML = var2.toFixed(2);
              document.getElementById("out4").innerHTML = var3.toFixed(2);
              break;
          case 2:
              var var0 = parseFloat(document.getElementById("inputId").value); //Kelvin
              var var1 = var0 * 9/5 - 459.67              //Kelvin to far
              var var2 = var0 - 273.15;             // kelvin to Celcius 
              var var3 = var1 + 459.67;              //Kelvin to Rankine
              document.getElementById("out1").innerHTML = var2.toFixed(2);
              document.getElementById("out2").innerHTML = var1.toFixed(2);
              document.getElementById("out3").innerHTML = var0;
              document.getElementById("out4").innerHTML = var3.toFixed(2);
              break;
          case 3:
              var var0 = parseFloat(document.getElementById("inputId").value);
              var var1 = var0 - 459.67;               
              var var2 = ( var1 - 32) * 5 / 9; 
              var var3 = var1 + 273.15;
              document.getElementById("out1").innerHTML = var2.toFixed(2);
              document.getElementById("out2").innerHTML = var1;
              document.getElementById("out3").innerHTML = var3.toFixed(2);
              document.getElementById("out4").innerHTML = var0;
              break;
          default:
              document.getElementById("out2").innerHTML = "please select";
              break;
      }
  }
  //Dryg Net
  
  //                                  Deluppgift 1: Vem har namnsdag i dag?
  $(function(){
  $.ajax({
    async: true,
    url: 'https://api.dryg.net/dagar/v2.1/2018?callback',
    method: "GET",
  })
  .done(successFunction)
  .fail(failFunction)
  
    function successFunction(data) {
      moment.locale('sv');
      var day = moment().format("YYYY-MM-DD");
      
       for(var x in data.dagar){
           if(day==data.dagar[x].datum){
          $('.topYear').text(moment(data.dagar[x].datum).format("YYYY"));
          console.log(data.dagar[x].datum);
          $('.topWeek').text('v.'+data.dagar[x].vecka);
          $('.top').text(data.dagar[x].veckodag);
           $('.bottom').text(moment(data.dagar[x].datum).format("D"));
           $('.bottomMonth').text(moment(data.dagar[x].datum).format("MMMM"));
           $('.bottomName').text(data.dagar[x].namnsdag);
         }
       }
  
      }
      function failFunction(request, textStatus, errorThrown) {
        console.log('Funkar ej.. ');
      }
  
    });

  // //------------------------------- – Hämta ditt IP nummer
  
  $(function(){
  
  // it is another method to get data
  //   $.get("https://ipinfo.io", function(response) {
  //    $('#ipinfo').html('You IP address are : '+response.ip);
  //    $('#lonLat').html('Longnitute & Latitute : '+response.loc);
  //    $('#plats').html('Plats : '+response.city);
  //    $('#land').html('Land : '+response.region);
  //    $('#internetProvider').html('Internet Provider : '+response.org);
  
  //   console.log(response.ip, response.country);
  // }, "jsonp")
  
    $.ajax({
      async: true,
      url: ' http://ipinfo.io/json',
      method: "GET",
    })
      .done(succeFunction)
      .fail(faiFunction)
  
    function succeFunction(response) {
      $('#ipinfo').html('You IP address are : '+response.ip);
      $('#lonLat').html('Longnitute & Latitute : '+response.loc);
      $('#plats').html('Plats : '+response.city);
      $('#land').html('Land : '+response.region);
      $('#internetProvider').html('Internet Provider : '+response.org);
  
    }
    function faiFunction(request, textStatus, errorThrown) {
      console.log('Funkar ej.. ');
    }
  
  
  });
  
 