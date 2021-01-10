
// aca va ir toda la logica de nuestros sockets y en el archivo server.ts solo tendremos la referencia

import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UserList } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';


export const usuariosConectados = new UserList; // instancia de mis usuarios conectados

export const conectarCliente = (cliente: Socket) => {

    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

// logica para desconectar a un cliente
export const desconectar = (cliente: Socket) => {

    // para escuchar una desconexion
    cliente.on('disconnect', () => {
        console.log('cliente desconectado');

        usuariosConectados.borrarUsuario(cliente.id);
    });
}

// escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (payload: {de: string, cuerpo: string} ) => {
        console.log('Mensaje recibido', payload);
        
        io.emit('mensaje-nuevo', payload );
    });
}

// configurar usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
    
    cliente.on('configurar-usuario', (payload: {nombre: string}, callback: Function ) => {

        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

        callback({
            ok:true,
            mensaje: `Usuario ${payload.nombre} configurado`
        });
        
    });
}