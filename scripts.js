// check if browser supports service worker and register it
const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      await navigator.serviceWorker.register("sw.js");
      
    }
  };
  
registerServiceWorker();

//declare the urls
let random_url, search_url, categories_url, categories_search_url;
[random_url, search_url, categories_url, categories_search_url] = ["https://api.chucknorris.io/jokes/random", "https://api.chucknorris.io/jokes/search?query=animal", "https://api.chucknorris.io/jokes/categories", "https://api.chucknorris.io/jokes/random?category=animal"]

// define function to make the api calls
function send_request(url, callback_func) {
    //Create an XMLHttpRequest object
    xhr = new XMLHttpRequest();

    // Define a callback function to manipulate data
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback_func(this);
        }
    };
    
    $("#getJoke").click(function () {
        $("#joke").html(JSON.parse(xhr.responseText).value);
        
    });

    $("#getSearch").click(function () {
        const search_jokes = JSON.parse(xhr.responseText).result[5]["value"]
        $("#searchJoke").html(search_jokes);
        return false;
    });
    // Define request
    xhr.open("GET", url, true);

    //Send request
    xhr.send();

};

// define call back functions for DOM manipulation
function get_joke(xhr) {
    //Define random joke callback function
    $("#getJoke").click(function () {
        $("#joke").html(JSON.parse(xhr.responseText).value);
        
    });
    return false;
};

//Define random joke callback function
function search_joke(xhr) {
    $("#getSearch").click(function () {
        const search_jokes = JSON.parse(xhr.responseText).result[5]["value"]
        $("#searchJoke").html(search_jokes);
        return false;
    });
};

// Define category call back function
function set_categories(xhr) {
    var data = xhr.responseText.replace(/\[|\]/g,"").split(',');
    // Loop through the categories and append the categories to the select element
    for (var i = 0; i < data.length; i++) {
        $("#categories").append("<option value=" + data[i] + ">" + data[i] + "</option>");

    };
}

function choose_category(xhr) {
    //Set the category fields with category search result
    $("#categories").change(function () {
        $("#categoryJoke").html(JSON.parse(xhr.responseText).value);
        return false
    });
};

//Add search terms if found in input field
function jokeTerm() {
    $("#search").val() ? search_url = "https://api.chucknorris.io/jokes/search?query=" + $("#search").val() : {}
}

function categoryTerm (cat_term) {
    cat_term ? categories_search_url = "https://api.chucknorris.io/jokes/random?category=" + cat_term : {}
    
}


// Send the Api requests via the call back functions
send_request(random_url, get_joke);

send_request(search_url, search_joke);

send_request(categories_url, set_categories);

send_request(categories_search_url, choose_category);
