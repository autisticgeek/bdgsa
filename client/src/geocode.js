import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDXLSCan0a10cZmkSk66pqS6WDP0gUKc-Q");
Geocode.enableDebug();
Geocode.fromLatLng("48.8", "2.29").then(
    response => {
        const address = response.results[0].formatted_address;
        console.log(address);
    },
    error => {
        console.error(error);
    }
);

Geocode.fromAddress("eiffel tower").then(
    response => {
        const {lat, lng} = response.results[0].geometry.location;
        console.log(lat, lng);
    },
    error =>{
        console.error(error);
    }
);