var toastCreate = document.createElement('div');
var toast = `
<span><img class="icon_warning" style="height: 20px; width: 20px"><strong id="toastTitle" style="color: #ffff00"></strong><span>
<br>
<div id="toastText"></div>
<div id="toastClose">x</div>
`;

toastCreate.innerHTML = toast;
toastCreate.classList.add('toast');
document.querySelector('body').appendChild(toastCreate);
var toastStyle = document.querySelector('.toast');
document.querySelector('#toastClose').addEventListener('click', toastClose);
let toastTime, toastWait;
function toastShow(title, text) {
  clearTimeout(toastTime);
  document.querySelector('#toastTitle').innerHTML = title;
  document.querySelector('#toastText').innerHTML = text;
  toastStyle.style.transform = 'translateX(0)';
  toastTime = setTimeout(toastClose, 6000);
}
function toastClose() {
  toastStyle.style.transform = 'translateX(300px)';
}