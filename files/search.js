//this file is for code related to view 1 (Search/Browse)

//funtion to prepopulate the artist and genre field
function populateSelect(songsFromAPI) {
  //sort and remove duplicate artists
  const artistNames = songsFromAPI.map((song) => song.artist.name);
  const sortedArtistArray = artistNames.sort();
  const uniqueArtists = removeDuplicate(sortedArtistArray);

  //sort and remove duplicate genres
  const genreNames = songsFromAPI.map((song) => song.genre.name);
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

//function to disable input until a radio button is clicked and undo blur
function disableInput() {
  const titleDisabledInput = document.querySelector("#titleText");
  const artistDisabledInput = document.querySelector("#artistName");
  const genreDisabledInput = document.querySelector("#genreName");
  const title = document.querySelector("#titleSearch");
  const artist = document.querySelector("#artistSearch");
  const genre = document.querySelector("#genreSearch");
  artist.style.filter = "";
  genre.style.filter = "";
  title.style.filter = "";
  titleDisabledInput.style.pointerEvents = "none";
  artistDisabledInput.style.pointerEvents = "none";
  genreDisabledInput.style.pointerEvents = "none";
}
//function to clear input from other fields if radio button has been used
function clearSearchInput() {
  const titleRadio = document.querySelector("#titleRadio");
  const artistRadio = document.querySelector("#artistRadio");
  const genreRadio = document.querySelector("#genreRadio");

  const searchForm = document.querySelector("#searchForm");

  const titleText = document.querySelector("#titleText");
  const artistName = document.querySelector("#artistName");
  const genreName = document.querySelector("#genreName");

  searchForm.addEventListener("click", function () {
    if (titleRadio.checked) {
      artistName.selectedIndex = 0;
      genreName.selectedIndex = 0;
      return;
    }

    if (artistRadio.checked) {
      titleText.value = "";
      genreName.selectedIndex = 0;
      return;
    }

    if (genreRadio.checked) {
      titleText.value = "";
      artistName.selectedIndex = 0;
      return;
    }
  });
}

//function to blur and isolate other options when radio button is selected
function blurOptions(clicked) {
  const title = document.querySelector("#titleSearch");
  const artist = document.querySelector("#artistSearch");
  const genre = document.querySelector("#genreSearch");
  const titleDisabledInput = document.querySelector("#titleText");
  const artistDisabledInput = document.querySelector("#artistName");
  const genreDisabledInput = document.querySelector("#genreName");
  artist.style.filter = "";
  genre.style.filter = "";
  title.style.filter = "";
  titleDisabledInput.style.pointerEvents = "none";
  artistDisabledInput.style.pointerEvents = "none";
  genreDisabledInput.style.pointerEvents = "none";

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
//search function
function search(songList) {
  displaySongs(songList);
  let constantTable = songList.slice();
  let searchTable = [];
  const searchFunction = document.querySelector("#searchBox");
  searchFunction.addEventListener("click", function () {
    let title = document.querySelector("#titleText").value.trim().toLowerCase();
    let artist = document.querySelector("#artistName").value;
    let genre = document.querySelector("#genreName").value;

    //prewritten message if unable to find songs or no entry
    const status = document.querySelector("#statusMessage");
    status.textContent = "No Songs Found, Please Adjust Your Search";
    status.style.display = "none";

    if (title == "" && artist == "" && genre == "") {
      status.style.display = "";
      document.querySelector("#tableHead").style.display = "none";
      return;
    }
    searchTable = constantTable;

    if (title !== "") {
      searchTable = songList.filter((song) =>
        song.title.toLowerCase().includes(title)
      );
    }

    if (artist !== "") {
      searchTable = searchTable.filter((song) => song.artist.name === artist);
    }

    if (genre !== "") {
      searchTable = searchTable.filter((song) => song.genre.name === genre);
    }

    if (searchTable.length === 0) {
      status.style.display = "";
      document.querySelector("#tableHead").style.display = "none";
      return;
    }

    status.style.display = "none";

    //reset table after submit
    document.querySelector("#searchForm").reset();
    disableInput();
    document.querySelector("#songTable").style.display = "";
    songList = searchTable;
    displaySongs(songList);
  });

  document.querySelector("#clearSearch").addEventListener("click", function () {
    songList = constantTable;
    displaySongs(songList);
  });
}
