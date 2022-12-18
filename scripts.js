
// check if browser supports service worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").then(() => console.log("registered service worker!"));
}

// install necessary apps and resources
const ASSETS = [
    "/images/chuck_norris.jpg",
    "https://api.chucknorris.io/jokes/random",
    "/"
];
//declare the urls
let random_url, search_url, categories_url, categories_search_url;
[random_url, search_url, categories_url, categories_search_url] = ["https://api.chucknorris.io/jokes/random", "https://api.chucknorris.io/jokes/search?query=animal", "https://api.chucknorris.io/jokes/categories", "https://api.chucknorris.io/jokes/random?category=animal"]

// add event listeners to update the search terms when entered by user
// document.getElementById("getSearch").addEventListener("click", function () {search_url += $("#search").val()});
// document.getElementById("categories").addEventListener("click", function () {search_url += $("#categories").val()});

// define function to make the api calls
function send_request(url, callback_func) {
    //Create an XMLHttpRequest object
    xhr = new XMLHttpRequest();

    // Define a callback function to manipulate data
    xhr.onreadystatechange = function() {
        callback_func(this);
    };

    // Define request
    xhr.open("GET", url, true);

    //Send request
    xhr.send();

};

// define call back functions
function get_joke() {
    //Define random joke callback function
    $("#getJoke").click(function () {
        $("#joke").html(JSON.parse(xhr.responseText).value);
    });
    
}

// Define search call back function
function searchJoke() {
    $(document).ready(function () {
        $("#getSearch").click(function () {
            search_url += $("#search").val();
            $("#searchjoke").html(JSON.parse(xhr.responseText).value);
        
        });
    })

}
        

// Define category call back function
function set_categories() {
    $(document).ready(function () {
        var data = xhr.responseText.replace(/\[|\]/g,'').split(',');
        
        // Loop through the categories and append the categories to the select element
        for (var i = 0; i < data.length; i++) {
            $("#categories").append("<option value=" + data[i] + ">" + data[i] + "</option>");

        };
    })
}

function choose_category() {
    $("#categories").change(function () { 
        //Set the category fields with category search result
        $("#categories").change(function () {
            $("#categories").click(function () {
                $("#categoryJoke").html(JSON.parse(xhr.responseText).value);

            });
        });
    })
};

// Send the Api requests via the call back functions
send_request(random_url, get_joke);

send_request(search_url, searchJoke);

send_request(categories_url, set_categories);

send_request(categories_search_url, choose_category);
