function copy() {
  let copy = document.getElementById("ctrlcopy").innerHTML;
  navigator.clipboard.writeText(copy);
};
function ctrlcopy() {
  var copyText = document.getElementById("ctrlcopy");
  copyText.select();
  document.execCommand("copy");
};
function ctrldelete() {
  var deleteText = document.getElementById("ctrldelete");
  deleteText.select();q
  document.execCommand("delete");
};
