function copy() {
  let copy = document.getElementById("ctrlcopy").innerHTML;
  navigator.clipboard.writeText(copy);
};
/*function ctrlcopy() {
  var copyText = document.getElementById("ctrlcopy");
  copyText.select();
  document.execCommand("copy");
};
function ctrldelete() {
  var deleteText = document.getElementById("ctrldelete");
  deleteText.select();
  document.execCommand("delete");
};*/
function ctrlcopy1() {
  var copyText = document.getElementById("text").value;
  navigator.clipboard.writeText(copyText);
};
function ctrldelete1() {
 text.value = "";
};