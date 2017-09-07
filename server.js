'use strict';



const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const requestProxy = require('express-request-proxy');
app.use(express.static('./public'));

const myData = {
  '$select': `name, phone, latitude, longitude, grade, inspection_date, inspection_result`,
  '$order': 'inspection_date DESC',
  // '$where': `latitude < 47.61 AND latitude > 47.60
  //               AND
  //               longitude < -122.2 AND longitude > -122.3
  //               `,
  '$limit': 20,
  // 'grade': '1',
  '$zip_code': '98119',
  '$$app_token': process.env.KC_TOKEN
};


function proxyGitHub(request, response) {
  console.log('Routing, proxy running');
  (requestProxy({
    url: 'https://data.kingcounty.gov/resource/gkhn-e8mn.json',
    type: 'GET',
    data: myData
  }))(request, response);
}

app.get('/search', proxyGitHub);


app.get('*', (request, response) => response.sendFile('index.html', {root: './public'}));



app.listen(PORT, function(){
  console.log(`Gross is listening on port ${PORT}`);
});
