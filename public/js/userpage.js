$(document).ready(function() {
    $("div.bhoechie-tab-menu>ul.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
        initMap()
        
        $.get("/locations/searchLocations",function(data, status){
        }).
        done(function(res) {
          if(res.status === "success"){
              res.data =
            $("#newData").append(JSON.stringify(res.data));
          }
    
          });
    
        
        
    });

    
});
function initMap() {
    // The location of Uluru
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4});
    // The marker, positioned at Uluru
    infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude}
    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found.');
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
          console.log("WORKED POSITION ADDED YAY")
        }else{
          $("#failed").show();
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