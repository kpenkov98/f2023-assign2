//disable input for the page until a radio box is selected
document.addEventListener("DOMContentLoaded", function () {
  const api =
    "https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php";

  let storedData;

  const load = document.querySelector("#showWhileLoading");
  const main = document.querySelector("#hideWhileLoading");
  //hide search table until api arrives
  main.style.display = "none";
  load.style.display = "none";

  document.addEventListener("load", getMusicData);

  disableInput();

  //prevent submit button from refreshing the page and messing up the table
  const buttonBehavior = document.querySelector("#searchForm");
  buttonBehavior.addEventListener("submit", function (e) {
    e.preventDefault();
  });

  function getMusicData() {
    //show loader
    main.style.display = "none";
    load.style.display = "";
    // hide load screen and main element

    //check if localstorage has no data and add the data
    if (localStorage.length === 0 || !localStorage.getItem("musicData")) {
      fetchData();
    } else {
      main.style.display = "";
      load.style.display = "none";
    }
    //data already exists
    storedData = JSON.parse(localStorage.getItem("musicData"));
    //sort by title
    let sortedData = storedData.sort((a, b) => {
      return a.title < b.title ? -1 : 1;
    });

    document.querySelector("#titleSort").addEventListener("click", function() {
      sortedData = storedData.sort((a, b) => {
        return a.title < b.title ? -1 : 1;
      });
    });
    document.querySelector("#artistSort").addEventListener("click", function() {
      sortedData = storedData.sort((a, b) => {
        return a.artist < b.artist ? -1 : 1;
      });
    });
    document.querySelector("#yearSort").addEventListener("click", function() {
      sortedData = storedData.sort((a, b) => {
        return a.year < b.year ? -1 : 1;
      });
    });
    document.querySelector("#genreSort").addEventListener("click", function() {
      sortedData = storedData.sort((a, b) => {
        return a.genre < b.genre ? -1 : 1;
      });
    });
    document.querySelector("#popularitySort").addEventListener("click", function() {
      sortedData = storedData.sort((a, b) => {
        return a.popularity < b.popularity ? -1 : 1;
      });
    }
    );


    return sortedData;
  }
  function fetchData() {
    fetch(api)
      .then((resp) => resp.json())
      .then((songs) => {
        //data fetched, and can be shown
        main.style.display = "";
        load.style.display = "none";
        location.reload(true);
        //add api data to localstorage
        localStorage.setItem("musicData", JSON.stringify(songs));
      })
      .catch((error) => {
        console.error("Unable to Fetch Data ", error);
      });
  }
  let songsFromAPI = getMusicData();
  search(songsFromAPI);
  populateSelect(songsFromAPI);
});
