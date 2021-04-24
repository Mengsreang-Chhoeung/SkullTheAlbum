function _(query) {
  return document.querySelector(query);
}
function _all(query) {
  return document.querySelectorAll(query);
}
let songList = [
  {
    thumbnail: "1.jpg",
    audio: "1.mp3",
    songname: "Demon",
    artistname: "វណ្ណដា-Vannda",
  },
  {
    thumbnail: "1.jpg",
    audio: "2.mp3",
    songname: "Out Da Mud",
    artistname: "វណ្ណដា-Vannda ft Vanndy",
  },
  {
    thumbnail: "1.jpg",
    audio: "3.mp3",
    songname: "Born This Way",
    artistname: "វណ្ណដា-Vannda",
  },
  {
    thumbnail: "1.jpg",
    audio: "4.mp3",
    songname: "Hot Boy",
    artistname: "វណ្ណដា-Vannda",
  },
  {
    thumbnail: "1.jpg",
    audio: "5.mp3",
    songname: "Rampage",
    artistname: "វណ្ណដា-Vannda",
  },
  {
    thumbnail: "1.jpg",
    audio: "6.mp3",
    songname: "You're Already Dead",
    artistname: "វណ្ណដា-Vannda",
  },
  {
    thumbnail: "1.jpg",
    audio: "7.mp3",
    songname: "Life Is A Bitch",
    artistname: "វណ្ណដា-Vannda ft Dash GVME",
  },
  {
    thumbnail: "1.jpg",
    audio: "8.mp3",
    songname: "Back In The Day",
    artistname: "វណ្ណដា-Vannda ft La Cima Cartel",
  },
  {
    thumbnail: "1.jpg",
    audio: "9.mp3",
    songname: "J+O",
    artistname: "វណ្ណដា-Vannda",
  },
  {
    thumbnail: "1.jpg",
    audio: "10.mp3",
    songname: "Hit The Road",
    artistname: "វណ្ណដា-Vannda",
  },
  {
    thumbnail: "1.jpg",
    audio: "11.mp3",
    songname: "Black Rose",
    artistname: "វណ្ណដា-Vannda",
  },
  {
    thumbnail: "1.jpg",
    audio: "12.mp3",
    songname: "Move On",
    artistname: "វណ្ណដា-Vannda",
  },
  {
    thumbnail: "1.jpg",
    audio: "13.mp3",
    songname: "No More",
    artistname: "វណ្ណដា-Vannda ft Songha",
  },
  {
    thumbnail: "1.jpg",
    audio: "14.mp3",
    songname: "2 Minute 4 You",
    artistname: "វណ្ណដា-Vannda",
  },
  {
    thumbnail: "1.jpg",
    audio: "15.mp3",
    songname: "Voice Memo",
    artistname: "វណ្ណដា-Vannda",
  },
  {
    thumbnail: "1.jpg",
    audio: "16.mp3",
    songname: "Nothing 2 Lose",
    artistname: "វណ្ណដា-Vannda",
  },
  {
    thumbnail: "1.jpg",
    audio: "17.mp3",
    songname: "Mama",
    artistname: "វណ្ណដា-Vannda ft KmengKhmer",
  },
  {
    thumbnail: "1.jpg",
    audio: "18.mp3",
    songname: "Wooden Box",
    artistname: "វណ្ណដា-Vannda",
  },
];

let currentSongIndex = 0;

let player = _(".player"),
  toggleSongList = _(".player .toggle-list");

let main = {
  audio: _(".player .main audio"),
  thumbnail: _(".player .main img"),
  seekbar: _(".player .main input"),
  songname: _(".player .main .details h2"),
  artistname: _(".player .main .details p"),
  prevControl: _(".player .main .controls .prev-control"),
  playPauseControl: _(".player .main .controls .play-pause-control"),
  nextControl: _(".player .main .controls .next-control"),
};

toggleSongList.addEventListener("click", function () {
  toggleSongList.classList.toggle("active");
  player.classList.toggle("activeSongList");
});

_(".player .player-list .list").innerHTML = songList
  .map(function (song, songIndex) {
    return `
		<div class="item" songIndex="${songIndex}">
			<div class="thumbnail">
				<img src="./image/${song.thumbnail}">
			</div>
			<div class="details">
				<h2>${song.songname}</h2>
				<p>${song.artistname}</p>
			</div>
		</div>
	`;
  })
  .join("");

let songListItems = _all(".player .player-list .list .item");
for (let i = 0; i < songListItems.length; i++) {
  songListItems[i].addEventListener("click", function () {
    currentSongIndex = parseInt(songListItems[i].getAttribute("songIndex"));
    loadSong(currentSongIndex);
    player.classList.remove("activeSongList");
  });
}

function loadSong(songIndex) {
  let song = songList[songIndex];
  main.thumbnail.setAttribute("src", "./image/" + song.thumbnail);
  document.body.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url("./image/${song.thumbnail}") center no-repeat`;
  document.body.style.backgroundSize = "cover";
  main.songname.innerText = song.songname;
  main.artistname.innerText = song.artistname;
  main.audio.setAttribute("src", "./audio/" + song.audio);
  main.seekbar.setAttribute("value", 0);
  main.seekbar.setAttribute("min", 0);
  main.seekbar.setAttribute("max", 0);
  main.audio.addEventListener("canplay", function () {
    main.audio.play();
    if (!main.audio.paused) {
      main.playPauseControl.classList.remove("paused");
    }
    main.seekbar.setAttribute("max", parseInt(main.audio.duration));
    main.audio.onended = function () {
      main.nextControl.click();
    };
  });
}
setInterval(function () {
  main.seekbar.value = parseInt(main.audio.currentTime);
}, 1000);

main.prevControl.addEventListener("click", function () {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = songList.length + currentSongIndex;
  }
  loadSong(currentSongIndex);
});
main.nextControl.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex + 1) % songList.length;
  loadSong(currentSongIndex);
});
main.playPauseControl.addEventListener("click", function () {
  if (main.audio.paused) {
    main.playPauseControl.classList.remove("paused");
    main.audio.play();
  } else {
    main.playPauseControl.classList.add("paused");
    main.audio.pause();
  }
});
main.seekbar.addEventListener("change", function () {
  main.audio.currentTime = main.seekbar.value;
});
loadSong(currentSongIndex);
