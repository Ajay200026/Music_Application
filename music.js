document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector(".sidebar");
  const menuItems = document.querySelectorAll(".menu li");
  const createPlaylist = document.getElementById("create-playlist");
  const playlistPopup = document.getElementById("playlist-popup");
  const createButton = document.getElementById("create-button");
  const playlistNameInput = document.getElementById("playlist-name");
  const playlists = document.getElementById("playlists");

  const audioPlayer = document.getElementById("audioPlayer");
  const trackTitle = document.querySelector(".track-info h3");
  const trackArtist = document.querySelector(".track-info p");
  const albumArt = document.querySelector(".album-art");
  const playButton = document.querySelector(
    ".playback-controls .control-button:nth-child(2)"
  );
  let isPlaying = false;

  // Sample music data
  const musicData = {
    song1: {
      src: "./love story.mp3",
      title: "Love story",
      artist: "Sanjie",
      albumArt: "./lovestory.jpeg",
    },
    song2: {
      src: "./NyabagamVarshangalkku.mp3",
      title: "Anjaana Anjaani",
      artist: "Vishal-Shekhar",
      albumArt: "https://via.placeholder.com/50",
    },
    song3: {
      src: "./NyabagamVarshangalkku.mp3",
      title: "Anjaani",
      artist: "Shekhar",
      albumArt: "https://via.placeholder.com/50",
    },
    // Continue adding other songs...
  };

  // Populate the grid items with song titles and artists
  document.querySelectorAll(".grid-item").forEach((item) => {
    const songKey = item.getAttribute("data-music");
    const song = musicData[songKey];

    if (song) {
      const pTag = item.querySelector("p");
      pTag.innerHTML = `${song.title}<br>${song.artist}`;
    }
  });

  // Handle grid item click to play music
  document.querySelectorAll(".play-btn").forEach((button) => {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      // Get the parent grid-item's data-music attribute
      const gridItem = this.closest(".grid-item");
      const songKey = gridItem.getAttribute("data-music");
      const song = musicData[songKey];

      audioPlayer.src = song.src;
      trackTitle.textContent = song.title;
      trackArtist.textContent = song.artist;
      albumArt.src = song.albumArt;

      audioPlayer.play();
      isPlaying = true;
      playButton.innerHTML = `<i class="fas fa-pause"></i>`;
    });
  });

  // Hover effect to expand sidebar
  menuItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      sidebar.classList.add("expanded");
    });

    item.addEventListener("mouseleave", () => {
      sidebar.classList.remove("expanded");
    });
  });

  // Show popup to create playlist
  createPlaylist.addEventListener("click", () => {
    playlistPopup.style.display = "block";
  });

  // Create playlist and add to sidebar
  createButton.addEventListener("click", () => {
    const playlistName = playlistNameInput.value.trim();
    if (playlistName) {
      const li = document.createElement("li");
      li.innerHTML = `<i class="fas fa-music"></i><span class="playlist-title">${playlistName}</span>`;
      li.addEventListener("click", () => {
        alert(`Navigating to ${playlistName} page`);
        // Add logic to navigate to playlist page
      });
      playlists.appendChild(li);
      playlistNameInput.value = "";
      playlistPopup.style.display = "none";
    }
  });

  // Hide popup when clicking outside
  document.addEventListener("click", (e) => {
    if (!playlistPopup.contains(e.target) && e.target !== createPlaylist) {
      playlistPopup.style.display = "none";
    }
  });

  // Play/Pause toggle
  playButton.addEventListener("click", () => {
    if (isPlaying) {
      audioPlayer.pause();
      playButton.innerHTML = `<i class="fas fa-play"></i>`;
    } else {
      audioPlayer.play();
      playButton.innerHTML = `<i class="fas fa-pause"></i>`;
    }
    isPlaying = !isPlaying;
  });

  // Update volume
  const volumeControl = document.querySelector(
    ".volume-controls input[type='range']"
  );
  volumeControl.addEventListener("input", (e) => {
    audioPlayer.volume = e.target.value / 100;
  });

  // Update progress bar as song plays
  audioPlayer.addEventListener("timeupdate", () => {
    const progressBar = document.querySelector(
      ".progress-bar input[type='range']"
    );
    progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  });

  // Seek through song
  const progressBar = document.querySelector(
    ".progress-bar input[type='range']"
  );
  progressBar.addEventListener("input", (e) => {
    audioPlayer.currentTime = (e.target.value / 100) * audioPlayer.duration;
  });

  // Check if a user is already logged in
  // Check if a user is already logged in
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  console.log("Logged in user:", loggedInUser);
  if (loggedInUser) {
    const userInitial = document.querySelector(".user-initial");
    userInitial.textContent = loggedInUser.charAt(0).toUpperCase();
    console.log("User initial set to:", userInitial.textContent);
  } else {
    console.log("No logged-in user found.");
  }
});

// Function to format time from seconds to MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const audioPlayer = document.getElementById("audioPlayer");
  const progressBar = document.querySelector(
    ".progress-bar input[type='range']"
  );
  const currentTimeLabel = document.querySelector(
    ".progress-bar span:first-child"
  );
  const durationLabel = document.querySelector(".progress-bar span:last-child");

  // Set the duration when the song metadata is loaded
  audioPlayer.addEventListener("loadedmetadata", function () {
    progressBar.max = audioPlayer.duration;
    durationLabel.textContent = formatTime(audioPlayer.duration);
  });

  // Update progress bar and current time label as the song plays
  audioPlayer.addEventListener("timeupdate", function () {
    progressBar.value = audioPlayer.currentTime;
    currentTimeLabel.textContent = formatTime(audioPlayer.currentTime);
  });

  // Seek to the point in the song when user changes the range input
  progressBar.addEventListener("input", function (e) {
    audioPlayer.currentTime = e.target.value;
  });
});

// JavaScript
const modeToggle = document.getElementById("mode-toggle");

modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
});

// Get the modal element
const modal = document.getElementById("popupModal");

// Get the close button element
const closeBtn = document.querySelector(".close-btn");

// Handle playlist button click to show modal
document.querySelectorAll(".playlist-btn").forEach((button) => {
  button.addEventListener("click", function (event) {
    event.stopPropagation();
    modal.style.display = "flex";
  });
});

// Handle close button click to hide modal
closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// Handle click outside of modal to close it
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
function saveToPlaylist() {
  // Get the song details (you'll need to replace this with actual data)
  var songTitle = "Song Title";
  var songArtist = "Song Artist";

  console.log("Saving to playlist:", songTitle, songArtist);

  // Get the existing playlist from localStorage
  var playlist = localStorage.getItem("playlist");

  console.log("Existing playlist:", playlist);

  // If the playlist doesn't exist, create a new one
  if (!playlist) {
    playlist = [];
  } else {
    playlist = JSON.parse(playlist);
  }

  console.log("Parsed playlist:", playlist);

  // Add the new song to the playlist
  playlist.push({ title: songTitle, artist: songArtist });

  console.log("Updated playlist:", playlist);

  // Save the updated playlist to localStorage
  localStorage.setItem("playlist", JSON.stringify(playlist));

  console.log("Playlist saved to localStorage");

  // Show an alert message
  alert("Saved to playlist!");
}
