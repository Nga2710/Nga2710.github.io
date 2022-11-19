var toastCreate = document.createElement('div');
var toast = `
<span><img id="toastImg" style="height: 20px; width: 20px">\t<strong id="toastTitle"><</strong><span>
<br>
<div id="toastText"></div>
<div id="toastClose">x</div>
`;
toastCreate.innerHTML = toast;
toastCreate.classList.add('toast');
document.querySelector('body').appendChild(toastCreate);
var toastStyle = document.querySelector('.toast');
document.querySelector('#toastClose').addEventListener('click', toastClose);
document.querySelector('#toastClose').onclick = () => soundClick.play();
let toastTime, toastTime2, toastWait;
function toastShow(title, text, type) {
  soundClick.play();
  clearTimeout(toastTime);
  if (toastWait) {
    toastClose();
    toastTime2 = setTimeout(showToast, 400);
  } else showToast();
  function showToast() {
    soundToast.play();
    if (type == "s") {
      toastCreate.classList.add('toastSuccess');
      toastCreate.classList.remove('toastError');
      toastCreate.classList.remove('toastWarning');
      document.querySelector('#toastImg').classList.add('icon_confirm');
      document.querySelector('#toastImg').classList.remove('icon_error');
      document.querySelector('#toastImg').classList.remove('icon_warning');
    document.querySelector('#toastTitle').innerHTML = `<span style="color: #00ff00">${title}</span>`;
    document.querySelector('#toastText').innerHTML = text;
    }
    if (type == "e") {
      toastCreate.classList.add('toastError');
      toastCreate.classList.remove('toastSuccess');
      toastCreate.classList.remove('toastWarning');
      document.querySelector('#toastImg').classList.add('icon_error');
      document.querySelector('#toastImg').classList.remove('icon_confirm');
      document.querySelector('#toastImg').classList.remove('icon_warning');
    document.querySelector('#toastTitle').innerHTML = `<span style="color: #ff0000">${title}</span>`;
    document.querySelector('#toastText').innerHTML = text;
    }
    if (type == "w") {
      toastCreate.classList.add('toastWarning');
      toastCreate.classList.remove('toastSuccess');
      toastCreate.classList.remove('toastError');
      document.querySelector('#toastImg').classList.add('icon_warning');
      document.querySelector('#toastImg').classList.remove('icon_confirm');
      document.querySelector('#toastImg').classList.remove('icon_error');
    document.querySelector('#toastTitle').innerHTML = `<yellow class="yellow">${title}</yellow>`;
    document.querySelector('#toastText').innerHTML = `<black>${text}</black>`;
    }
    toastStyle.style.transform = 'translateX(0)';
  }
  toastWait = true;
  toastTime = setTimeout(toastClose, 6000);
}
function toastClose() {
  toastWait = false;
  toastStyle.style.transform = 'translateX(300px)';
}