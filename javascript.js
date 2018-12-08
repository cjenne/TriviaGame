// # New York Times Article Search - Phase 01

// ## Front-End Team
// ![nyt-search](Images/nyt.png)

// * Create the layout for the design above. Feel free to use Bootstrap or to do something more customized of your own.

// * Make sure to organize your code so as to have the necessary IDs.

// * Incorporate text boxes for capturing User Input. Then research how to retrieve the input values in JavaScript

// ## Back-End Team

// * Do preliminary research on the [API](http://developer.nytimes.com/article_search_v2.json).

// * Register for an API Key.

// * Understand what format the URL should look like to make an Article Call. (Hint: Use the API Console!!)

// * Experiment with console logging various fields.

//search box 
$("button").on("click", function() {
    var search = $("#searchTerm").val();
var queryurl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "b9f91d369ff59547cd47b931d8cbc56b:0:74623931",
  'q': + search
});
$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  console.log(result);
}).fail(function(err) {
  throw err;
});



    // $("button").on("click", function() {
    //   var person = $(#searchTerm).attr("data-person");
    //   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    //     person + "&api_key=dc6zaTOxFJmzC&limit=10";

    //   $.ajax({
    //     url: queryURL,
    //     method: "GET"
    //   })
    //     .then(function(response) {
    //       var results = response.data;

    //       for (var i = 0; i < results.length; i++) {
    //         var gifDiv = $("<div>");

    //         var rating = results[i].rating;

    //         var p = $("<p>").text("Rating: " + rating);

    //         var personImage = $("<img>");
    //         personImage.attr("src", results[i].images.fixed_height.url);

    //         gifDiv.prepend(p);
    //         gifDiv.prepend(personImage);

    //         $("#gifs-appear-here").prepend(gifDiv);
    //       }
    //     });