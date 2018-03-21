$(function () {
    $("button").click(function () {
        $.ajax({
            async: true,
            url: 'https://api.fixer.io/latest ',
            method: "GET",
        })
            .done(successFunction)
            .fail(failFunction)

        function successFunction(data) {

            var sek = data.rates.SEK;
            var nor = data.rates.NOK;
            var dkk = data.rates.DKK;
            var gbp = data.rates.GBP;
            var usd = data.rates.USD;
            var cad = data.rates.CAD;
            var pkr = data.rates.INR;
            var temp = $('#curr_number').val();
            console.log(temp);
            $(".pkrSek").text(((pkr / sek) * temp * 1.7).toFixed(3));
            $(".canSek").text(((cad / sek) * temp).toFixed(3));
            $(".usaSek").text(((usd / sek) * temp).toFixed(3));
            $(".norSek").text(((nor / sek) * temp).toFixed(3));
            $(".denSek").text(((dkk / sek) * temp).toFixed(3));
            $(".engSek").text(((gbp / sek) * temp).toFixed(3));

            console.log(nor);
            console.log(dkk);
            console.log(gbp);
            console.log(usd);
            console.log(cad);
        }
        function failFunction(request, textStatus, errorThrown) {
            console.log('Funkar ej.. ');
        }
    });
});
// random Quotes
$(document).ready(function() {
    //fteching quotes from github file
    $("#get-another-quote-button").on("click", function() {
      $.getJSON("https://gist.githubusercontent.com/AbhishekChd/ab9949b618fcbf58ac84f9c8e88d6688/raw/90916f0d09a295eb5b2eea6c29a648e8c60b0e6f/5769a491e4b01190df7a9a70.json", function(json) {
        var content = "",
          author = "",
          num = Math.floor(Math.random() * 20);
        content = json[num]["content"]
        author = json[num]["author"];
        $("#quote").html(content);
        $("#author").html("- " + author);
      });
    });
    /*  end of quote share ===============*/
    
    //twitter share
    $("#social-btn-twitter").on("click",function(){
        var text = document.getElementById('quote').innerHTML+' '+document.getElementById('author').innerHTML;
      var link= "https://twitter.com/intent/tweet?text="+text+"&hashtags=quote";
      window.open(link,'_blank');
    });
    /*end of twitter share =============*/
    
  });