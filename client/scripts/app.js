// YOUR CODE HERE:
var app = {};
app.init = function(){

};

app.server = "http://parse.sfm6.hackreactor.com/chatterbox/classes/messages";

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message recieved');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.clearMessages = function() {
  $('#chats').empty();

};

app.renderMessage = function(message) {
  var user = $("<h1 class='user'></h1>")
  var text = $("<p class='text'></p>")
  var roomname = $("<p class='user'></p>")
  var messageDiv = $("<div class='message'></div>")
  messageDiv.append(user, text, roomname);
  $('#chats').append(messageDiv);
  //$('.user').textContent = message.username;
  $(user).text(message.username);
  $(text).text(message.text);
  $(roomname).text(message.roomname);
  //element.textContent = "<%=untrustedData%>";

};

app.renderRoom = function(roomName) {

  $('#roomSelect').append(`<div class='lobbyName'>${roomName}</div>`)
};
