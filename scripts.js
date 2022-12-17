//Using Async ajax calls with promises
$(document).ready(function () {
    $("#getJoke").click(function () {
        // Get a random joke
        $.ajax({
            url: "https://api.chucknorris.io/jokes/random",
            type: "GET",
            dataType: "json"
        }).then(function (data) {
            $("#joke").html(data.value); // Set the HTML content with the data that came from the server
        });
    });
    $("#getSearch").click(function () {
        var search = $("#search").val();
        $.ajax({
            url: "https://api.chucknorris.io/jokes/search?query=" + search,
            type: "GET",
            dataType: "json"
        }).then(function (data) {
            $("#searchJoke").html(data.result[0].value); // Set the HTML content with the data that came from the server
        });
    });
    $(document).ready(function () {
        $.ajax({
            url: "https://api.chucknorris.io/jokes/categories",
            type: "GET",
            dataType: "json"
        }).then(function (data) {
            for (var i = 0; i < data.length; i++) { //Loop through the categories
                $("#categories").append("<option value='" + data[i] + "'>" + data[i] + "</option>"); //Append the categories to the select element
            }
        });
    });
    // category on change
    $("#categories").change(function () { //When the select element is changed run the function
        var category = $("#categories").val();
        $.ajax({
            url: "https://api.chucknorris.io/jokes/random?category=" + category,
            type: "GET",
            dataType: "json"
        }).then(function (data) {
            $("#categoryJoke").html(data.value); // Set the HTML content with the data that came from the server
        });
    });
});