// Initialize app
var myApp = new Framework7();

// global variable to get the current ratio and use in geteuros or getDollars function
var exchangeratioUSDEUR;

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    getcurrency();
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})


function getcurrency(){

    // The XMLHttpRequest object, is the one in 
    // charge of handleing the request for us
    var http = new XMLHttpRequest();

    // The url to send the request to. Notice that we're passing
    // here some value of Latituted and longitude for the API 
    // to process
    const url = 'http://www.apilayer.net/api/live?access_key=08d50c3c6eff34145f7d641e6178d265';

    // Opening the request. Remember, we will send
    // a "GET" request to the URL define above
    http.open("GET", url);
    // Sending the request
    http.send();

    // Once the request has been processed and we have
    // and answer, we can do something with it
    http.onreadystatechange = (e) => {
        
        // First, I'm extracting the reponse from the 
        // http object in text format
        var response = http.responseText;

        // As we know that answer is a JSON object,
        // we can parse it and handle it as such
        var responseJSON = JSON.parse(response); 
    
        // Printing the result JSON to the console
        console.log(responseJSON);

        // Extracting the individual values, just as we
        // do with any JSON object. Just as we did 
        // with the position.
        // REMEMBER: In this case, we have an array inside 
        // the JSON object.
        var usd = responseJSON.quotes.USDEUR;

        // Formattng data to put it on the front end
        var oc = usd;
        exchangeratioUSDEUR = responseJSON.quotes.USDEUR;

        // Placing formatted data on the front end
        document.getElementById('currency').innerHTML = oc;
        console.log(oc);
    }
    
}

function converttodollars()
{
  //Getting the value of the total of euros sent by the end user
    var numberone = document.getElementById('euros').value;

    // calculating the value in dollars with the currentExcange ratio
    var convertdollars = numberone / exchangeratioUSDEUR;

    console.log(numberone);
    console.log(exchangeratioUSDEUR);
    console.log(convertdollars);

    //Sending the calculated data to front end
    document.getElementById('convertdollars').innerHTML = convertdollars;
}

function converttoeuros()
{
  //Getting the value of the total of dollars sent by the end user
    var numberone = document.getElementById('dollars').value;
// calculating the value in euros with the currentExcange ratio
    var converteuros = numberone * exchangeratioUSDEUR;

    console.log(numberone);
    console.log(exchangeratioUSDEUR);
    console.log(converteuros);
//Sending the calculated data to front end
    document.getElementById('converteuros').innerHTML = converteuros;
}



