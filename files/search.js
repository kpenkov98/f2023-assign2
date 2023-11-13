//this file is for code related to view 1 (Search/Browse)

//diplay songs on the search/browse page
function displaySongs(musicTable) {

  const table = document.querySelector("#songTable");

  //create table to show the songs on the main page
  musicTable.forEach((song) => {
    const row = document.createElement("tr");

    const title = document.createElement("td");
    title.textContent = song.title;

    const artist = document.createElement("td");
    artist.textContent = song.artist.name;

    const year = document.createElement("td");
    year.textContent = song.year;

    const genre = document.createElement("td");
    genre.textContent = song.genre.name;

    const popularity = document.createElement("td");
    popularity.textContent = song.details.popularity;

    const addToFav = document.createElement("a");
    addToFav.textContent = "Add";

    row.appendChild(title);
    row.appendChild(artist);
    row.appendChild(year);
    row.appendChild(genre);
    row.appendChild(popularity);
    row.appendChild(addToFav);
    table.appendChild(row);
  });
}



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
  uniqueArtists.forEach((artist) => {
    //artist
    const artistOption = document.createElement("option");
    artistOption.textContent = artist;
    artistSelect.appendChild(artistOption);
  });

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

function searchSong(searchBox) {
  let songDetails;

  if (searchBox == null) {
    songDetails = "Song Not Found";
  } else {
    songDetails = song.find(searchBox);
  }
}
