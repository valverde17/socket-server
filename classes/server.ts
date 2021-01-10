
import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';

import * as mySockets from '../sockets/sockets';


export default class Server {

    private static _instance: Server; // este _instance es del mismo tipo de la clase Server, solo q es una propiedad estatica que la puedo llamar directamente desde Server.
    
    // propiedades
    public app: express.Application;
    public port: number;
    
    public io: socketIO.Server; // es la configuracion de la conexion de los sockets - servidor de sockets
    private httpServer: http.Server; // en teoria este es el servidor que vamos a levantar para los sockets y no el app de express

    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        this.io = socketIO(this.httpServer);
        
        this.escuharSokcets();
    }

    public static get instance() { // algo estatico es algo que yo puedo llamar directamente haciendo referencia de la clase
        return this._instance || (this._instance = new this()); // lo que digo es que si ya existe una instancia regresa esa instancia cuando se quiera obtener y si no existe se creara una nueva instancia 
    }

    // es privado xq solo se va a llamar desde la inicializacion de la clase
    private  escuharSokcets() {
        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {
            console.log('Cliente conectado');

            console.log(cliente.id);

            // conectar cliente
            mySockets.conectarCliente(cliente);

             // Configurar Usuario
        mySockets.configurarUsuario(cliente, this.io );

        // mensajes
        mySockets.mensaje(cliente, this.io);

        // Desconectar
        mySockets.desconectar(cliente);
    });
       
    }

    // metodo para inicializar mi app
    start( callback: any ) {
        this.httpServer.listen(this.port, callback );
    }

}