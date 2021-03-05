let baseURL = 'http://localhost:3000/';

$(document).ready(() => {
    view();

    $('#home-btn').on('click', (e) => {
        e.preventDefault();
        view();
    });

    $('#login').on('submit', (e) => {
        e.preventDefault();

        login();
    });

    $('#register').on('submit', (e) => {
        e.preventDefault();

        register();
    });

    $('#logout-btn').on('click', (e) => {
        e.preventDefault();

        logout();
    });

    $('#all-btn').on('click', (e) => {
        e.preventDefault();
        $('#home-page').hide();
        $('#all-destination').show();
        showAll();
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
        $('#all-destination').hide();
        findOne();
        weatherApi();
        quotesApi();
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
    })
        .done(({ access_token }) => {
            localStorage.setItem('access_token', access_token);
            view();
        })
        .fail((xhr, test) => {
            console.log({ xhr, test });
        })
        .always(() => $('#login-form').trigger('reset'));
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
    })
        .done(() => {
            view();
        })
        .fail((xhr, test) => {
            console.log({ xhr, test });
        })
        .always(() => $('#register-form').trigger('reset'));
}

function logout() {
    localStorage.removeItem('access_token');
    view();
}

function findOne() {
    $.ajax({
        url: baseURL + 'destination/one',
        method: 'GET',
        headers: {
            access_token: localStorage.access_token,
        },
    })
        .done((response) => {
            console.log(response);
            $('#img-one').empty();
            $('#img-one').append(
                `
            <img src="${response.dest.imgURL}" style='overflow: hidden;'>
            `
            );
            $('#title-one').empty();
            $('#title-one').append(
                `
                <p style="text-align: center;">
                <strong style="font-size: 21px;"> ${response.dest.title} </strong> </p>
                <p style="text-align: center;"> ${response.dest.description} </p>
                `
            );
        })
        .fail((xhr, test) => {
            console.log({ xhr, test });
        });
}

function showAll() {
    $.ajax({
        url: baseURL + 'destination',
        method: 'GET',
        headers: {
            access_token: localStorage.access_token,
        },
    })
        .done((response) => {
            $('#main-columns').empty();
            response.dest.forEach((el, i) => {
                $('#main-columns').append(
                    `
            <div id="child-columns" class="column">
            <div class="box" style="height: 45vh;width: 17vw;">
              <img src="${el.imgURL}" style='overflow: hidden;'>
              <p style="text-align: center;">
                  <strong style="font-size: 21px;"> ${el.title} </strong> </p>
            </div>
          </div>
            `
                );
            });
        })
        .fail((xhr, test) => {
            console.log({ xhr, test });
        });
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
            access_token: localStorage.access_token,
        },
    })

        .done((data) => {
            $('#weather-page').empty();
            $('#weather-page').append(
                `
                <div class=">
                      <div class="d-flex">
                          <h6 class="flex-grow-1">${data.name}</h6>
                          <h6>${new Date().getHours()}:${
                    new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
                }</h6>
                      </div>

                      <div class="">
                          <h1> ${data.main.temp} ℃ </h1> <span class="small grey">${data.weather[0].main}</span>
                      </div>

                      <div class="d-flex">
                          <div class="temp-details flex-grow-1">
                              <p class="my-1"> <img src="https://i.imgur.com/B9kqOzp.png" style="height:45px;"> <span> ${
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
      `
            );
        })
        .fail((err) => {
            console.log(err);
        });
}

// ------------------------------------------------------------- Weather -----------------------------------------------------//

function quotesApi() {
    $.ajax({
        method: 'GET',
        url: baseURL + 'quotes',
        headers: {
            access_token: localStorage.access_token,
        },
    })

        .done((data) => {
            $('#quotes-page').empty();
            $('#quotes-page').append(
                `
                <div>${data[0].content.rendered}</div>
      `
            );
        })
        .fail((err) => {
            console.log(err);
        });
}
