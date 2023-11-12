function getMusicData() {

//check if localstorage has no data and add the data
  if (localStorage.length === 0 || !localStorage.getItem("musicData")) {
    fetchData();
  }
  //data already exists
  storedData = JSON.parse(localStorage.getItem("musicData"));
  return storedData;
}

async function fetchData() {
  const api =
    "http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php";

  try {
    const response = await fetch(api);

    if (!response.ok) {
      throw new Error("Website cannot be reached");
    }

    const data = await response.json();

    //add api data to localstorage
    localStorage.setItem("musicData", JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

