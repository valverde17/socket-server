import {Router, Request, Response} from 'express';
import Server from '../classes/server';

const router = Router();

router.get('/mensajes', (req: Request, resp: Response) => {
    resp.json({
        ok: true,
        mensaje: 'GET - Listo'
    });
});

router.post('/mensajes', (req:Request, resp:Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {cuerpo, de};

    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload );

    resp.json({
        ok:true, 
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', (req: Request, resp: Response) => {
    
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de, 
        cuerpo
    }

    // conectar este servicio rest con nuestro servidor de sockets
    const server = Server.instance; // una instancia de nuestro servidor,la misma de nuestra app de node
    
    // para mandar un msj a uno o a todos los usuarios seria asi
    server.io.in( id ).emit('mensaje-privado', payload);

    resp.json({
        ok:true, 
        cuerpo,
        de,
        id
    });
});

export default router;