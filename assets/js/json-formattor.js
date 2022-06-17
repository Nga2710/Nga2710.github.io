const toggle = document.querySelector(".toggle");
var toggle1;
toggle.addEventListener("click", toggle_on);
function toggle_on() {
  toggle.addEventListener("click", toggle_off);
  toggle.removeEventListener("click", toggle_on);
  toggle.classList.add("toggle_on");
  toggle.classList.remove("toggle_off");
  toggle1 = true;
}
function toggle_off() {
  toggle.addEventListener("click", toggle_on);
  toggle.removeEventListener("click", toggle_off);
  toggle.classList.add("toggle_off");
  toggle.classList.remove("toggle_on");
  toggle1 = false;
}
function format() {
  var newStr = "",
  space = 0,
  str = document.getElementById("text").value.replace(/ /g, "").replace(/\t/g, "").replace(/\n/g, "").replace(/":/g, '": ');
  for (let i = 0; i < str.length; i++) {
    var char = str[i];
    if (char == ',' && str[i-1] == '"') {
      newStr += ",\n";
      for (let n = space; n > 0; n = n-1) {
        if (!toggle1) newStr += "  "; else newStr += "	";
      }
      continue;
    }
    if (char == '"' && (str[i+1] == '}' || str[i+1] == ']')) {
      space -= 1;
      newStr += '"\n';
      for (let n = space; n > 0; n = n-1) {
        if (!toggle1) newStr += "  "; else newStr += "	";
      }
      continue;
    }
    if (char == "{") {
      if (str[i+1] == "}") {
        newStr += "{}";
        if (str[i+2] == ",") {
          newStr += ",\n";
          i += 2;
        } else {
          space -= 1;
          newStr += "\n";
          i++;
        }
        for (let n = space; n > 0; n = n-1) {
          if (!toggle1) newStr += "  "; else newStr += "	";
        }
        continue;
      }
      space++;
      newStr += "{\n";
      for (let n = space; n > 0; n = n-1) {
        if (!toggle1) newStr += "  "; else newStr += "	";
      }
      continue;
    }
    if (char == "[") {
      if (str[i+1] == "]") {
        newStr += "[]";
        if (str[i+2] == ",") {
          newStr += ",\n";
          i += 2;
        } else {
          space -= 1;
          newStr += "\n";
          i++;
        }
        for (let n = space; n > 0; n = n-1) {
          if (!toggle1) newStr += "  "; else newStr += "	";
        }
        continue;
      }
      space++;
      newStr += "[\n";
      for (let n = space; n > 0; n = n-1) {
        if (!toggle1) newStr += "  "; else newStr += "	";
      }
      continue;
    }
    if (char == '}') {
      if (str[i+1] == ',') {
        newStr += "},\n"; i++
      } else {
        newStr += "}\n"; space -= 1;
      }
      for (let n = space; n > 0; n = n-1) {
        if (!toggle1) newStr += "  "; else newStr += "	";
      }
      continue;
    }
    if (char == ']') {
      if (str[i+1] == ',') {
        newStr += "],\n"; i++
      } else {
        newStr += "]\n"; space -= 1;
      }
      for (let n = space; n > 0; n = n-1) {
        if (!toggle1) newStr += "  "; else newStr += "	";
      }
      continue;
    }
    newStr += char;
  }
  text.value = newStr;
}