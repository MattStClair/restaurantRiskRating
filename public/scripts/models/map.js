'use strict';

var app = app || {};

(function(module){

  const googleMaps = {};

    let latitude = 47.615875599999995;
    let longitude = -122.34344120000002;

    var iconBase = '/../images/';

  function getLocation(){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function (position){
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log(latitude, longitude);
        map.setCenter(new google.maps.LatLng( latitude, longitude));


      });
    } else {
      alert(`Sorry your browser does not support geolocationing`);
    }
  }
  getLocation();


  var stylesArray = [{
    featureType: 'all',
    stylers: [{
      hue: '#00ffe6'
    },
    {
      saturation: -20
    }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{
      lightness: 100
    },
    {
      visibility: 'simplified'
    }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [{
      visibility: 'off'
    }]
  }
  ];

  var mapOptions = {
    zoom: 15,
    styles: stylesArray,

    center: new google.maps.LatLng( latitude, longitude),

    mapTypeId: google.maps.MapTypeId.STREET,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    }
  }

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);



  google.maps.event.addDomListener(window, 'resize', function() {
  var center = map.getCenter();
  google.maps.event.trigger(map, 'resize');
  map.setCenter(center);

});

  var satMarkers = [];
  var unsatMarkers = [];
  var completeMarkers = [];
  var uncompleteMarkers = [];


  $.get('/search')
.then((data) => {

    data.forEach(function(store) {
      var windowContent = `<div class='markerContent'>
      <h1>${store.name}</h1>
      <h2>${store.phone}</h2>
      <p id ='adress'>${store.address}</p>
      <p class="inspection">${store.inspection_result}</p>
      </div>`;

      switch (store.inspection_result){
            case 'Unsatisfactory':
      var markerOptions = {
        position: new google.maps.LatLng(parseFloat(store.latitude),parseFloat(store.longitude)),
        map: map,
        icon: iconBase + 'sick1.png'
      };

      var marker = new google.maps.Marker(markerOptions);
      unsatMarkers.push(marker);

    var infoWindowOptions = {
      content:windowContent
    };

      var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
      google.maps.event.addListener(marker,'click',function(e){

        infoWindow.open(map, marker);
      });

    break;
    case 'Satisfactory':
    var markerOptions = {
      position: new google.maps.LatLng(parseFloat(store.latitude),parseFloat(store.longitude)),
      map: map,
      icon: iconBase + 'happy1.png'
    };

    var marker = new google.maps.Marker(markerOptions);
    satMarkers.push(marker);

    var infoWindowOptions = {
    content: windowContent
  };

    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    google.maps.event.addListener(marker,'click',function(e){

      infoWindow.open(map, marker);
    });
    break;
    case 'Complete':
    var markerOptions = {
      position: new google.maps.LatLng(parseFloat(store.latitude),parseFloat(store.longitude)),
      map: map,
      icon: iconBase + 'complete.png'
    };

    var marker = new google.maps.Marker(markerOptions);
    completeMarkers.push(marker);
    var infoWindowOptions = {
    content: windowContent
  };

    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    google.maps.event.addListener(marker,'click',function(e){

      infoWindow.open(map, marker);
    });
    break;
    case 'Incomplete':
    var markerOptions = {
      position: new google.maps.LatLng(parseFloat(store.latitude),parseFloat(store.longitude)),
      map: map,
      icon: iconBase + 'incomplete.png'
    };

    var marker = new google.maps.Marker(markerOptions);
    uncompleteMarkers.push(marker);

    var infoWindowOptions = {
    content: windowContent
  };

    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    google.maps.event.addListener(marker,'click',function(e){

    infoWindow.open(map, marker);

    var legend = document.getElementById('legend');
    legend.appendChild(div);

    });
      }
    })
})


  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);

  googleMaps.clear = function() {

    satMarkers.forEach(function(marker){
      marker.setVisible(false);
    })

    unsatMarkers.forEach(function(marker){
      marker.setVisible(false);
    })
    completeMarkers.forEach(function(marker){
      marker.setVisible(false);
    })
    uncompleteMarkers.forEach(function(marker){
      marker.setVisible(false);
    })
  };

  googleMaps.showAll = function() {

    satMarkers.forEach(function(marker){
      marker.setVisible(true);
    })

    unsatMarkers.forEach(function(marker){
      marker.setVisible(true);
    })
    completeMarkers.forEach(function(marker){
      marker.setVisible(true);
    })
    uncompleteMarkers.forEach(function(marker){
      marker.setVisible(true);
    })
  };

  googleMaps.showSat = function() {
    googleMaps.clear();
    satMarkers.forEach(function(marker){
      marker.setVisible(true);
    })
  };
  googleMaps.showUnSat = function() {
    googleMaps.clear();
    unsatMarkers.forEach(function(marker){
      marker.setVisible(true);
    })
  };
  googleMaps.showUnComp = function() {
    googleMaps.clear();
    uncompleteMarkers.forEach(function(marker){
      marker.setVisible(true);
    })
  };
  googleMaps.showComp = function() {
    googleMaps.clear();
    completeMarkers.forEach(function(marker){
      marker.setVisible(true);
    })
  };

  module.googleMaps = googleMaps;
})(app);
