function sidebarOpen() {
  document.querySelector(".sidebarIconClose").classList.add("hide");
  document.querySelector(".sidebarIconOpen").classList.remove("hide");
  document.querySelector(".sidebar").classList.remove("sidebarClose");
}
function sidebarClose() {
  document.querySelector(".sidebarIconClose").classList.remove("hide");
  document.querySelector(".sidebarIconOpen").classList.add("hide");
  document.querySelector(".sidebar").classList.add("sidebarClose");
}