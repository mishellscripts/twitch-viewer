
var channels = ["tsm_theoddone", "lilypichu", "freecodecamp", "Faker", "C9Sneaky", "Voyboy","Enluna","pokimane","noobs2ninjas","beohoff","kireiautumn","cretetion","sheevergaming","TR7K","OgamingSC2","ESL_SC2"];

function addEverything(arr) {
  channels.forEach(function(channel) {
     var url = 'https://api.twitch.tv/kraken/streams/' + channel + '?client_id=wg9ntlik7glwmyc5ule75t7elxyvdp';

    $.ajax({
      type: "GET",
      url: url,
      async: false,
      dataType: "json",
      success: function(data) {
          var html = "";
          var channelName = "";
          var logo = "";
          var link = "";
          var api = data._links.channel + '?client_id=wg9ntlik7glwmyc5ule75t7elxyvdp';
          $.ajax({
            type: "GET",
            url: api,
            async: false,
            dataType: "json",
            success: function(info) {
              channelName = info.display_name;
              logo = info.logo;
              link = info.url;
              html += "<div class=\"row\" id=\"channel\">";
            }
          });
          if (logo == null)
            {
              logo = "https://cdn3.photoaffections.com/images/icon-profile.png";
            }
          html += "<li><img src=\"" + logo + "\"></li>";
          html += "<li id=\"name\">" + "<a href=\"" + link + '" target="_blank">' + channelName + "</a>" + "</li>";
          var status = "";
          if (data.stream == null) {
            status = "<i>Offline</i>";
            html += "<li id=\"status\">" + status + "</li>" + "</div>";
            $(".offline").append(html);
          } else {
            status = data.stream.channel.status;
            html += "<li id=\"status\">" + status + "</li>" + "</div>";
            $(".online").append(html);
            console.log($(".online").html());
          }
        } // End success
    }); // End ajax call
});
}; // End addEverything function

$(document).ready(function() {
        
     $("#title").hide().fadeIn(500);
    $("#toggle").hide().fadeIn(1000);
   $(".streams").hide().fadeIn(1000);
  

  addEverything(channels);
$('#showOnline').click(function() {
  if(!$('.offline').hasClass("hidden"))
        $('.offline').addClass("hidden");
    else
        $('.offline').removeClass("hidden");        
});

}); // Document ready
