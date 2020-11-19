// acá estaran todas las variables locales de mi app

export const SERVER_PORT: number = Number(process.env.port) || 5000; // heroku nos da el process.enviroment, entonces si quisieras desplegar nuestra app en heroku le estamos diciendo que utilice el valor que viene en ese archivo o el puerto 5000