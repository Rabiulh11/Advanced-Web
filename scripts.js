// Send the Api requests via the call back functions
send_request("https://api.chucknorris.io/jokes/random", get_joke);

send_request("https://api.chucknorris.io/jokes/search?query=animal", search_joke);

send_request("https://api.chucknorris.io/jokes/categories", choose_category);

send_request("https://api.chucknorris.io/jokes/random?category=animal", get_category);


function send_request(api_url, callback_func) {
    // Create an XMLHttpRequest object
    xhr = new XMLHttpRequest();

    // Define a callback function to manipulate data
    xhr.onreadystatechange = function() {
        callback_func(this);
        
    };
    
    // Define request
    xhr.open("GET", api_url, true);

    //Send request
    xhr.send();

};


//Define random joke callback function
function get_joke(xhr) {
    $("#getJoke").click(function () {
        $("#joke").html(JSON.parse(xhr.responseText).value);
    });
};

// Define search call back function
function search_joke(xhr) {
    $("#search").change(function () {
        $("#getSearch").click(function () {
        
            $("#searchjoke").html(JSON.parse(xhr.responseText).value);
            
        });

    });
};

// Define category call back function
function choose_category(xhr) {
    var data = xhr.responseText.replace(/\[|\]/g,'').split(',');
    
    // Loop through the categories and append the categories to the select element
    for (var i = 0; i < data.length; i++) {
        $("#categories").append("<option value=" + data[i] + ">" + data[i] + "</option>");

        };
    };

    //Set the category fields with category search result
function get_category(xhr) {
    $("#categories").change(function () {
        $("#categories").click(function () {
            $("#categoryJoke").html(JSON.parse(xhr.responseText).value);

        });
    });
};

// Set api url endpoints for searching
function get_url(api_url, search_term, btn_id) {
    document.getElementById(btn_id).addEventListener("click", function() {
        api_url.searchParams.set('query', $(search_term).val());});
    };