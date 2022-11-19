function formatjson(level) {
  try {
    if (toggleb) {
      level = '\t';
      toastShow(`Đã định dạng thành công!`, "Tùy chọn: kí tự thanh", "s");
    } else toastShow(`Đã định dạng thành công!`, "", "s");
    text.value = JSON.stringify(JSON.parse(document.getElementById("text").value), null, level);
  } catch (err) {

    toastShow("Lỗi", `${err}`, "e");
  }
}