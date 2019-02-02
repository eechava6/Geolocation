$(document).ready(function() {
    updateTable();
    $("div.bhoechie-tab-menu>ul.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
        initMap()
    });
});
function initMap() {
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4});
    infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude}
    infoWindow.setPosition(pos);
    infoWindow.setContent('User actual position.');
    infoWindow.open(map);
    map.setCenter(pos);
    map.setZoom(20);
    ;});}

    map.addListener('click', function(e) {
        placeMarker(e.latLng, map);
        saveMarker(e.latLng)
    });
        
   }

function saveMarker(pos){
    $.post("../locations/saveLocation", {latitude:pos.lat,longitude:pos.lng}).done(function(res) {
        if(res.status === "success"){
        }else{
         // $("#failed").show();
        }
        })
}

function placeMarker(position, map) {
    var marker = new google.maps.Marker({
        position: position,
        map: map
    });
    map.panTo(position);
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