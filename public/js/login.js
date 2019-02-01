$(document).ready(function() {
$("#login").click(function(){

    $.post("/users/authenticateUser" ,{ username: $("#username").val(), password: $("#password").val()})
    error: (error) => {
        console.log(JSON.stringify(error));
}

  });
});

