// YOUR CODE HERE:
var app = {};

app.init = function(){
  //console.log("here");
  // this.handleUsernameClick();
  // this.handleSubmit();
  this.fetch();
  // this.attachEventHandlers();
};

app.server = "http://parse.sfm6.hackreactor.com/chatterbox/classes/messages";

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    //xhrFields: {cors: false},
    url: app.server,
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
    url: app.server,
    type: 'GET',
    // data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message recieved');
      console.log(data);
      app.renderAll(data.results);

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
  var user = $("<p class='username'></p>");
  var text = $("<p class='text'></p>");
  var roomname = $("<p class='user'></p>");
  var messageDiv = $("<div class='chat'></div>");
  messageDiv.append(user, text, roomname);
  $('#chats').append(messageDiv);
  //$('.user').textContent = message.username;
  $(user).text(message.username);
  $(text).text(message.text);
  $(roomname).text(message.roomname);
  //element.textContent = "<%=untrustedData%>";

};

app.renderAll = function(array) {
  //console.log(array.results);
  for (var i = 0; i < array.length; i++) {
    // console.log(array[i]);
    this.renderMessage(array[i]);
  }
};

app.renderRoom = function(roomName) {

  $('#roomSelect').append(`<div class='lobbyName'>${roomName}</div>`);
};

app.handleUsernameClick = function() {

};

// app.handleSubmit = function() {
//   var value = $('#messageinput').val();
//   console.log(typeof value);
//   app.send(value);
//
// };
//
// app.attachEventHandlers = function() {
//   // document.getElementById('sendbutton').addEventListener('click', this.handleSubmit.bind(this));
//   $(function() {
//     $("#sendbutton").click(function( ) {
//       app.handleSubmit();
//     });
//   });

// }

app.init();
