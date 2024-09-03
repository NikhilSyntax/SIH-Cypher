// Simulating user data for the example
const userData = {
    // No default location needed anymore
};

function showUserLogin() {
    document.querySelector('.portal-select').style.display = 'none';
    document.getElementById('user-login').style.display = 'block';
}

function showAuthorityLogin() {
    document.querySelector('.portal-select').style.display = 'none';
    document.getElementById('authority-login').style.display = 'block';
}

function showUserRegister() {
    document.getElementById('user-login').style.display = 'none';
    document.getElementById('user-register').style.display = 'block';
}

function showAuthorityRegister() {
    document.getElementById('authority-login').style.display = 'none';
    document.getElementById('authority-register').style.display = 'block';
}

function registerUser(event) {
    event.preventDefault();
    alert('User registered successfully!');
    showUserLogin();
}

function registerAuthority(event) {
    event.preventDefault();
    alert('Authority registered successfully!');
    showAuthorityLogin();
}

function loginUser(event) {
    event.preventDefault();
    document.getElementById('user-login').style.display = 'none';
    document.getElementById('location-form').style.display = 'block';
}

function loginAuthority(event) {
    event.preventDefault();
    alert('Authority logged in successfully!');
    // Redirect or show the authority portal
}

function showRoute(event) {
    event.preventDefault();
    
    const loading = document.getElementById('loading');
    loading.style.display = 'block'; // Show loading indicator

    const destination = document.getElementById('destination').value;
    if (!destination) {
        alert('Please enter a destination.');
        loading.style.display = 'none'; // Hide loading indicator
        return;
    }

    const geocoder = new google.maps.Geocoder();
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: { lat: 40.7128, lng: -74.0060 } // Default center location (New York)
    });

    directionsRenderer.setMap(map);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const currentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                geocoder.geocode({ 'address': destination }, function(results, status) {
                    if (status === 'OK') {
                        const destinationLatLng = results[0].geometry.location;
                        const request = {
                            origin: currentLatLng,
                            destination: destinationLatLng,
                            travelMode: 'DRIVING'
                        };
                        directionsService.route(request, function(result, status) {
                            loading.style.display = 'none'; // Hide loading indicator
                            if (status === 'OK') {
                                directionsRenderer.setDirections(result);
                            } else {
                                alert('Failed to calculate route: ' + status);
                            }
                        });
                    } else {
                        alert('Failed to geocode destination: ' + status);
                        loading.style.display = 'none'; // Hide loading indicator
                    }
                });
            },
            () => {
                alert('Unable to retrieve your location.');
                loading.style.display = 'none'; // Hide loading indicator
            },
            { timeout: 10000 } // Optional: timeout for geolocation request
        );
    } else {
        alert('Geolocation is not supported by this browser.');
        loading.style.display = 'none'; // Hide loading indicator
    }
}
