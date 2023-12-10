//this file is for code related to Song Details
function songDetailsTable(data) {
  musicTable = data;
}
//react to a song title being clicked and take to the song view
function songTitleClick(e) {
  
  //add song to playlist from the song details view
  document
    .querySelector("#addFromSongDetails")
    .addEventListener("click", function () {
      addToPlaylist(e.target.parentNode.dataset.song);
      console.log(e.target.parentNode.dataset.song);
    });
  //change views to see  the song details
  changeViews("song");

  const row = e.target.parentNode;
  const id = row.dataset.song;
  const selectedSong = musicTable.find(
    (musicTable) => musicTable.song_id == id
  );

  list = document.querySelector("#musicInfoList");

  const title = document.createElement("li");
  title.textContent = "Title: " + selectedSong.title;

  const artist = document.createElement("li");
  artist.textContent = "Artist: " + selectedSong.artist.name;

  const genre = document.createElement("li");
  genre.textContent = "Genre: " + selectedSong.genre.name;

  const year = document.createElement("li");
  year.textContent = "Year: " + selectedSong.year;

  const duration = document.createElement("li");
  duration.textContent = "Duration: " + selectedSong.details.duration;

  const bpm = document.createElement("li");
  bpm.textContent = "BPM: " + selectedSong.details.bpm;

  const energy = document.createElement("li");
  energy.textContent = "Energy: " + selectedSong.analytics.energy;

  const danceability = document.createElement("li");
  danceability.textContent = "Dance.: " + selectedSong.analytics.danceability;

  const liveness = document.createElement("li");
  liveness.textContent = "Live.: " + selectedSong.analytics.liveness;

  const valence = document.createElement("li");
  valence.textContent = "Valence: " + selectedSong.analytics.valence;

  const acoust = document.createElement("li");
  acoust.textContent = "Acoust.: " + selectedSong.analytics.acousticness;

  const speech = document.createElement("li");
  speech.textContent = "Speech.: " + selectedSong.analytics.speechiness;

  const popularity = document.createElement("li");
  popularity.textContent = "Pop.: " + selectedSong.details.popularity;

  list.appendChild(title);
  list.appendChild(artist);
  list.appendChild(genre);
  list.appendChild(year);
  list.appendChild(duration);
  list.appendChild(bpm);
  list.appendChild(energy);
  list.appendChild(danceability);
  list.appendChild(liveness);
  list.appendChild(valence);
  list.appendChild(acoust);
  list.appendChild(speech);
  list.appendChild(popularity);

  //return to search view and reset the list for next song detail.
  const resetButton = document.querySelector("#resetSongDetails");
  resetButton.addEventListener("click", function () {
      changeViews("search");
      while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
      }

   });

}
