import express from 'express';
import cors from 'cors'; 
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import 'babel-polyfill';
import dotenv from 'dotenv';

dotenv.config();

//Routes
import indexRouter from './routes/index';
import usersRouter from './routes/users';
// import realStateRouter from './routes/realstates';
import propertysRouter from './routes/properties';
import authRouter from './routes/auth';

const app = express(); //traemos todo el framework express
app.use(express.json()); 

app.use(cors()); //Enable All CORS Requests


//conexion con mongodb
var mongoDB = process.env.DB_HOST;
mongoose.connect(mongoDB, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(3010, () => { console.log('Escuchando el puerto 3010') });  //levantamos el sv, abrimos el puerto 3010 y escuchamos cualquier http

// app.use(express.json()) reemplaza lo de abajo, sacar bodyParser
//app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/properties', propertysRouter);
// app.use('/realstates', realStateRouter);
app.use('/api/v1/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;