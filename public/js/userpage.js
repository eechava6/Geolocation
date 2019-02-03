
var map; 
$(document).ready(function() {
    $("div.bhoechie-tab-menu>ul.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        if(index == 2)
        {
            updateTable();
        }else if(index == 4){
            $.post("/users/logoutUser",{}).
            done(function(res) {
            if(res.status === "success"){
                window.location.assign('/users/authenticateUser')}})
        }
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });

    $("#tracking").click(autoUpdate)
    $("#clearHistory").click(function(){
        $.post("/locations/clearLocations",{})
        updateTable()
        initMap()
    })
    
    $(window).load(function(){
        initMap()
    });
    
    
});

function initMap() {
    map = new google.maps.Map(document.getElementById('map'));

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude}
    
    map.setCenter(pos);
    map.setZoom(20);
    
    ;});}
    
    map.addListener('click', function(e) {
        placeMarker(e.latLng, map);
    });
      
   }

function autoUpdate() {
    if($("#tracking").text() === "Start Tracking"){
        $("#tracking").text("Stop Tracking")
        var index = 0;
        interval = setInterval(function () {
            navigator.geolocation.getCurrentPosition(function(position) {  
                var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                placeMarker(pos,map)
                index++;
                $('#count').text(index)
                updateTable()
            }); 
        }, 5000);
    }else{ $("#failed").show();
        clearInterval(interval);
        $("#tracking").text("Start Tracking")
    }
    
  }

function placeMarker(position, map) {
    var marker = new google.maps.Marker({
        position: position,
        map: map
    });
    map.panTo(position);
    $.post("../locations/saveLocation", {latitude:position.lat,longitude:position.lng})
}

function updateTable(){
    $.get("/locations/searchLocations",function(data, status){
    }).
    done(function(res) {
      if(res.status === "success"){
        txt = "";
        myObj = JSON.parse(JSON.stringify(res.data));
        txt += "<table  id='tripsTable'>"+
        "<tr><th>Latitude</th>"+
        "<th>Longitude</th>"+
        "<th>Date</th>"+
        "<th>Hour</th></tr>"

        for (x in myObj) {
          txt += "<tr><td>"+myObj[x].latitude + 
          "</td><td>"+myObj[x].longitude+
          "</td><td>"+myObj[x].date+
          "</td><td>"+myObj[x].hour+
          "</td></tr>";
        }
        txt += "</table>"    
        $('#tripsData').html(txt);
      }

      });
}

