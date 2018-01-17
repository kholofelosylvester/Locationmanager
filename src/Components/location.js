import React, { Component } from 'react';
import $ from 'jquery';

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  getcurrentLocation (){
 let lat, lon, api_url;

  if ("geolocation" in navigator) {
    $('#displayTemp').on('click', function() {
      navigator.geolocation.getCurrentPosition(getLocation);

      function getLocation(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;

        api_url = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
          lat + '&lon=' + 
          lon + '&units=metric&appid=b231606340553d9174136f7f083904b3';
         

        $.ajax({
          url: api_url,
          method: 'GET',
          error: function() {
          alert('<p>An error has occurred while loading your current location</p>');
          },
          success: function(data) {
            let temp = data.main.temp;
            let location = data.name;
             $('#result').text('your current wheather is'+ ' ' + temp + '°' + location);
            // console.log('your current wheather is'+' ' + temp + '°' + location)
          }
        });
      }
    });
  } else {
    alert('Your browser doesnt support geolocation.Please try a different browser.');
   
  }
}

// reloadPage() {
//     document.location.reload(true);
// }

  componentDidMount() {
   
   this.getcurrentLocation()
//    this.reloadPage()
  }
  render() {
    return (
      <div className="Location">
        <button id="displayTemp">Show my current Location Temporature</button>
        <ul>
           <li id="result"></li> 
        </ul>
       
      </div>
    );
  }
}

export default Location;