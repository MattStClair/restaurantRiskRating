'use strict';

var app = app || {};

(function(module) {
  const dataObj = {}

  dataObj.markerList = [];
  dataObj.getData = (limit, zipcode) => {
    $.ajax({
      url: 'https://data.kingcounty.gov/resource/gkhn-e8mn.json',
      type: 'GET',
      data: {
        '$select': `name, phone, latitude, longitude, grade, inspection_date, inspection_result`,
        '$order': 'inspection_date DESC',
        '$limit': limit,
        'zip_code': zipcode,
        '$$app_token': kcToken
      },
    }).done((data) => {
      dataObj.markerList = data;
    })
  };

  module.dataObj = dataObj;
})(app);
