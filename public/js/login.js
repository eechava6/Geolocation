$(document).ready(function() {
$("#login").click(function(){

    $.post("/users/authenticateUser" ,{ username: $("#username").val(), password: $("#password").val()}).
    done(function(res) {
      if(res.status === "success"){
        window.location.assign('/users/userPage')
      }else{
        $("#failed").show();
      }

      })
    error: (error) => {
        console.log(JSON.stringify(error));
}

  });
});

