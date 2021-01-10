// logica de todos mis usuarios
import { Usuario } from './usuario';


export class UserList {

    private lista: Usuario[] = [];


    constructor() {
        
    }

// agregar un usuario
    public agregar(user: Usuario) {

        this.lista.push(user);
        console.log(this.lista);
        return user
    }

    public actualizarNombre(id: string, name: string ) {
        
        for(let usuario of this.lista) {
            
            if(usuario.id === id) {
                usuario.nombre = name;
                break;
            }
        }
        console.log('===== Actualizando Usuario =====');
        console.log(this.lista);
    }

    // obtener lista de usuarios
    public getLista() {
        return this.lista;
    }

    // regresar un usuario
    public getUsuario(id: string) {
        return this.lista.find( usuario => usuario.id === id);
    }

    // obtener usuario en una sala particular
    public getUsuariosSala(sala: string) {
        return this.lista.filter( usuario => usuario.sala === sala);
    }

    // borrar un usuario, cuando dejo la conexion socket
    public borrarUsuario(id: string) {
        const tempUsuario = this.getUsuario(id);

        this.lista = this.lista.filter( usuario =>  usuario.id !== id); // me devuelva todos los usuario cuyo id no sea el id que estoy borrando 

        // console.log(this.lista);
        
        return tempUsuario; // usuario borrado
    } 
}