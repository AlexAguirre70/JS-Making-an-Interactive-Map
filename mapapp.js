//Create variables to set latitude and longitude coordinates
let userLat=0
let userLong=0
// Get user Lat and Long coordinates to pass to makeMap function
async function getCoords(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
    userLat=pos.coords.latitude
    userLong= pos.coords.longitude
	makeMap(userLat,userLong)
}

// create and Initialize the map
function makeMap (x,y){                
const myMap = L.map ('map', {
    center:[x,y],
    zoom: 12,
});

// Add a street map layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(myMap);

//add a marker
// Create and add a geolocation marker:
const marker = L.marker([x, y])
marker.addTo(myMap).bindPopup('<p1><b>You are Here</b></p1>').openPopup()
}
// Add Event listener to form search button to then run a function
let searchbtn=document.getElementById('search')
    searchbtn.addEventListener('click', function()
    {   event.preventDefault()
        let business= document.getElementById('business').value
        searchFS(userLat,userLong,business)        

    })

// Function to search businesses nearby
async function searchFS (userLat, userLong,biztype){
    let options={
        method: 'Get',
        headers : {
            Accept: 'application/json',
            Authorization:'fsq3EK8/6H6eGJXVoq7oMhzlLEv6fvJC7tDkmelJpUBORCI='
        }
    }  
    let response= await fetch(`https://api.foursquare.com/v3/places/search?query=${biztype}&ll=${userLat}%2C${userLong}&radius=8048`, options)
    .then(response => response.json())
    
}

// Create map
getCoords()


