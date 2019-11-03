let json_data;
let yt_data;
let video_data;

let userID = "106512746";

function CheckOnlineStatus() {
  $.ajax({
    url: "https://api.twitch.tv/kraken/streams/" + userID,
    dataType: "json",
    headers: {
      Accept: "application/vnd.twitchtv.v5+json",
      "Client-ID": "0gr6nzyigbsyfqkkbqtqd9p3turioo"
    },
    success: function (data) {
      json_data = data;
      let dot = document.getElementById("stream-dot");
      if (data["stream"] == null) {
        dot.classList.remove("stream-on");
        dot.classList.add("stream-off");
      } else {
        dot.classList.remove("stream-off");
        dot.classList.add("stream-on");
      }
      streamBox.twitch_click();
    }
  });
}
CheckOnlineStatus();

function YoutubeLastVideo() {
  $.ajax({
    url:
      "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCHmzjmhFzJvfK8cmDf0naTg&maxResults=1&order=date&type=video&key=AIzaSyDc88VL5HLgG0LqpLWadN7Vo5Ix4z6XxZc",
    dataType: "json",
    success: function (data) {
      yt_data = data;
      videoData(data.items[0].id.videoId);
    }
  });
}
YoutubeLastVideo();

function videoData(videoID) {
  $.ajax({
    url:
      "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=" + videoID + "&key=AIzaSyDc88VL5HLgG0LqpLWadN7Vo5Ix4z6XxZc",
    dataType: "json",
    success: function (data) {
      video_data = data;
    }
  });
}

const streamBox = {
  status: "",
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
  },
  youtube: () => {
    root = document.getElementById("box-stream");
    let video_box = document.createElement("div");
    video_box.classList.add("video-box");
    let yt_player = document.createElement("div");
    yt_player.id = "ytplayer";
    if (yt_data != undefined) {
      yt_player.innerHTML = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + yt_data.items[0].id.videoId + '?autoplay=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    } else {
      yt_player.innerHTML = "Loading Error";
    }
    video_box.appendChild(yt_player);
    root.appendChild(video_box);

    let video_describ = document.createElement("div");
    video_describ.classList.add("video-describ");

    let left_describ = document.createElement("div");
    left_describ.classList.add("left-describ");

    let video_title = document.createElement("div");
    video_title.classList.add("video-title");
    if (yt_data != undefined) {
      video_title.innerHTML = yt_data.items[0].snippet.title;
    } else {
      video_title.innerHTML = "Error";
    }
    left_describ.appendChild(video_title);

    let video_views = document.createElement("div");
    video_views.classList.add("video-views");
    if (video_data != undefined) {
      video_views.innerHTML = '<i class="fas fa-eye"></i><span>' + video_data.items[0].statistics.viewCount + '</span>';
    } else {
      video_views.innerHTML = '<i class="fas fa-eye"></i><span>#</span>';
    }
    left_describ.appendChild(video_views);

    video_describ.appendChild(left_describ);

    let right_describ = document.createElement("div");
    right_describ.classList.add("right-describ");

    let video_reaction = document.createElement("div");
    video_reaction.classList.add("video-reaction");
    let like = document.createElement('div');
    like.classList.add('like');
    if (video_data != undefined) {
      like.innerHTML = '<i class="fas fa-thumbs-up"></i><span>' + video_data.items[0].statistics.likeCount + '</span>';
    } else {
      like.innerHTML = '<i class="fas fa-thumbs-up"></i><span>#</span>';
    }
    video_reaction.appendChild(like);
    let dislike = document.createElement('div');
    dislike.classList.add('dislike');
    if (video_data != undefined) {
      dislike.innerHTML = '<i class="fas fa-thumbs-down"></i><span>' + video_data.items[0].statistics.dislikeCount + '</span>';
    } else {
      dislike.innerHTML = '<i class="fas fa-thumbs-down"></i><span>#</span>';
    }
    video_reaction.appendChild(dislike);
    right_describ.appendChild(video_reaction);
    video_describ.appendChild(right_describ);

    root.appendChild(video_describ);
  },
  twitch_click: () => {
    if (streamBox.status != "twitch") {
      root = document.getElementById("box-stream");
      root.innerHTML = "";
      streamBox.twitch();
      streamBox.status = "twitch";
      document.getElementById("menu-twitch").classList.remove("no-active");
      document.getElementById("menu-yt").classList.add("no-active");
    }
  },
  yt_click: () => {
    if (streamBox.status != "yt") {
      root = document.getElementById("box-stream");
      root.innerHTML = "";
      streamBox.youtube();
      streamBox.status = "yt";
      document.getElementById("menu-twitch").classList.add("no-active");
      document.getElementById("menu-yt").classList.remove("no-active");
    }
  }
};

let twitch_button = document.getElementById("menu-twitch");
twitch_button.addEventListener("click", streamBox.twitch_click);
let yt_button = document.getElementById("menu-yt");
yt_button.addEventListener("click", streamBox.yt_click);

let socialButtons = {
  status: "hidden",
  working: false,
  show: () => {
    socialButtons.working = true;
    socialButtons.status = "showed";
    trigger = document.getElementsByClassName("trigger-dot")[0];
    trigger.innerHTML = '<i class="fas fa-times"></i>';
    dots = document.getElementsByClassName("social-dot");
    dots[1].style.display = "flex";
    setTimeout(() => {
      dots[2].style.display = "flex";
    }, 100);
    setTimeout(() => {
      dots[3].style.display = "flex";
    }, 200);
    setTimeout(() => {
      dots[4].style.display = "flex";
    }, 300);
    setTimeout(() => {
      dots[5].style.display = "flex";
    }, 400);
    setTimeout(() => {
      dots[6].style.display = "flex";
    }, 500);
    setTimeout(() => {
      dots[7].style.display = "flex";
      socialButtons.working = false;
    }, 600);
  },
  hide: () => {
    socialButtons.working = true;
    socialButtons.status = "hidden";
    dots = document.getElementsByClassName("social-dot");
    dots[7].classList.add("fade-out");
    setTimeout(() => {
      dots[7].style.display = "none";
      dots[7].classList.remove("fade-out");
    }, 200);
    setTimeout(() => {
      dots[6].classList.add("fade-out");
      setTimeout(() => {
        dots[6].style.display = "none";
        dots[6].classList.remove("fade-out");
      }, 200);
    }, 100);
    setTimeout(() => {
      dots[5].classList.add("fade-out");
      setTimeout(() => {
        dots[5].style.display = "none";
        dots[5].classList.remove("fade-out");
      }, 200);
    }, 200);
    setTimeout(() => {
      dots[4].classList.add("fade-out");
      setTimeout(() => {
        dots[4].style.display = "none";
        dots[4].classList.remove("fade-out");
      }, 200);
    }, 300);
    setTimeout(() => {
      dots[3].classList.add("fade-out");
      setTimeout(() => {
        dots[3].style.display = "none";
        dots[3].classList.remove("fade-out");
      }, 200);
    }, 400);
    setTimeout(() => {
      dots[2].classList.add("fade-out");
      setTimeout(() => {
        dots[2].style.display = "none";
        dots[2].classList.remove("fade-out");
      }, 200);
    }, 500);
    setTimeout(() => {
      dots[1].classList.add("fade-out");
      setTimeout(() => {
        dots[1].style.display = "none";
        dots[1].classList.remove("fade-out");
      }, 200);
    }, 600);
    setTimeout(() => {
      trigger = document.getElementsByClassName("trigger-dot")[0];
      trigger.innerHTML = '<i class="fas fa-link"></i>';
      socialButtons.working = false;
    }, 800);
  },
  change: () => {
    if (socialButtons.status == "showed") {
      if (!socialButtons.working) {
        socialButtons.hide();
      }
    } else {
      if (!socialButtons.working) {
        socialButtons.show();
      }
    }
  }
};
//prettier-ignore
document.getElementsByClassName('trigger-dot')[0].addEventListener('click', socialButtons.change);

function refresh() {
  $.ajax({
    url: "https://api.twitch.tv/kraken/streams/" + userID,
    dataType: "json",
    headers: {
      Accept: "application/vnd.twitchtv.v5+json",
      "Client-ID": "0gr6nzyigbsyfqkkbqtqd9p3turioo"
    },
    success: function (data) {
      json_data = data;
      let dot = document.getElementById("stream-dot");
      if (data["stream"] == null) {
        dot.classList.remove("stream-on");
        dot.classList.add("stream-off");
      } else {
        dot.classList.remove("stream-off");
        dot.classList.add("stream-on");
      }
      if (streamBox.status == "twitch") {
        if (data.stream != null) {
          //prettier-ignore
          document.getElementsByClassName('title-text')[0].innerHTML = data.stream.channel.status;
        } else {
          //prettier-ignore
          document.getElementsByClassName('title-text')[0].innerHTML = "Stream Offline";
        }

        if (data.stream != null) {
          //prettier-ignore
          document.getElementsByClassName('views-number')[0].innerHTML = data.stream.viewers;
        } else {
          //prettier-ignore
          document.getElementsByClassName('views-number')[0].innerHTML = "0";
        }

        if (data.stream != null) {
          //prettier-ignore
          document.getElementsByClassName('game-name')[0].innerHTML = data.stream.game;
        } else {
          //prettier-ignore
          document.getElementsByClassName('game-name')[0].innerHTML = "Offline";
        }
      }
      setTimeout(refresh, 5000);
    }
  });
}

setTimeout(refresh, 5000);

let textBox = {
  status: "omnie",
  omnie: () => {
    let root = document.getElementsByClassName("box")[0];
    let photo = document.createElement("div");
    photo.classList.add("photo");
    photo.innerHTML = '<img src="./media/photo.png" alt="profile" />';
    root.appendChild(photo);
    let text = document.createElement("div");
    text.classList.add("omnie");
    text.innerHTML = `Cześć jestem Mariusz Sitnik, w internecie znany również jako
    MapeT. Od 10 roku życia gram w siatkówkę, a od niedawna także
    prowadzę kontent z grami na Twitch'u i YouTube. Głównie gram w
    Counter Strike'a, ale zdarzają się również inne gry.`;
    root.appendChild(text);
  },
  succes: () => {
    let root = document.getElementsByClassName("box")[0];
    let text = document.createElement("div");
    text.classList.add("succes");
    text.innerHTML = `W wieku 9 lat zacząłem grać w gry, a od 10 roku życia w cs'a. W
    wieku 14 lat zacząłem grę na "poważnie" i znalazłem swoją
    pierwszą organizacje: FirePlay, z którą zdobyłem pierwsze
    miejsce w turnieju online "GoldinCup". Niestety po paru
    tygodniach od zwycięstwa drużyna się rozpadła. Zacząłem szukać
    kolejnej drużyny i szybko znalazłem półprofesjonalną
    organizacje. Infraction gwarantowało mi darmowy serwer do
    ćwiczeń, TeamSpeak i płacenie składek na turnieje online jak i
    offline. Razem z tą organizacją spędziłem 2 lata. Zdobywając
    parę nagród m.in. 1 miejsce w Asus Rog challenge, 3 miejsce w
    Omen tournament.`;
    root.appendChild(text);
  },
  omnie_click: () => {
    if (textBox.status == "succes") {
      document.getElementsByClassName("succes")[0].remove();
      //prettier-ignore
      document.getElementsByClassName('menu-item')[0].classList.remove('no-active');
      //prettier-ignore
      document.getElementsByClassName("menu-item")[1].classList.add("no-active");
      textBox.omnie();
      textBox.status = "omnie";
    }
  },
  succes_click: () => {
    if (textBox.status == "omnie") {
      document.getElementsByClassName("photo")[0].remove();
      document.getElementsByClassName("omnie")[0].remove();
      //prettier-ignore
      document.getElementsByClassName('menu-item')[1].classList.remove('no-active');
      //prettier-ignore
      document.getElementsByClassName("menu-item")[0].classList.add("no-active");
      textBox.succes();
      textBox.status = "succes";
    }
  }
};

textBox.omnie();
//prettier-ignore
document.getElementsByClassName('menu-item')[0].addEventListener('click', textBox.omnie_click);
//prettier-ignore
document.getElementsByClassName('menu-item')[1].addEventListener('click', textBox.succes_click);
