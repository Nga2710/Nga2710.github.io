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
function formatjson11(level) {
  try {
    text.value = `${JSON.stringify(JSON.parse(document.getElementById("text").value), null, level)}`
  } catch (err) {
    let width = "450px" let height = "100px" document.getElementById("text").innerHTML = `<div style="right:10px; bottom:10px;height: ${height};width: ${width};background: #a30000;position: absolute;padding-top: 20px;border-radius: 10px;vertical-align:top;box-shadow: inset 0 0 20px #330006;"> <div style="position: absolute; top: 0; right: 0">x&nbsp;</div> <div style="position: relative; left: 10px">${err}</div> </div>`
  }
}