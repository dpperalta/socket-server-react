// Servidor de express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;

        // Http server
        this.server = http.createServer(this.app);

        // Configuraciones de sockets
        this.io = socketio(this.server, { /* CONFIGURACIONES */ });
    }

    middleware() {
        // Despliegue del directorio público
        this.app.use(express.static(path.resolve(__dirname, '../public')));

        // Habilitar CORS
        this.app.use(cors());
    }

    // Configurar sockets
    configurarSockets() {
        new Sockets(this.io);
    }

    execute() {
        // Inicializar middlewares
        this.middleware();

        // Inicializar sockets
        this.configurarSockets();

        // Inicializar servidor
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto:', this.port);
        });
    }
}

module.exports = Server;