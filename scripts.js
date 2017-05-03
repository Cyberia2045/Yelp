var yelpButton = document.getElementById("yelp-button");

function Yelp() {
  this.places = [];
  this.createElement = createElement;
  this.yelpSearch = yelpSearch;
  yelpDetective = this;
}

var yelp = new Yelp();

function yelpSearch() {
  
  var searchField = document.getElementById("yelp-search").value;
  var neighborhoodSelect = document.getElementById("neighborhood-select");
  var neighborhoodSearch = neighborhoodSelect.options[neighborhoodSelect.selectedIndex].value;


  $.ajax({
    url: "https://yelp-search.herokuapp.com/search",
    method: "GET",
    data: {
      term: searchField,
      location: neighborhoodSearch
    },
    dataType: "json",
    success: function(response){
      console.log(response)
      response.businesses.forEach(function(element) {
        yelpDetective.places.push(element);
      })
    yelpDetective.createElement();
  }
 })
};

function createElement() {
  var divContainer = document.getElementById("main-container");

  yelpDetective.places.forEach(function(element) {
    
    var placeContainer = document.createElement("div");
    placeContainer.classList.add("main-container__place");
    divContainer.appendChild(placeContainer); 
    
    var pictureContainer = document.createElement("div");
    pictureContainer.classList.add("main-container__picture");
    pictureContainer.style.backgroundImage = "url(" + element.image_url + ")";
    placeContainer.appendChild(pictureContainer);

    var nameTextContainer = document.createElement("div");
    nameTextContainer.classList.add("main-container__text");
    placeContainer.appendChild(nameTextContainer);

    var locationTextContainer = document.createElement("div");
    locationTextContainer.classList.add("main-container__text");
    placeContainer.appendChild(locationTextContainer);

    var nameTextContent = document.createTextNode(element.name)
    nameTextContainer.appendChild(nameTextContent);

    var locationTextContent = document.createTextNode(element.location.address)
    locationTextContainer.appendChild(locationTextContent);
  })
};

yelpButton.addEventListener("click", yelpSearch);










