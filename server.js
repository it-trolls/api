import express from 'express'; 
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import 'babel-polyfill';

//Routes
import indexRouter from './routes/index';
import propertysRouter from './routes/propertys';
import usersRouter from './routes/users';
import authRouter from './routes/auth';

const app = express(); //traemos todo el framework express

//conexion con mongodb
var mongoDB = 'mongodb://localhost:27017/inmo';
mongoose.connect(mongoDB, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(3010, () => { console.log('Escuchando el puerto 3010') });  //levantamos el sv, abrimos el puerto 3010 y escuchamos cualquier http

// app.use(express.json()) reemplaza lo de abajo, sacar bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/propertys', propertysRouter);
app.use('/auth', authRouter);

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