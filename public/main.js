$(document).ready(function () {
  var socket = io();
  var input = $('input');
  var messages = $('#messages');

  var addMessage = function (message) {
    messages.append('<div>' + message + '</div>');
  };
  
  /*
  First you use jQuery to select the <input> tag, and the messages div. You then create a function which appends a new <div> to the messages. Finally you add a keydown listener to the input, which calls the addMessage function with the contents of the input when the enter button is pressed, then clears the input.
  */
  
  // ---------------------------------------------------------
  
  /*
Here we call the socket.emit function. This sends a message to the Socket.IO server. The first argument is a name for our message - in this case we simply call it message. The second argument is some data to attach to our message. In this case it's the contents of the text box.
  */
  input.on('keydown', function (event) {
    if (event.keyCode != 13) {
      return;
    }

    var message = input.val();
    addMessage(message);
    socket.emit('message', message);
    input.val('');
  });

  /* add a listener for this event. 
  So when the server sends you a message with the name message, you add the attached data to the messages div using the addMessage function. */
  socket.on('message', addMessage);
});