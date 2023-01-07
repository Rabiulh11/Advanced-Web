// check if browser supports service worker and register it
const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      await navigator.serviceWorker.register("sw.js");
      
    }
  };
  
registerServiceWorker();

//declare the urls
let random_url, search_url, categories_url, categories_search_url;
[random_url, categories_url, search_url, categories_search_url] = ["https://api.chucknorris.io/jokes/random", "https://api.chucknorris.io/jokes/categories", "https://api.chucknorris.io/jokes/search?query=animal", "https://api.chucknorris.io/jokes/random?category=animal"]

// define function to make the api calls
function send_request(url, callback_func) {
    try {
        //Create an XMLHttpRequest object
        xhr = new XMLHttpRequest();
    
        xhr.addEventListener("loadstart", function() {
            // Show the loading bar
            switch (url){
                case random_url:
                    document.getElementById("random_loadingbar").style.width = "100%";
                break;
                case search_url:
                    document.getElementById("search_loadingbar").style.width = "100%";
                break;
                case categories_search_url:
                    document.getElementById("cat_loadingbar").style.width = "100%";
                break;
            }
          });
          
          xhr.addEventListener("progress", function(event) {
            // Update the loading bar with the current progress
            var progress = event.loaded / event.total * 100;
            switch (url){
                case random_url:
                    document.getElementById("random_loadingbar").style.width = progress + "%";
                break;
                case search_url:
                    document.getElementById("search_loadingbar").style.width = progress + "%";
                break;
                case categories_search_url:
                    document.getElementById("cat_loadingbar").style.width = progress + "%";
                break;
            }
          });
          
          xhr.addEventListener("loadend", function() {
            // Hide the loading bar
            switch (url){
                case random_url:
                    document.getElementById("random_loadingbar").style.width = "100%";
                break;
                case search_url:
                    document.getElementById("search_loadingbar").style.width = "100%";
                break;
                case categories_search_url:
                    document.getElementById("cat_loadingbar").style.width = "100%";
                break;
            }
          });
    
        // Define a callback function to manipulate data
        xhr.onload = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback_func(this);
            }
        };
        // wait for response
        // Make an Ajax request using the XMLHttpRequest object
		
		
		// base function for triggering the api calls
function ApiCallMethod(url,type, parameters, _id) {
    $.ajax({
        type: type,
        url: url,
        data: JSON.stringify(parameters),
        contentType: 'application/json;',
        dataType: 'json',
        success: function (data) {
            if(_id =="#joke" || _id=="#categoryJoke"){
            $(_id).html(data.value); // Set the HTML content with the data fetched from the server
            } else if(_id=="#searchJoke"){
            $(_id).html(data.result[0].value);
            }
        },
        error: function() {
            console.log('error');
        }
    });
}


	
	// function preloads categories in a drop down menu
function preloadCategories(){
    $(document).ready(function() {
        $.ajax({
            url: "https://api.chucknorris.io/jokes/categories",
            type: "GET",
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.length; i++) { //Loop through the categories
                    $("#categories").append("<option value='" + data[i] + "'>" + data[i] + "</option>"); 
                }
            }
        });
    });

}

	
		
		
        // Define request
        xhr.open("GET", url, true);
        //Send request
        xhr.send();
    }
    catch(error){
        // Handle error
        console.error(error);
    }
};

// define call back functions for DOM manipulation
function get_joke(xhr) {
    //Define random joke callback function
    if(xhr.status === 200) {
        const obj = JSON.parse(xhr.responseText);
        $("#joke").html(obj.value);
        return false;
    } else {
        $("#joke").html("ERROR");
    }
};

//Define random joke callback function
function search_joke(xhr) {
    if(xhr.status === 200) {
        const search_jokes = JSON.parse(xhr.responseText).result[0]["value"]
        $("#searchJoke").html(search_jokes);
        return false;
    } else {
        $("#joke").html("ERROR");
    }
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
    if(xhr.status === 200) {
        const obj = JSON.parse(xhr.responseText);
        $("#categoryJoke").html(obj.value);
        return false
    } else {
        $("#joke").html("ERROR");
    }
};

//Add search terms if found in input field
function jokeTerm() {
    $("#search").val() ? search_url = "https://api.chucknorris.io/jokes/search?query=" + $("#search").val() : {}
}

// add joke category term if changed
function categoryTerm () {
    $("#categories").val() ? categories_search_url = "https://api.chucknorris.io/jokes/random?category=" + $("#categories").val() : {}
    
}
// set category options
send_request(categories_url, set_categories);
// define a function that encapsulates the logic for making an Ajax request.
function ajaxCall() { 
    //When the document is ready 
    $(document).ready(function () { 
        // Send the Api requests via the call back functions
        $("#getJoke").click(function () {
            send_request(random_url, get_joke);
        });

        $("#getSearch").click(function () {
            jokeTerm();
            send_request(search_url, search_joke);
        });

        $("#categories").change(function () {
            categoryTerm ();
            send_request(categories_search_url, choose_category);
        });
    });
}