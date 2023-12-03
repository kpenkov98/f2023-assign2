//this file is for code related to view 1 (Search/Browse)

//funtion to prepopulate the artist and genre field
function populateSelect(musicTable) {
  //sort and remove duplicate artists
  const artistNames = musicTable.map((song) => song.artist.name);
  const sortedArtistArray = artistNames.sort();
  const uniqueArtists = removeDuplicate(sortedArtistArray);

  //sort and remove duplicate genres
  const genreNames = musicTable.map((song) => song.genre.name);
  const sortedGenreArray = genreNames.sort();
  const uniqueGenres = removeDuplicate(sortedGenreArray);

  const artistSelect = document.querySelector("#artistName");
  const genreSelect = document.querySelector("#genreName");

  //clear any existing options
  artistSelect.innerHTML = "";
  genreSelect.innerHTML = "";

  //populate artist and genre drop down
  const emptyOption = document.createElement("option");
  artistSelect.appendChild(emptyOption);

  uniqueArtists.forEach((artist) => {
    //artist
    const artistOption = document.createElement("option");
    artistOption.textContent = artist;
    artistSelect.appendChild(artistOption);
  });

  const emptyGenreOption = document.createElement("option");
  genreSelect.appendChild(emptyGenreOption);

  uniqueGenres.forEach((genre) => {
    //genres
    const genreOption = document.createElement("option");
    genreOption.textContent = genre;
    genreSelect.appendChild(genreOption);
  });
}

//removes duplicates from lists
function removeDuplicate(data) {
  const uniqueArray = [];

  data.forEach((item, index, array) => {
    if (index === 0 || item !== array[index - 1]) {
      uniqueArray.push(item);
    }
  });

  return uniqueArray;
}

//react to a song title being clicked
function songTitleClick(e) {
  const row = e.target.parentNode;
  const id = row.dataset.song;
  const selectedSong = musicTable.find(
    (musicTable) => musicTable.song_id == id
  );

  console.log(selectedSong.title);
}

//function to disable input until a radio button is clicked
function disableInput() {
  const titleDisabledInput = document.querySelector("#titleText");
  const artistDisabledInput = document.querySelector("#artistName");
  const genreDisabledInput = document.querySelector("#genreName");

    titleDisabledInput.style.pointerEvents = "none";
    artistDisabledInput.style.pointerEvents = "none";
    genreDisabledInput.style.pointerEvents = "none";
}

//function to blur and isolate other options when radio button is selected
function blurOptions(clicked) {
  const title = document.querySelector("#titleSearch");
  const artist = document.querySelector("#artistSearch");
  const genre = document.querySelector("#genreSearch");
  const titleDisabledInput = document.querySelector("#titleText");
  const artistDisabledInput = document.querySelector("#artistName");
  const genreDisabledInput = document.querySelector("#genreName");

  if (clicked === "titleSearch") {
    artist.style.filter = "blur(2px)";
    genre.style.filter = "blur(2px)";
    title.style.filter = "";
    //title isolator and blur for other options
    titleDisabledInput.style.pointerEvents = "auto";
    artistDisabledInput.style.pointerEvents = "none";
    genreDisabledInput.style.pointerEvents = "none";
  } else if (clicked === "artistSearch") {
    title.style.filter = "blur(2px)";
    genre.style.filter = "blur(2px)";
    artist.style.filter = "";
    //artist isolator and blur for other options
    titleDisabledInput.style.pointerEvents = "none";
    artistDisabledInput.style.pointerEvents = "auto";
    genreDisabledInput.style.pointerEvents = "none";
  } else if (clicked === "genreSearch") {
    artist.style.filter = "blur(2px)";
    title.style.filter = "blur(2px)";
    genre.style.filter = "";
    //genre isolator and blur for other options
    titleDisabledInput.style.pointerEvents = "none";
    artistDisabledInput.style.pointerEvents = "none";
    genreDisabledInput.style.pointerEvents = "auto";
  }
}

function search(songList) {
  const title = document.querySelector("#titleText").value;
  const artist = document.querySelector("#artistName").value;
  const genre = document.querySelector("#genreName").value;
  let searchTable = [];

  if (title == "" && artist == "" && genre == "") {
    document.querySelector(".eight").innerHTML =
      "No Songs Found, Please Ajust Your Search";
    return;
  } else if (title !== "") {
    searchTable = songList.filter((song) => song.title == title);
    console.log("title is here");
  } else if (artist !== "") {
    searchTable = songList.filter((song) => song.artist.name == artist);
    console.log("artist is here");
  } else if (genre !== "") {
    searchTable = songList.filter((song) => song.genre.name == genre);
    console.log("genre is here");
  }

  if (searchTable.length === 0) {
    document.querySelector(".eight").innerHTML =
      "No Songs Found, Please Ajust Your Search";
    return;
  }
  console.log(searchTable);
  displaySongs(searchTable);
}
