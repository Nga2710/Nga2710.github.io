const toggle = document.querySelector(".toggle");
var toggleb;
toggle.addEventListener("click", toggle_on);
function toggle_on() {
  soundClick.play();
  toggle.addEventListener("click", toggle_off);
  toggle.removeEventListener("click", toggle_on);
  toggle.classList.add("toggle_on");
  toggle.classList.remove("toggle_off");
  toggleb = true
}
function toggle_off() {
  soundClick.play();
  toggle.addEventListener("click", toggle_on);
  toggle.removeEventListener("click", toggle_off);
  toggle.classList.add("toggle_off");
  toggle.classList.remove("toggle_on");
  toggleb = false
}
