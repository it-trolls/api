import express from 'express'; 
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

//Routes
import indexRouter from './routes/index';

import propertyRouter from './routes/property';
import propertysRouter from './routes/propertys';

import userRouter from './routes/user';
import usersRouter from './routes/users';

const app = express(); //traemos todo el framework express

//conexion con mongodb
var mongoDB = 'mongodb://localhost:27017/inmo';
mongoose.connect(mongoDB, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(3010, () => { console.log('Escuchando el puerto 3010') });  //levantamos el sv, abrimos el puerto 3010 y escuchamos cualquier http

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/users', usersRouter);
app.use('/property', propertyRouter);
app.use('/propertys', propertysRouter);


// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   // next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.use((req, res, next) => {

  // Dominio que tengan acceso (ej. 'http://example.com')
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Metodos de solicitud que deseas permitir
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  // Encabecedados que permites (ej. 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Headers', '*');

  next();

})

module.exports = app;