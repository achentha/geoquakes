// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";



$(document).ready(function() {



  //google map apis
  let map;

  function dropPin(latLongObj) {
    let marker = new google.maps.Marker({
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: latLongObj
    });
  }

  function dropIcon(latLongObj) {
    let marker = new google.maps.Marker({
      map: map,
      draggable: true,
      icon: "images/earthquake.png",
      position: latLongObj
    });
  }

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.78, lng: -122.44},
      zoom: 8
    });

    dropPin({lat: 37.78, lng: -122.44});
  }

  initMap();

  console.log("Let's get coding!");
  // CODE IN HERE!
  let $info = $("#info");

  $.ajax({
    type: "GET",
    url: weekly_quakes_endpoint
  })
  .then(function(dataObj) {
    dataObj.features.forEach(function(elem){
      let hour = Math.round((Date.now() - elem.properties.time)/(1000*3600));
      let title = `<p>${elem.properties.title} / ${hour} hours ago </p>`;
      $info.append(title);

      let coordinates = {
        lat: elem.geometry.coordinates[1],
        lng: elem.geometry.coordinates[0]
      }
//      dropPin(coordinates);
      dropIcon(coordinates);
    })
  })
  .catch(function(err) {
    console.log(err);
  });

});
