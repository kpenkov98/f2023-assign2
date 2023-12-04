//this file is for code related to Song Details

//react to a song title being clicked and take to the song view
function songTitleClick(e) {

    const row = e.target.parentNode;
    const id = row.dataset.song;
    const selectedSong = musicTable.find(
      (musicTable) => musicTable.song_id == id
    );
//Song Info
// const title = selectedSong.title
// const artist = selectedSong.artist
// const artistType = selectedSong.artistType
// const genre = selectedSong.genre
// const year = selectedSong.year
// const duration = selectedSong.duration
// const bpm = selectedSong.bpm
// const energy = selectedSong.energy
// const danceability = selectedSong.danceability
// const liveness = selectedSong.liveness
// const valence = selectedSong.valence
// const acoust = selectedSong.acousticness
// const speech = selectedSong.speechiness
// const popularity = selectedSong.popularity



  }