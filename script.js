let json_data;

function CheckOnlineStatus() {
  $.ajax({
    url: "https://api.twitch.tv/kraken/streams/106512746",
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
    title_box.appendChild(stream_title);
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
    title_box.appendChild(stream_views);
    root.appendChild(title_box);
    var options = {
      width: "100%",
      height: "100%",
      channel: "mapettv",
      muted: true
    };
    var player = new Twitch.Player("player", options);
  }
};
