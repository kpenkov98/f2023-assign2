// for playlist related view
let playlistArray = new Set();
let fullTable = [];

document.addEventListener("DOMContentLoaded", function () {
  setErrorMessage();
  retrieveSongs();
});

//add to songIDs array
function addToPlaylist(songid) {
  console.log(songid);
  if (playlistArray.has(songid)) {
    playSnackBar(2);
  } else {
    playSnackBar(1);
    playlistArray.add(songid);
    retrieveSongs();
  }
}
//find and clear song based on its ID
function clearSong(songid) {
  //find and remove songID
  playlistArray.delete(songid);
  playSnackBar(3);
  retrieveSongs();
}

//clear the playlist completely
function clearPlaylist() {
  playlistArray.clear();
  retrieveSongs();
  playSnackBar(4);
}

function playlistSongList(listofsongs) {
  fullTable = listofsongs;
}

//compare and retrieve songs
function retrieveSongs() {
  //total songs in the playlist momentarily
  const addTotalSongs = document.querySelector("#amountOfSongs");
  addTotalSongs.textContent = "Songs In Your Playlist " + playlistArray.size;

  setErrorMessage();

  const songArray = [];
  playlistArray.forEach((songId) => {
    const foundSong = fullTable.find((song) => song.song_id === songId);

    if (foundSong) {
      songArray.push(foundSong);
    }
  });

  setErrorMessage();
  displayPlaylist(songArray);
}

//clear table and set message that playlist is empty
function setErrorMessage() {
  const statusOfMessage = document.querySelector("#statusMessagePlaylist");
  const statusOfTable = document.querySelector("#playlistTH");

  if (playlistArray.size === 0) {
    statusOfMessage.style.display = "";
    statusOfMessage.textContent = "No Songs Selected";
    statusOfTable.style.display = "none";
  } else {
    statusOfMessage.style.display = "none";
    statusOfTable.style.display = "";
  }
}

//show playlist, update playlist if array changes
function displayPlaylist(addedSongs) {
  const table = document.querySelector("#playlistTable");
  clearPlaylistTable();

  //create table to show the songs
  addedSongs.forEach((song) => {
    const row = document.createElement("tr");

    const songId = document.createElement("td");
    songId.textContent = song.song_id;
    songId.setAttribute("style", "display: none;");

    const title = document.createElement("td");
    title.textContent = song.title;

    //title styling
    title.style.textDecoration = "underline";
    title.style.cursor = "pointer";
    title.style.color = "blue";
    title.addEventListener("mouseover", () => {
      title.style.color = "black";
    });
    title.addEventListener("mouseout", () => {
      title.style.color = "blue";
    });

    //song details
    row.dataset.song = song.song_id;
    title.addEventListener("click", (e) => {
      songTitleClick(e, song, addedSongs);
    });

    const artist = document.createElement("td");
    artist.textContent = song.artist.name;

    const year = document.createElement("td");
    year.textContent = song.year;

    const genre = document.createElement("td");
    genre.textContent = song.genre.name;

    const popularity = document.createElement("td");
    popularity.textContent = song.details.popularity;

    const addToFav = document.createElement("td");
    addToFav.textContent = "Remove";
    addToFav.classList.add("button", "button-primary", "buttonInTable");
    addToFav.addEventListener("click", function () {
      clearSong(song.song_id);
      playSnackBar(2);
      retrieveSongs();
    });

    row.appendChild(songId);
    row.appendChild(title);
    row.appendChild(artist);
    row.appendChild(year);
    row.appendChild(genre);
    row.appendChild(popularity);
    row.appendChild(addToFav);
    table.appendChild(row);
  });
}

function clearPlaylistTable() {
  const table = document.querySelector("#playlistTable");
  while (table.rows.length > 0) {
    table.deleteRow(0);
  }
}
