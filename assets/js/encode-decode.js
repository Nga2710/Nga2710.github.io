var imgencode = document.getElementById("encode"),
imgdecode = document.getElementById("decode"),
str, resultStr, hex;
imgencode.onclick = () => {
  str = document.querySelector("textarea").value;
  resultStr = '';
  let replace = false;
  for (let i = 0; i < str.length; i++) {
    var char = str[i];
  
    if (char == "/" && replace == false && toggleb == true) {
      i++;
      if (str[i] == "*") {
        for (var n = i+1; n-1 < str.length; n++) {
          if (str[n] == "*" && str[n+1] == "/") break; else continue;
        }
        i = n+1;
        continue;
      }
      if (str[i] == "/") {
        for (var n = i+1; n < str.length; n++) {
          if (str[n] != "\n") continue; else break;
        }
        i = n-1;
        continue;
      }
    }
    if (char == '"' && str[i-1] != "\\") {
      replace = !replace;
      resultStr += '"'
      continue;
    }
    if (!replace) {
      if (!toggleb)
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
  if (text.value == resultStr) {
    toastShow("Lỗi", "Mã của bạn không ở dạng hoàn chỉnh!", "w")
  } else {
    toastShow("Đã mã hóa thành công!", "", "s");
    text.value = resultStr;
  }
};

/*
imgencode.onclick = () => {
  const str = document.querySelector("textarea").value;
  let resultStr = '';
  let replace = false;

  for (const char of str) {
    if (char === '"' && str[str.indexOf(char)-1] !== "\\") {
      replace = !replace;
    }
    if (!replace && (!toggleb || !char.match(/\s/))) {
      resultStr += char;
    } else if (replace) {
      resultStr += `\\u${('0000'+char.charCodeAt(0).toString(16)).substr(-4)}`;
    }
  }

  if (text.value === resultStr) {
    toastShow("Lỗi", "Mã của bạn không ở dạng hoàn chỉnh!", "w")
  } else {
    toastShow("Đã mã hóa thành công!", "", "s");
    text.value = resultStr;
  }
};*/




imgdecode.onclick = () => {
  str = document.querySelector("textarea").value;
  resultStr = '';
  hex = '';
  let replace = false;
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (char == '"' && str[i-1] != "\\") {
      replace = !replace;
      resultStr += char;
      continue;
    }
    if (!replace) {
      resultStr += char;
      continue;
    }
    if (char == "\\" && str[i+1] == "u" && i+6 <= str.length) {
      hex = str[i+2] + str[i+3] + str[i+4] + str[i+5];
      resultStr += String.fromCharCode(parseInt(hex, 16));
      i += 5;
    } else resultStr += char;
  }
  if (text.value == resultStr) {
    toastShow("Lỗi", "Chưa có kí tự nào được thay đổi, kiểm tra và đảm bảo mã của bạn ở dạng \\u[hex][hex][hex][hex]", "w")
  } else {
    text.value = resultStr;
    toastShow("Đã giải mã thành công!", "", "s");
  }
};

/*
imgdecode.onclick = () => {
  const str = document.querySelector("textarea").value;
  let resultStr = "";
  let replace = false;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char == '"' && str[i-1] != "\\") replace = !replace;
    resultStr += !replace && char != "\\" ? char : char == "\\" && str[i+1] == "u" && i+6 <= str.length ? String.fromCharCode(parseInt(str.substr(i+2, 4), 16)) : char;
    if (resultStr != str && char == "\\" && str[i+1] == "u" && i+6 <= str.length) i++;
  }
  if (resultStr == str) toastShow("Lỗi", "Chưa có kí tự nào được thay đổi, kiểm tra và đảm bảo mã của bạn ở dạng \\u[hex][hex][hex][hex]", "w");
  else {
    text.value = resultStr;
    toastShow("Đã giải mã thành công!", "", "s");
  }
};*/
