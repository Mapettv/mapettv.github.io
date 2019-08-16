let json_data;

// let userID = "25452510";
let userID = "106512746";

function CheckOnlineStatus() {
  $.ajax({
    url: "https://api.twitch.tv/kraken/streams/" + userID,
    dataType: "json",
    headers: {
      Accept: "application/vnd.twitchtv.v5+json",
      "Client-ID": "0gr6nzyigbsyfqkkbqtqd9p3turioo"
    },
    success: function(data) {
      json_data = data;
      let dot = document.getElementById("stream-dot");
      if (data["stream"] == null) {
        dot.classList.remove("stream-on");
        dot.classList.add("stream-off");
      } else {
        dot.classList.remove("stream-off");
        dot.classList.add("stream-on");
      }
      streamBox.twitch();
    }
  });
}
CheckOnlineStatus();

const streamBox = {
  twitch: () => {
    root = document.getElementById("box-stream");
    let stream_box = document.createElement("div");
    stream_box.classList.add("stream-box");
    stream_box.innerHTML = '<div id="player"></div>';
    root.appendChild(stream_box);
    let title_box = document.createElement("div");
    title_box.classList.add("title-box");
    let title_box_top = document.createElement("div");
    title_box_top.classList.add("title-box-top");
    let stream_title = document.createElement("div");
    stream_title.classList.add("stream-title");
    let title_icon = document.createElement("div");
    title_icon.classList.add("title-icon");
    title_icon.innerHTML = '<i class="fas fa-globe-europe"></i>';
    stream_title.appendChild(title_icon);
    let title_text = document.createElement("div");
    title_text.classList.add("title-text");
    if (json_data.stream != null) {
      title_text.innerHTML = json_data.stream.channel.status;
    } else {
      title_text.innerHTML = "Stream Offline";
    }
    stream_title.appendChild(title_text);
    title_box_top.appendChild(stream_title);
    let stream_views = document.createElement("div");
    stream_views.classList.add("stream-views");
    let views_icon = document.createElement("div");
    views_icon.classList.add("views-icon");
    views_icon.innerHTML = '<i class="fas fa-eye"></i>';
    stream_views.appendChild(views_icon);
    let views_number = document.createElement("div");
    views_number.classList.add("views-number");
    if (json_data.stream != null) {
      views_number.innerHTML = json_data.stream.viewers;
    } else {
      views_number.innerHTML = "0";
    }
    stream_views.appendChild(views_number);
    title_box_top.appendChild(stream_views);
    let title_box_bottom = document.createElement("div");
    title_box_bottom.classList.add("title-box-bottom");
    let game_icon = document.createElement("div");
    game_icon.classList.add("game-icon");
    game_icon.innerHTML = '<i class="fas fa-gamepad"></i>';
    title_box_bottom.appendChild(game_icon);
    let game_name = document.createElement("div");
    game_name.classList.add("game-name");
    if (json_data.stream != null) {
      game_name.innerHTML = json_data.stream.game;
    } else {
      game_name.innerHTML = "Offline";
    }
    title_box_bottom.appendChild(game_name);
    title_box.appendChild(title_box_top);
    title_box.appendChild(title_box_bottom);
    let space = document.createElement("div");
    space.classList.add("space");
    title_box.appendChild(space);
    root.appendChild(title_box);
    if (json_data.stream != null) {
      var options = {
        width: "100%",
        height: "100%",
        channel: json_data.stream.channel.name,
        muted: true
      };
    } else {
      var options = {
        width: "100%",
        height: "100%",
        channel: "mapettv",
        muted: true
      };
    }
    var player = new Twitch.Player("player", options);
  }
};
