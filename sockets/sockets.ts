
// aca va ir toda la logica de nuestros sockets y en el archivo serve.ts solo tendremos la referencia

import { Socket } from "socket.io";
import socketIO from 'socket.io';

// logica para desconectar a un cliente

export const desconectar = (cliente: Socket) => {

    // para escuchar una desconexion
    cliente.on('disconnect', () => {
        console.log('cliente desconectado');
    });
}

// escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (payload: {de: string, cuerpo: string} ) => {
        console.log('Mensaje recibido', payload);
        
        io.emit('mensaje-nuevo', payload );

    });
}