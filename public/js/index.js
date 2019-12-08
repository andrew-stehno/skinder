// CANT HIDE IT, Place search.js requires it like so.
placeSearch({
  key: "hfKnbDdg4J5HEbbe3NoAbdudtAa7DAxG",
  container: document.querySelector("#place-search-input")
});

// The API object contains methods for each kind of request we'll make
const API = {
  getCity: function (location) {
    const url = `api/cities/${location}`;
    const type = "GET";
    return $.ajax({
      url,
      type
    });
  },

  // getTrails: function() {
  //   return $.ajax({
  //     url: "api/trails/",
  //     type: "GET"
  //   });
  // },

  // getPosts: function() {
  //   const url = "api/forums/";
  //   const type = "GET";
  //   return $.ajax({url, type});
  // },

  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

$("#submitBtn").on("click", () => {
  event.preventDefault();
  $(".place-search-input").val("");
  // sconsole.log("button click");
  const currentSearchVal = $("#place-search-input").val();
  console.log(currentSearchVal);
  if (currentSearchVal.length > 0) {
    API.getCity(currentSearchVal)
      .then(res => {
        console.log(res);

        function renderCards() {
          for (let i = 0; i < res.trails.length; i++) {
            // testing
            console.log("trail name: " + trailName)
            console.log("trail length: " + trailLength)
            console.log("trail Difficulty: " + trailDiff)
            console.log("trail pic: " + trailPic)
            console.log("trail raiting: " + trailRating)
            console.log("trail summary: " + trailSummary)
            console.log("trail Location: " + trailLocation)
            // variables holding search results
            var trailName = res.trails[i].name;
            var trailLength = res.trails[i].length;
            var trailDiff = res.trails[i].difficulty;
            var trailPic = res.trails[i].imgMedium;
            var trailRating = res.trails[i].starVotes;
            var trailSummary = res.trails[i].summary;
            var trailLocation = res.trails[i].location;
            // making the card dynamically
            var cardDiv = $("<div>").addClass('card mb-3');
            var cardRow = $("<div>").addCLass("row no-gutters")
            // picture part of card
            var col = $("<div>").addClass('col-md-4');
            var cardPic = $('<img src="' + someVariable + '" alt="Snowy mountain pictures">').addClass("card-img");
            // card body
            var bodyCol = $('<div>').addClass("col-md-8");
            var cardHeader = $('<h4>').addClass("card-header card-custom");
            var cardBody = $('<div>').addClass("card-body");
            var cardBodyRow = $("<div>").addClass("row");
            var cardContentDifficulty = $('<h5>');
            var cardContentLength = $("<h5>").addClass("col-md-4 text-center");
            var cardContentRating = $('<h5>').addClass("col-md-4 text-center");
            var cardContentSummary = $("<p>").addClass("card-text");
            var cardLocationRow = $("<div>").addClass("row");
            var cardContentLocation = $("<div>").addClass("col-md-9 text-left");
            var rightSideBtn = $("<div>").addClass("text-right");
            var saveBtn = $("<button>").addClass("btn btn-primary saveTrail").text("Save");
            cardAppend();
          } 

          function cardAppend() {
            // puts Button inside its div
            rightSideBtn.append(saveBtn);
            // put both button div and location div into their row
            cardLocationRow.append(cardContentLocation);
            cardLocationRow.append(rightSideBtn);
            // put h5's into their row
            cardBodyRow.append(cardContentDifficulty);
            cardBodyRow.append(cardContentLength);
            cardBodyRow.append(cardContentRating);
            // put row into card body
            cardBody.append(cardBodyRow);
            // put p tag into card body
            cardBody.append(cardContentSummary);
            // put row into card body
            cardBody.append(cardLocationRow);
            // put h4 into card body
            bodyCol.append(cardHeader);
            // put card body into col-md-8
            bodyCol.append(cardBody);
            // put img inside col-md-4
            col.append(cardPic);
            // put col with img and col with content into no gutter row
            cardRow.append(col);
            cardRow.append(bodyCol);
            // put row inside card div
            cardDiv.append(cardRow);
          }
        }
        renderCards();
      }).catch(err => {
        console.log(err);
      });
  }
});