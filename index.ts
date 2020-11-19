import Server from './classes/server';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';


const server = new Server();


// BodyParser para parsear los valores provienentes de un form y poderlos manipular como objetos o javascript

server.app.use(bodyParser.urlencoded({extended: true}));

// otra configuracion es que pase a un formato json
server.app.use(bodyParser.json());

// CORS
server.app.use(cors({origin: true, credentials: true})); // aqui estoy perimitiendo que cualquier persona pueda llamar a mis servicios

// rutas de servicios
server.app.use('/', router);

server.start( ()=> {
    console.log(`Servidor corriendo en el puerto ${server.port} `);
});