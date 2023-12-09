// for playlist related view
let playlistArray = [];
let fullTable = [];
//add to songIDs array
function addToPlaylist(songid) {
  playlistArray.push(songid);
  retrieveSongs();
}
//find and clear song based on its ID
function clearSong(songid) {
  document.querySelector("#removeSong").addEventListener("click", function () {
    //find songid
    const index = playlistArray.indexOf(songid);
    //remove songid
    playlistArray.splice(index, 1);
  });
  //retrieveSongs();
}

//clear the playlist completely
function clearPlaylist() {
  document
    .querySelector("#clearPlaylist")
    .addEventListener("click", function () {
      while (playlistArray.length > 0) {
        playlistArray.pop();
      }
    });
  //retrieveSongs();
}

function playlistSongList(listofsongs) {
  fullTable = listofsongs;
}

//compare and retrieve songs
function retrieveSongs() {
  const songArray = [];

  console.log(playlistArray.toString());
  playlistArray.forEach((songId) => {
    const foundSong = fullTable.find((song) => song.song_id === songId);

    if (foundSong) {
      songArray.push(foundSong);
    }
  });

  displayPlaylist(songArray);
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
    addToFav.classList.add("button", "button-primary");
    addToFav.addEventListener("click", function () {
      clearSong(song.song_id);
      playSnackBar();
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
