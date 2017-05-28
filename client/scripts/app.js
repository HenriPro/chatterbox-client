// YOUR CODE HERE:
var app = {};

app.init = function(){
  //console.log("here");
  // this.handleUsernameClick();
  // this.handleSubmit();
  this.lastTime;
  this.friendList = {};
  this.roomList = {};
  this.fetch();
  window.setInterval(this.fetch,2000);
  this.attachEventHandlers();
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
    data: {limit: 10, order: '-createdAt'},
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message recieved');
      // results is results.data
      var results = data.results;
      // if last time is not defined then set it to 0
      if (app.lastTime === undefined) {
        app.renderAll(results);
        app.lastTime = results[results.length -1].createdAt;
      } else {
        // iterate through results
        for (var i = 0; i < results.length; i++) {
          console.log(results[i].createdAt);
          if (results[i].createdAt > app.lastTime) {
            console.log('here');
            app.renderMessage(results[i]);
            app.lastTime = results[i].createdAt;
          }
          else break;
        }
      }
          // if the createdAt of the last result is greater than last time
            // last time will become createdAt of the last result
            // render the last result
            // break

      // console.log(data);
      // //if lastTime === undefined;
      // var results = data.results;
      // if (app.lastTime === undefined) {
      //   app.lastTime = results[results.length-1].createdAt
      //   app.renderAll(results)
      // } else {
      //
      //   //iterate through results
      //   for(var i = 0; i < results.length; i++) {
      //     console.log(i);
      //     if (app.lastTime >= results[i].createdAt) {
      //
      //       console.log('break');
      //       console.log('saved lastTime ', app.lastTime, ' stopping at ',  results[i].createdAt);
      //
      //       break;
      //     }
      //   }
      //
      //   var short = results.slice(i);
      //   console.log(short);
      //   app.lastTime = short[short.length -1].createdAt
      //   app.renderAll(short);
      // }
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
  //app.lastTime = message.createdAt;
  // check if this person is in our friendlist
    // if they are then add friend class to chat
  var user = $("<p class='username'></p>");
  var text = $("<p class='text'></p>");
  var roomname = $("<p class='roomname'></p>");
  var time = $("<p class ='time'></p>")

  if (app.friendList[message.username] === true) {
    var messageDiv = $("<div class='chat friend'></div>");
  } else {
    var messageDiv = $("<div class='chat'></div>");
  }

  messageDiv.append(user, text, roomname, time);
  $('#chats').append(messageDiv);
  //$('.user').textContent = message.username;
  $(user).text(message.username);
  $(text).text(message.text);
  $(roomname).text(message.roomname);
  $(time).text(message.createdAt)

  $(user).click(function() {
    event.preventDefault();
    app.friendList[$(user).text()] = true;
    $(`p:contains(${message.username})`).parent().addClass('friend');
  //  alert('work');


  });


  app.roomFilter(message.roomname);
  app.roomList[message.roomname] = true;

};

// app.injectFriend = function(username) {
//
// }

app.roomFilter = function(roomName) {
  if(!app.roomList[roomName]) {
    $('#rooms').append(`<option>${roomName}</option>`);
  }
};


app.renderAll = function(array) {
  //console.log(array.results);
  for (var i = array.length -1 ; i >= 0 ; i--) {
    // console.log(array[i]);
    this.renderMessage(array[i]);
  }
};

app.renderRoom = function(roomName) {

  $('#roomSelect').append(`<div class='lobbyName'>${roomName}</div>`);
};

app.handleUsernameClick = function() {

};

app.handleSubmit = function() {
  var value = $('#messageinput').val();
  var messageObj = {
    roomname: '',
    username: window.location.search.slice(10),
    text: value
  };
  console.log(typeof value);
  app.send(messageObj);

};

app.attachEventHandlers = function() {
  // document.getElementById('sendbutton').addEventListener('click', this.handleSubmit.bind(this));
  $(function() {
    $("#sendbutton").click(function() {
      event.preventDefault();
      app.handleSubmit();
    });
  });

}

app.init();
