'use strict';
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

const myData = {
  '$select': `name, phone, latitude, longitude, grade, inspection_date`,
  '$order': 'inspection_date DESC',
  // '$where': `latitude < 47.61 AND latitude > 47.60
  //               AND
  //               longitude < -122.2 AND longitude > -122.3
  //               `,
  '$limit': 20,
  // 'grade': '1',
  'zip_code': 98121,
  '$$app_token': kcToken
};


$.ajax({
  url: 'https://data.kingcounty.gov/resource/gkhn-e8mn.json',
  type: 'GET',
  data: myData,
})
  .done((data) => {

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
