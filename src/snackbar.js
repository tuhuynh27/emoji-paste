export function showMessage(msg, timeout = 2000) {
  const div = document.createElement('div')
  div.classList.add('snackbar')
  div.innerText = msg
  document.body.appendChild(div);
  setTimeout(() => div.remove(), timeout)
}
