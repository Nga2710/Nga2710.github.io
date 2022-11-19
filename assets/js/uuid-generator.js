let hex = "0123456789abcdef";
function generate() {
  let uuid = "";
  for (let i = 0; i < 32; i++) {
    if (i == 8 || i == 12 || i == 16 || i == 20)
      uuid += "-";
    uuid += hex[Math.floor(Math.random()*16)];
  };
  document.querySelector(".uuid").innerHTML = uuid;
};
