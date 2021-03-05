let baseURL = '';

$(document).ready(function () {
    e.preventDefault();

    view();

    $('#login-form').on('submit', (e) => {
        e.preventDefault();

        login();
    });

    $('#register-form').on('submit', (e) => {
        e.preventDefault();

        register();
    });

    $('#logout-btn').on('click', (e) => {
        e.preventDefault();

        logout();
    });
});

function view() {
    if (!localStorage.getItem('access_token')) {
        $('#login-page').show();
        $('#navbar').hide();
        $('#home-page').hide();
        $('#all-destination').hide();
    } else {
        $('#login-page').hide();
        $('#navbar').show();
        $('#home-page').show();
        $('#all-destination').show();
    }
}

function login() {
    let email = $('#login-email').val();
    let password = $('#login-password').val();
    $.ajax({
        url: baseURL + 'login',
        method: 'POST',
        data: {
            email,
            password,
        },
    }).done(({ access_token }) => {
        localStorage.setItem('access_token', access_token);
        view();
    });
    fail((xhr, test) => {
        console.log({ xhr, test });
    }).always(() => $('#login-form').trigger('reset'));
}

function register() {
    let email = $('#regis-email').val();
    let password = $('#regis-password').val();
    $.ajax({
        url: baseURL + 'register',
        method: 'POST',
        data: {
            email,
            password,
        },
    }).done(({ access_token }) => {
        localStorage.setItem('access_token', access_token);
        view();
    });
    fail((xhr, test) => {
        console.log({ xhr, test });
    }).always(() => $('#register-form').trigger('reset'));
}

function logout() {
    localStorage.removeItem('access_token');
    view();
}

// ------------------------------------------------------------- G Maps -----------------------------------------------------//

let map;

function initMap() {
    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: new google.maps.LatLng(-6.1753924, 106.8249641),
        zoom: 13,
    });

    let latLng = new google.maps.LatLng(-6.1753924, 106.8249641);
    new google.maps.Marker({
        position: latLng,
        map: map,
    });

    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
}

// ------------------------------------------------------------- G Maps -----------------------------------------------------//

// ------------------------------------------------------------- Weather -----------------------------------------------------//

function weatherApi() {
    $.ajax({
        method: 'GET',
        url: baseURL + 'weather',
        headers: {
            email,
            access_token: localStorage.access_token,
        },
    })
        .done((data) => {
            $('#weather-page').empty();
            $('#weather-page').append(
                `
      
      <div class="container-fluid">
          <div class="row justify-content-center marginfix-weather marginfix-top">
              <div class="col-12 col-md-4 col-sm-12 col-xs-12">
                  <div class="card p-4">

                      <div class="d-flex">
                          <h6 class="flex-grow-1">${data.name}</h6>
                          <h6>${new Date().getHours()}:${
                    new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
                }</h6>
                      </div>

                      <div class="d-flex flex-column temp mt-5 mb-3">
                          <h1 class="mb-0 font-weight-bold" id="heading"> ${
                              data.main.temp
                          } ℃ </h1> <span class="small grey">${data.weather[0].main}</span>
                      </div>

                      <div class="d-flex">
                          <div class="temp-details flex-grow-1">
                              <p class="my-1"> <img src="https://i.imgur.com/B9kqOzp.png" height="17px"> <span> ${
                                  data.wind.speed
                              } mp/h </span> </p>
                              <p class="my-1"><span> ${data.main.humidity}% humidity </span> </p>
                              <p class="my-1"> <span> Feels like ${data.main.feels_like} ℃</span> </p>
                          </div>

                          <div> <img src="http://openweathermap.org/img/w/${
                              data.weather[0].icon
                          }.png" alt="wheater-logo" width="100px"> </div>
                          </div>

                      </div>
                  </div>
                  
                  <div class="d-flex h-25 text-center pad-top" id="head-weather">
                      <div class="col">
                          <h1>Hello <span id="email-name"> ${localStorage.email.split('@')[0]} </span></h2>
                          <h3>Todays Weather Forecast</h5>
                      </div>
                  </div>

              </div>
          </div>

      `
            );
        })
        .fail((err) => {
            console.log(err);
        });
}

// ------------------------------------------------------------- Weather -----------------------------------------------------//
