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

const setHash = () => {
  window.location.hash = "";
  window.location.hash = generateRandomString();
};

const removeHash = () => {
  let { location, history } = window;
  location.hash = "";
  if ("replaceState" in history) {
    history.replaceState("", document.title, `${location.pathname}${location.search}`);
  }
};

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
        document.querySelector("#shortenedUrl").innerHTML = window.location.href;
        document.querySelector("#shortenedUrl").href = window.location.href;
        document.querySelector("#shortenedUrlContainer").style.display = "flex";
      })
      .then(() => {
        removeHash();
      })
      .catch((err) => console.log(err));
  } else {
    alert("Please enter an URL to shorten!");
  }
}

const documentOnload = () => {
  if (window.location.hash) {
    getData(endpoint + "/" + hash)
      .then((data) => {
        if (data && data[data?.length - 1]?.url) {
          window.location.href = data[0].url;
        }
      })
      .catch((err) => console.log(err));
  } else {
    document.body.classList.remove("none");
    document.body.classList.add("flex");
    document.body.style.background = `url("./img/bg.jpg") repeat fixed top center`;
    document.body.style.backgroundColor = primaryColor;
    document.title = "SHURL - Simple URL Shortener";
    setFavicon("/images/logo.png");
  }
};

function setFavicon(faviconPath) {
  var link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.querySelector("head").appendChild(link);
  }
  link.href = faviconPath;
}

document.onreadystatechange = onReadyStateChange;
document.addEventListener("DOMContentLoaded", onDomLoad);
window.addEventListener("load", onPageLoad);

let count = 0;
function onReadyStateChange(event) {
  count++;
  console.log("document state:", document.readyState);
  if (count === 1) {
    documentOnload();
  }
}

function onDomLoad(event) {
  console.log("DomLoad");
}

function onPageLoad(event) {
  console.log("PageLoad");
}
