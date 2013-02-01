var express = require('express'),
	app     = express(),
	server  = require('http').createServer(app),
	io      = require('socket.io').listen(server);
var listaMensajes=[];
server.listen(8080);



io.sockets.on('connection', function (socket) {
	socket.emit('inicio', { sala: JSON.stringify(listaMensajes)});
	socket.on('nuevoMensaje', function (data) {
		socket.broadcast.emit('nuevoMensaje', data);
		listaMensajes.push(data);
	});

});

console.log("Express server running at\n  => http://localhost:8080/\nCTRL + C to shutdown");