const search = document.querySelector(".search");
const searchInput = search.querySelector(".searchInput");
const searchBox = search.querySelector(".searchBox");

searchInput.onkeyup = (e)=> {
  let userData = e.target.value;
  let emptyArray = [];
  if (userData) {
    emptyArray = filter.filter((data)=> {
      return data.toLocaleLowerCase().includes(userData.toLocaleLowerCase());
    });
    emptyArray = emptyArray.map((data)=> {
      return data = '<li>' + data + '</li>';
    });
    searchBox.classList.remove("hide");
    showSuggestions(emptyArray);
    let allList = searchBox.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      allList[i].setAttribute("onclick", "select(this)");
    }
  } else {
    searchBox.classList.add("hide");
  }
}

function select(element) {
  let selectUserData = element.textContent;
  searchInput.value = selectUserData;
  searchBox.classList.add("hide");
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