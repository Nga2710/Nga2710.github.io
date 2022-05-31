const search = document.querySelector(".search");
const searchInput = search.querySelector(".searchInput");
const searchBox = search.querySelector(".searchBox");

searchInput.onkeyup = (e)=> {
  let userData = e.target.value;
  let emptyArray = [];
  if (userData) {
    emptyArray = filter.filter((data)=> {
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    emptyArray = emptyArray.map((data)=> {
      return data = '<li>' + data + '</li>';
    });
    searchBox.classList.remove("searchBoxHide");
    showSuggestions(emptyArray);
    let allList = searchBox.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      allList[i].setAttribute("onclick", "select(this)");
    }
  } else {
    searchBox.classList.add("searchBoxHide");
  }
}

function select(element) {
  let selectUserData = element.textContent;
  searchInput.value = selectUserData;
  searchBox.classList.add("searchBoxHide");
  searchFilter(searchInput.value);
}

function showSuggestions(list) {
  let listData;
  if (!list.length) {
    // userValue = searchInput.value;
    // listData = '<li>' + userValue + '</li>';
    listData = '<li>Không tìm thấy dữ liệu</li>';
  } else {
    listData = list.join('');
  }
  searchBox.innerHTML = listData;
}

function searchFilter(searchValue) {
  if (searchValue === "Trang chủ") {
    window.open("https://nga2710.github.io/index.html", "_self");
  }
  if (searchValue === "Server Aternos") {
    window.open("https://nga2710.github.io/minecraft/aternos-server.html", "_self");
  }
  if (searchValue === "Brewing Guide") {
    window.open("https://nga2710.github.io/minecraft/brewing-guide.html", "_self");
  }
  if (searchValue === "Trading Guide") {
    window.open("https://nga2710.github.io/minecraft/trading-guide.html", "_self");
  }
  if (searchValue === "Encode & Decode") {
    window.open("https://nga2710.github.io/minecraft/encode-decode.html", "_self");
  }
  if (searchValue === "Uuid Generator") {
    window.open("https://nga2710.github.io/minecraft/uuid-generator.html", "_self");
  }
  if (minecraft.includes(searchValue)) {
    window.open("https://minecraft.fandom.com/" + searchValue + ".html", "_self");
  }
}

var enter = document.querySelector(".searchInput");
enter.addEventListener("keydown", (e)=> {
  if (e.keyCode === 13) {
    searchEnter(e)
  }
});

function searchEnter() {
  var searchEnter = document.querySelector(".searchInput").value.toLocaleLowerCase();
  searchFilter(searchEnter);
}