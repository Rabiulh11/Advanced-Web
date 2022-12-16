$(document).ready(function () { //When the document is ready 
    $("#getJoke").click(function () {
        // Get a random joke from the API
        $.ajax({
            url: "https://api.chucknorris.io/jokes/random", // The URL to the API. You can get this in the API page of the API you intend to consume
            type: "GET", // The HTTP Method, can be GET POST PUT DELETE etc
            dataType: "json", // The type of data you expect back from the server
            success: function (data) {
                $("#joke").html(data.value); // Set the HTML content with the data that came from the server
            }
        });
    });
    $("#getSearch").click(function () {
        var search = $("#search").val();
        $.ajax({
            url: "https://api.chucknorris.io/jokes/search?query=" + search, //Search for a joke with the search term
            type: "GET",
            dataType: "json", // The type of data you expect back from the server
            success: function (data) {
                $("#searchJoke").html(data.result[0].value); // Set the HTML content with the data that came from the server
            }
        });
    });



    $(document).ready(function () {
        $.ajax({
            url: "https://api.chucknorris.io/jokes/categories",
            type: "GET",
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.length; i++) { //Loop through the categories
                    $("#categories").append("<option value='" + data[i] + "'>" + data[i] + "</option>"); //Append the categories to the select element
                }
            }
        });
    });
    // category on change
    $("#categories").change(function () { //When the select element is changed run the function
        var category = $("#categories").val();
        $.ajax({
            url: "https://api.chucknorris.io/jokes/random?category=" + category,
            type: "GET",
            dataType: "json",
            success: function (data) {
                $("#categoryJoke").html(data.value); // Set the HTML content with the data that came from the server
            }
        });
    });
});

