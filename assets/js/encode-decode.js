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
var imgencode = document.getElementById("encode"),
imgdecode = document.getElementById("decode"),
str, resultStr, hex;
imgencode.onclick = () => {
  str = document.querySelector("textarea").value;
  resultStr = '';
  let replace = false;
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (char == '"' && str[i-1] != "\\") {
      replace = !replace;
      resultStr += '"'
      continue;
    }
    if (!replace) {
      if (!toggle1)
        resultStr += char; else
        if (char != " " && char != "\t" && char != "\n")
        resultStr += char;
      continue;
    }
    hex = (str.charCodeAt(i)).toString(16);
    if (hex.length == 1) {
      hex = '000' + hex;
    }
    if (hex.length == 2) {
      hex = '00' + hex;
    }
    if (hex.length == 3) {
      hex = '0' + hex;
    }
    resultStr += '\\u' + hex;
  }
  if (replace) {
    alert('Bạn chưa đóng ngoặc kép, có thể việc mã hóa sẽ không hoạt động theo ý muốn.');
  };
  text.value = resultStr;
};
imgdecode.onclick = () => {
  str = document.querySelector("textarea").value;
  resultStr = '';
  hex = '';
  let replace = false;
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (char == '"' && str[i-1] !="\\") {
      replace = !replace;
      resultStr += char;
      continue;
    }
    if (!replace) {
      resultStr += char;
      continue;
    }
    if (char == "\\" && str[i+1] == "u" && i+6 <= str.length) {
      hex = '';
      hex += str[i+2] + str[i+3] + str[i+4] + str[i+5];
      resultStr += String.fromCharCode(parseInt(hex/*.substr(n, 4)*/, 16));
      i += 5;
    } else resultStr += char;
  }
  if (replace) {
    alert('Bạn chưa đóng ngoặc kép, có thể việc giải mã sẽ không hoạt động theo ý muốn.');
  };
  if (text.value == resultStr) {
    alert("Chưa có kí tự nào được thay đổi, kiểm tra và đảm bảo mã của bạn ở dạng \\uXXXX")
  } else
    text.value = resultStr;
};
function ctrlcopy() {
  var text = document.getElementById("text");
  text.select();
  document.execCommand("copy");
};
function ctrldelete() {
  var text = document.getElementById("text");
  text.select();
  document.execCommand("delete");
};