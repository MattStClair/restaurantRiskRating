'use strict';

var app = app || {};

(function(module){

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
  center: new google.maps.LatLng(47.618217, -122.351832),
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



//to-do: add function to deal with markers

$.get('/search')
.then((data) => {

  data.forEach(function(store) {

    var markerOptions = {
      position: new google.maps.LatLng(parseFloat(store.latitude),parseFloat(store.longitude)),
      map: map
    };
    var marker = new google.maps.Marker(markerOptions);
    marker.setMap(map);

    var infoWindowOptions = {
      content: store.name
    };

    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    google.maps.event.addListener(marker,'click',function(e){

      infoWindow.open(map, marker);
    });
  })
})

//----------------------map icons---------------------------------------------//


   var iconBase = '/../images/';
   var icons = {
  parking: {
    icon: iconBase + 'happyEmoji.jpeg'
   },
   library: {
    icon: iconBase + 'library_maps.png'
    },
    info: {
    icon: iconBase + 'info-i_maps.png'
   }
  };



        var features = [
          {
            position: new google.maps.LatLng(47.618217, -122.351832),
            type: 'parking'
          }, {
            position: new google.maps.LatLng(47.818217, -122.951832),
            type: 'library'
          }
        ];

        // Create markers.
        features.forEach(function(feature) {
          var marker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            map: map
          });
        });

})(app);
