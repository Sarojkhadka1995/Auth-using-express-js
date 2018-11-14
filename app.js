
// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var session = require('express-session');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
var body = require('body-parser');
// var multer = require('multer');
var flash = require('connect-flash');
// var mongo =  require('mongodb');
var mongoose = require('mongoose');
// var db = mongoose.connection;
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/nodeauth', {useNewUrlParser: true})
mongoose.set('useCreateIndex',true);
var Router = require('./routes/router.js');
// var usersRouter = require('./routes/users');

var app = express();
app.use(body.json());
app.use(body.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//link to stylesheets and javascripts
app.use(express.static(__dirname + '/public'));

//handle express sessions
app.use(session({
  secret:'secret',
  saveUninitialized: false,
  resave:false
}));

//passport
// app.use(passport.initialize());
// app.use(passport.session());

//validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value){
    var namespace = param.split('.'),
    root = namespace.shift(),
    formParam = root;
    
    while(namespace.length){
      formParam += '[' + namespace.shift()+ ']';
    }
    return{
      param : formParam,
      msg : msg,
      value : value
    };
  }
}));


// app.use(logger('dev'));
// app.use(express.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


app.use('/',Router);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // Do logging and user-friendly error message display
  console.error(err);
  res.status(500).send('internal server error');
})

// listen on port 3000
app.listen(3000, function () {
  console.log('Express app listening on port 3000');
});

module.exports = app;
