// check if browser supports service worker and register it
const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      await navigator.serviceWorker.register("sw.js");
      
    }
  };
  
registerServiceWorker();

// define function to get a joke from API
function apiRequest(usr_link, usr_content) {
    $.ajax({
        // The URL to the API.
        url: usr_link, 
        // The HTTP Method
        type: "GET",
        // The type of data you expect back from the server
        dataType: "json",
        // On success
        success: function (data) {
            // Set the HTML content with the data that came from the server
            if(usr_content === "#searchJoke") {
                $(usr_content).html(data.result[0].value);
            }else {
                $(usr_content).html(data.value);
            }
        }
    });
}

// define function to get categories from API and set category options 
function setCategories(usr_link, usr_element) {
    $.ajax({
        url: usr_link, // The URL to the API. You can get this in the API page of the API you intend to consume
        type: "GET",
        dataType: "json",
        // On success
        success: function (data) {
            //Loop through the categories
            for (var i = 0; i < data.length; i++) { 
                //Append the categories to the select element
                $(usr_element).append("<option value='" + data[i] + "'>" + data[i] + "</option>");
            }
        }
    });
}

// define a function that encapsulates the logic for making an Ajax request.
function ajaxCall() { 
    // when the document is ready
    // Set on click button listeners
    $(document).ready(function () {
        
        // on "Get Joke" button click
        $("#getJoke").click(function () {
            // Get a random joke from the API
            let usr_link = "https://api.chucknorris.io/jokes/random";
            let usr_content = "#joke";
            apiRequest(usr_link, usr_content);
        });

        // on "Search" button click
        $("#getSearch").click(function () {
            // get user input
            var search = $("#search").val();
            //Search for a joke with the search term
            let usr_link = "https://api.chucknorris.io/jokes/search?query=" + search;
            let usr_content = "#searchJoke";
            apiRequest(usr_link, usr_content);
        });
        
        // Set the category options
        $(document).ready(function () {
            let usr_link = "https://api.chucknorris.io/jokes/categories";
            let usr_element = "#categories";
            setCategories(usr_link, usr_element);
        });

        // Display joke based on category change
        $("#categories").change(function () {
            // get the chosen category
            var category = $("#categories").val();
            let usr_link = "https://api.chucknorris.io/jokes/random?category=" + category;
            let usr_content = "#categoryJoke";
            apiRequest(usr_link, usr_content);
        });
    });
}