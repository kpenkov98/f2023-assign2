function getMusicData() {
  //check if localstorage has no data and add the data
  if (localStorage.length === 0 || !localStorage.getItem("musicData")) {
    fetchData();
  }
  //data already exists
  storedData = JSON.parse(localStorage.getItem("musicData"));

  //sort by title
  const sortedData = storedData.sort((a, b) => {
    return a.title < b.title ? -1 : 1;
  });

  return sortedData;
}

function fetchData() {
  const api =
    "https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php";
  fetch(api)
    .then((resp) => resp.json())
    .then((songs) => {
      //add api data to localstorage
      localStorage.setItem("musicData", JSON.stringify(songs));
    })
    .catch((error) => {
      console.error("Unable to Fetch Data ", error);
    });
}
