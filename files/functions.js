//reset the musicTable once reset button has been used
function resetMusicTable(reset) {
  if (reset === true) {
    //clear any previous messages in DIV .eight
    document.querySelector("#statusMessage").textContent = "";
    //make the table visible from any previous searches
    document.querySelector("#statusMessage").style.display = "none";
    document.querySelector("#tableHead").style.display = "";
    blurOptions();
  }
}

function changeViews(viewId) {
  //hides views
  const views = document.querySelectorAll(".view");
  views.forEach((view) => view.classList.remove("active-view"));

  //shows the selected view
  const selectedView = document.getElementById(viewId);
  if (selectedView) {
    selectedView.classList.add("active-view");
  }
}

//diplay songs
function displaySongs(musicTable) {
  const table = document.querySelector("#songTable");
  clearTable();

  //create table to show the songs
  musicTable.forEach((song) => {
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
      songTitleClick(e, song, musicTable);
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
    addToFav.textContent = "Add";
    addToFav.classList.add("button", "button-primary", "buttonInTable");
    addToFav.addEventListener("click", function () {
      playSnackBar();
      addToPlaylist(song.song_id);
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
//clear the table before refilling it
function clearTable() {
  const table = document.querySelector("#songTable");
  while (table.rows.length > 0) {
    table.deleteRow(0);
  }
}

function playSnackBar() {}
