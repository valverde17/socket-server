
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
    export const desconectar = (cliente: Socket, io: socketIO.Server) => {

        // para escuchar una desconexion
        cliente.on('disconnect', () => {
            console.log('cliente desconectado');

            usuariosConectados.borrarUsuario(cliente.id);

            // emitir si hubo cambios en los usuarios activos, si se desconecto alguien
            io.emit('usuarios-activos', usuariosConectados.getLista()); // mensaje a todo el mundo
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

            io.emit('usuarios-activos', usuariosConectados.getLista()); // mensaje a todo el mundo

            callback({
                ok:true,
                mensaje: `Usuario ${payload.nombre} configurado`
            });
        });
    }

    export const ObtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {
        
        cliente.on('obtener-usuarios', () => {
            io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista()); // para enviarselo a un usuario y no a todos, en este caso solo al usuario que se viene conectando
        });
    }
    