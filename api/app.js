require('./config/conexion');

const express = require('express');

const port = (process.env.PORT || 3000);

const app = express();

app.use(express.json());

app.set('port', port);



app.use('/api', require('./rutas'))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.listen(3000, () => {
    console.log("Server started in port 3000!");
  });



/*
TallerPassword#123
*/
