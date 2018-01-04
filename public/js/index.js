var socket = io();

socket.on("connect", function() {
    console.log("Connected to server");
});

socket.on("disconnect", function() {
    console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {  
    var formatedTime = moment(message.createdAt).format("HH:mm");
    var li = jQuery("<li></li>");
    li.text(`${message.from} ${formatedTime}: ${message.text}`);
    
    jQuery("#messages").append(li);
});

socket.on("newLocationMessage", function(message) {
    var formatedTime = moment(message.createdAt).format("HH:mm");
    var li = jQuery(`<li></li>`);
    var a = jQuery(`<a target="_blank">Some user's current location</a>`);

    li.text(`${message.from} ${formatedTime}: `);
    a.attr("href", message.url);

    li.append(a);
    jQuery("#messages").append(li);
});

jQuery("#message-form").on("submit", function(e) {
    e.preventDefault();

    var messageTextBox = jQuery("[name=message]");
    if(messageTextBox.val().trim() === "") {
        messageTextBox.val("");
        return;
    }
    socket.emit("createMessage", {
        from: "User",
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val("");
    });
});

var locationButton = jQuery("#send-geo");
locationButton.on("click", function() {
    if(!navigator.geolocation) {
        return alert("Geolocation not supported by your browser!");
    }

    locationButton.attr("disabled", "disabled").text("Sending location...");

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function() {
            locationButton.removeAttr("disabled").text("Send location");
        });
    }, function() {
        alert("Unable to fetch location.");
        locationButton.removeAttr("disabled").text("Send location");
    });
});