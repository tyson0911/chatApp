let myUserId = null;
let chatUser = JSON.parse(localStorage.getItem('chatUser') || '{}');

const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

socket.on('user id', function(userId) {
  myUserId = userId;
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value && chatUser.name) {
    socket.emit('chat message', { text: input.value, name: chatUser.name });
    input.value = '';
  }
});

socket.on('chat message', function(data) {
  const item = document.createElement('li');
  const nameSpan = document.createElement('span');
  nameSpan.textContent = data.name || 'Anonymous';
  nameSpan.style.fontSize = '0.92em';
  nameSpan.style.fontWeight = 'bold';
  nameSpan.style.display = 'block';
  nameSpan.style.marginBottom = '2px';
  item.appendChild(nameSpan);
  const msgSpan = document.createElement('span');
  msgSpan.textContent = data.text || data.msg;
  item.appendChild(msgSpan);
  if (data.userId === myUserId) {
    item.classList.add('my-message');
  } else {
    item.classList.add('other-message');
  }
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
}); 