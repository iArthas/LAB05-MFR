//Importar las dependencies
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

//Ruta para el archivo HTML
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

//Escuchar la conexión de Socket.IO
io.on('connection', function (socket) {
    console.log('Usuario conectado');

    //Escuchar el evento 'chat message'
    socket.on('chat message', function (data) {
        console.log('Mensaje del chat ' + data.chatId + ': ' + data.mensaje);
        io.emit('chat message', data);
    });

    //Escuchar la desconexión del usuario
    socket.on('disconnect', function () {
        console.log('Usuario desconectado');
    });
});

//Iniciar el servidor HTTP en el puerto 3000
http.listen(3000, function(){
    console.log('Servidor funcionando en http://localhost:3000');
});
