//this file is for code related to view 1 (Search/Browse)
function displaySongs(musicTable) {
  musicTable.forEach((song) => {
    const songDetail = document.createElement("li");

    songDetail.textContent = song.title + ' ' +song.artist.name;

    document.querySelector("#songList").appendChild(songDetail);
  });
}
