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

function playSnackBar(snackBarID) {
  const snackBar1 = "Song Added To PlayList";
  const snackBar2 = "Song Already Exists In Playlist";
  const snackBar3 = "Song Removed From Playlist";
  const snackBar4 = "All Songs Have Been Removed From The Playlist";

  const snackBarSearch = document.querySelector("#snackbarSearch");
  const snackBarSong = document.querySelector("#snackbarSong");
  const snackBarPlaylist = document.querySelector("#snackbarPlaylist");

  //added to playlist
  if (snackBarID === 1) {
    runSnackBar(snackBarSearch, snackBar1);
    runSnackBar(snackBarSong, snackBar1);
  }
  //already exists
  if (snackBarID === 2) {
    runSnackBar(snackBarSearch, snackBar2);
    runSnackBar(snackBarSong, snackBar2);
  }
  //removed from playlist
  if (snackBarID === 3) {
    runSnackBar(snackBarPlaylist, snackBar3);
  }
  //everything removed from playlist
  if (snackBarID === 4) {
    runSnackBar(snackBarPlaylist, snackBar4);
  }
  //play snackbar when conditions are met
  function runSnackBar(element, text) {
    element.textContent = text;
    element.className = "show";
    setTimeout(function () {
      element.className = element.className.replace("show", "");
    }, 2950);
  }
}

//hoverable credits using mouseover method
function creditHover() {
  const creditButton = document.querySelector("#credits");
  const githubPages = document.querySelector("#author");
  const authorName = document.querySelector("#pages");

  githubPages.style.display = "none";
  authorName.style.display = "none";

  creditButton.addEventListener("mouseover", () => {
    githubPages.style.display = "";
    authorName.style.display = "";
    setTimeout(function () {
      githubPages.style.display = "none";
      authorName.style.display = "none";
    }, 5000);
  });
}

//sort the table with row switching
//ideas and thoughts from https://www.geeksforgeeks.org/how-to-sort-rows-in-a-table-using-javascript/

let ascending = true;
const titleSort = document.querySelector("#titleSort");
const artistSort = document.querySelector("#artistSort");
const yearSort = document.querySelector("#yearSort");
const genreSort = document.querySelector("#genreSort");
const popularitySort = document.querySelector("#popularitySort");
function sortTable(columnIndex) {

  document.querySelectorAll("th").forEach(header => {
    header.classList.remove("ascending", "descending");
  });

  let table, rows, switching, i, x, y, shouldSwitch;
  table = document.querySelector("#tableHead");
  switching = true;

  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].querySelectorAll("td")[columnIndex];
      y = rows[i + 1].querySelectorAll("td")[columnIndex];

      let xValue, yValue;

      if (isNaN(x.innerHTML)) {
        xValue = x.innerHTML.toLowerCase();
        yValue = y.innerHTML.toLowerCase();
      } else {
        xValue = parseInt(x.innerHTML);
        yValue = parseInt(y.innerHTML);
      }

      if (ascending) {
        shouldSwitch = xValue > yValue;
      } else {
        shouldSwitch = xValue < yValue;
      }

      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }
  ascending = !ascending;

  const currentHeader = document.querySelector(`#tableHead th:nth-child(${columnIndex + 1})`);
  currentHeader.classList.toggle("ascending", ascending);
  currentHeader.classList.toggle("descending", !ascending);
}
