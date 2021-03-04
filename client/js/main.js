let baseURL = ''

$(document).ready(function() {
  e.preventDefault();

  view()

  $("#login-form").on("submit", (e) => {
    e.preventDefault();

    login()
  })
  $("#register-form").on("submit", (e) => {
    e.preventDefault();

    register()
  })
  $('#logout-btn').on('click', (e) => {
    e.preventDefault()

    logout()
  })
})

function view() {
  if(!localStorage.getItem('access_token')) {
    $('#login-page').show()
    $('#navbar').hide()
    $('#home-page').hide()
    $('#all-destination').hide()
  } else {
    $('#login-page').hide()
    $('#navbar').show()
    $('#home-page').show()
    $('#all-destination').show()
  }
}


function login() {
  let email = $("#login-email").val()
  let password = $("#login-password").val()
  $.ajax({
    url: baseURL + "login",
    method: "POST",
    data: {
      email,
      password
    }
  })
  .done(({ access_token }) => {
    localStorage.setItem("access_token", access_token)
    view()
  })
  fail((xhr, test) =>{
    console.log({xhr, test})
  })
  .always(() => $("#login-form").trigger("reset"))
}

function register() {
  let email = $("#regis-email").val()
  let password = $("#regis-password").val()
  $.ajax({
    url: baseURL + "register",
    method: "POST",
    data: {
      email,
      password
    }
  })
  .done(({ access_token }) => {
    localStorage.setItem("access_token", access_token)
    view()
  })
  fail((xhr, test) =>{
    console.log({xhr, test})
  })
  .always(() => $("#register-form").trigger("reset"))
}

function logout() {
  localStorage.removeItem('access_token')
  view()
}
