$(document).ready(function() {
$("#login").click(function(){

    $.post("/users/authenticateUser" ,{ username: $("#username").val(), password: $("#password").val()}).
    done(function() {
        window.location.assign('/users/userPage')
      })
    error: (error) => {
        console.log(JSON.stringify(error));
}

  });
});

