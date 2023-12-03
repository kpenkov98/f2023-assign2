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

//react to a song title being clicked
function songTitleClick(e) {
  const row = e.target.parentNode;
  const id = row.dataset.song;
  const selectedSong = musicTable.find(
    (musicTable) => musicTable.song_id == id
  );

  console.log(selectedSong.title);
}

//function to blur other options when radio button is selected
function blurOptions(clicked) {
  const title = document.getElementById("titleSearch");
  const artist = document.getElementById("artistSearch");
  const year = document.getElementById("yearSearch");
  const genre = document.getElementById("genreSearch");

  if (clicked === "titleSearch") {
    artist.style.filter = "blur(2px)";
    year.style.filter = "blur(2px)";
    genre.style.filter = "blur(2px)";
    title.style.filter = '';
  } else if (clicked === "artistSearch") {
    title.style.filter = "blur(2px)";
    year.style.filter = "blur(2px)";
    genre.style.filter = "blur(2px)";
    artist.style.filter = '';
  } else if (clicked === "yearSearch") {
    artist.style.filter = "blur(2px)";
    title.style.filter = "blur(2px)";
    genre.style.filter = "blur(2px)";
    year.style.filter = '';
  } else if (clicked === "genreSearch") {
    artist.style.filter = "blur(2px)";
    year.style.filter = "blur(2px)";
    title.style.filter = "blur(2px)";
    genre.style.filter = '';
  }
}


function search(radioButton, searchButton) {

  const title = document.getElementById("titleSearch");
  const artist = document.getElementById("artistSearch");
  const year = document.getElementById("yearSearch");
  const genre = document.getElementById("genreSearch");

}

//function that searches for titles
function searchTitle(title) {


const searchTable = musicTable.find(song => song.title == title);
return searchTable;



}

//function that searches for artists
function searchArtist() {}

//function that searches for genres
function searchGenre() {}

//function that selects years
function searchYear() {}
