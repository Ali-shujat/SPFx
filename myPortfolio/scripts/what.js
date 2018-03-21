
// /* Lägg till den JS du behöver för uppgifterna här nedan, när du är klar med en övning så kommentera ut den, och lägg in JS för nästa övning osv.. */

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
        return(false);
    }
    /* ------------------------------------------------------------*/
    /*----------------- calculator------------------------------*/
    /* ------------------------------------------------------------*/
    var Memory  = "0";      // initialise memory variable
    var Current = "0";      //   and value of Display ("current" value)
    var Operation = 0;      // Records code for eg * / etc.
    var MAXLENGTH = 30;     // maximum number of digits before decimal!
    var dig;
    var op;
    
    function AddDigit(dig)          //ADD A DIGIT TO DISPLAY (kept as 'Current')
    {
        if (Current.length > MAXLENGTH) {
            Current = "Aargh! Too long"; //limit length
        } else {
            if ((eval(Current) == 0)
                && (Current.indexOf(".") == -1)
            ) {
                Current = dig;
            } else {
                Current = Current + dig;
            };
        }
        console.log (Current);
        document.getElementById("demo").innerHTML = Current;
    }
    
    function Clear()                //CLEAR ENTRY
    {
        Current = "0";
        document.getElementById("demo").innerHTML = Current;
    }
    function Operate(op)            //STORE OPERATION e.g. + * / etc.
    {
     if (op.indexOf("*") > -1) { Operation = 1; };       //codes for *
     if (op.indexOf("/") > -1) { Operation = 2; };       // slash (divide)
     if (op.indexOf("+") > -1) { Operation = 3; };       // sum
     if (op.indexOf("-") > -1) { Operation = 4; };       // difference
    
     Memory = Current;                 //store value
     Current = "";                     //or we could use "0"
     document.getElementById("demo").innerHTML = op;
    }
    function Calculate()            //PERFORM CALCULATION (= button)
    { 
     if (Operation == 1) { Current = eval(Memory) * eval(Current); };
     if (Operation == 2) { Current = eval(Memory) / eval(Current); };
     if (Operation == 3) { Current = eval(Memory) + eval(Current); };
     if (Operation == 4) { Current = eval(Memory) - eval(Current); };
     Operation = 0;                //clear operation
     Memory    = "0";              //clear memory
     document.getElementById("demo").innerHTML = Current;
    }


// skills Bar
jQuery(document).ready(function(){
	jQuery('.skillbar').each(function(){
		jQuery(this).find('.skillbar-bar').animate({
			width:jQuery(this).attr('data-percent')
		},6000);
	});
});