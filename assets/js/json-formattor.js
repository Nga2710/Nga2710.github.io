function formatjson(level) {
  try {
    if (toggle) level = '\t';
  text.value = JSON.stringify(JSON.parse(document.getElementById("text").value), null, level)
  } catch (err) {
    text.value = err;
  }
}
const toggle = document.querySelector(".toggle");
var toggle1;
toggle.addEventListener("click", toggle_on);
function toggle_on() {
  toggle.addEventListener("click", toggle_off);
  toggle.removeEventListener("click", toggle_on);
  toggle.classList.add("toggle_on");
  toggle.classList.remove("toggle_off");
  toggle1 = true
}
function toggle_off() {
  toggle.addEventListener("click", toggle_on);
  toggle.removeEventListener("click", toggle_off);
  toggle.classList.add("toggle_off");
  toggle.classList.remove("toggle_on");
  toggle1 = false
}