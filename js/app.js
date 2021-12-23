var endpoint = "https://krat.es/889a1a171999ef0aaa37";
var apikey = "6e23c01a-9c1c-4bcf-b9bc-f3f738d09daf";
var hash = window.location.hash.substr(1);
var primaryColor = "#038970";
function getUrl() {
  var url = document.getElementById("urlInput").value;
  if (url) {
    var protocol = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");
    if (Boolean(protocol) === false) {
      let newUrl = "http://" + url;
      return newUrl;
    } else {
      return url;
    }
  }
  return null;
}

const generateRandomString = (stringLength = 5) => {
  let charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = Array.apply(null, Array(stringLength))
    .map(() => {
      return charSet.charAt(Math.floor(Math.random() * charSet.length));
    })
    .join("");
  return randomString;
};

function setHash() {
  if (Boolean(window.location.hash) === false) {
    window.location.hash = generateRandomString();
  }
}

const postData = async (url = "", data = {}, contentType = "application/json") => {
  if (url && data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": `${contentType}; charset=UTF-8`,
        "x-api-key": "dffa506c-fad7-4a9a-a41d-1ca1a8d83251",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
  return null;
};

const getData = async (url = "") => {
  if (url) {
    const response = await fetch(url);
    return response.json();
  }
  return null;
};

function shortenUrl() {
  var longUrl = getUrl();
  if (longUrl) {
    setHash();
    postData(`${endpoint}/${window.location.hash.substr(1)}`, { url: longUrl })
      .then((data) => {
        console.log("postData", data);
        document.querySelector("#shortenedUrl").innerHTML = window.location.href;
        document.querySelector("#shortenedUrl").href = window.location.href;
        document.querySelector("#shortenedUrlContainer").style.display = "flex";
      })
      .then(() => {
        window.location.hash = "";
        window.history.replaceState({}, document.title, "/shurl/");
      })
      .catch((err) => console.log(`${err.name}:${err.message}`));
  } else {
    alert("Please enter an URL to shorten!");
  }
}

const documentOnload = () => {
  if (window.location.hash) {
    getData(endpoint + "/" + hash)
      .then((data) => {
        console.log("getData", data);
        if (data && data[data?.length - 1]?.url) {
          window.location.href = data[0].url;
        }
      })
      .catch((err) => console.log(`${err.name}:${err.message}`));
  } else {
    document.body.classList.remove("none");
    document.body.classList.add("flex");
    document.body.style.background = `url("./img/bg.jpg") repeat fixed top center`;
    document.body.style.backgroundColor = primaryColor;
    document.title = "SHURL - Simple URL Shortener";
  }
};
