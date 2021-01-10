

export class Usuario {

    public id: string; // este va ser id del socket que se esta conectando
    public nombre: string; // cuando un usuario se conecta no tiene nombre hasta despus que se lo asigna
    public sala: string; // para mandar mensajes a los que esten en una sala respectiva

    constructor(id: string) {
        this.id = id;
        this.nombre = 'sin_nombre';
        this.sala = 'sin_sala';
    }
}