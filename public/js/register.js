$(document).ready(function() {
  $("#register").click(function(){
      
      $.post("/users/registerUser", { username: $("#username").val(),
       email: $("#email").val(),
        password: $("#password").val(),}).done(function() {
          window.location.assign('/')
        })
      
      error: (error) => {
        console.log(JSON.stringify(error));
      }
    });
  });
  
  