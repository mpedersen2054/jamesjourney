var express        = require('express');
var mongoose       = require('mongoose');
var hbs            = require('hbs');
// var config         = require('./config.js');
var passport       = require('passport');
var logger         = require('morgan');
var methodOverride = require('method-override');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var session        = require('express-session');
var favicon        = require('serve-favicon');
var flash          = require('connect-flash');
var enforce        = require('express-sslify');

require('./config/db')(mongoose);

var app = express();
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'secret123',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

var env = app.get('env');
if (env !== 'development') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }))
}

// PASSPORT CONFIG
require('./config/passport')(app, passport)

// ROUTES
var staticRouter      = require('./routes/staticRouter.js');
var adminRouter       = require('./routes/adminRouter.js');
var blogRouter        = require('./routes/blogRouter.js');
var galleryRouter     = require('./routes/galleryRouter.js');
var eventRouter       = require('./routes/eventRouter.js');
var galleryRouter     = require('./routes/galleryRouter.js');
var userRouter        = require('./routes/userRouter.js');
var subscribersRouter = require('./routes/subscribersRouter');
var donateRouter      = require('./routes/donateRouter');
var emailRouter       = require('./routes/emailRouter');
var utilsRouter       = require('./routes/utilsRouter');
// middleware to attach all queries onto req.adminData
var adminMiddleware   = require('./middleware/adminData')(adminRouter);

app.use('/',            staticRouter);
app.use('/blog',        blogRouter);
app.use('/gallery',     galleryRouter);
app.use('/events',      eventRouter);
app.use('/gallery',     galleryRouter);
app.use('/users',       userRouter);
app.use('/subscribers', subscribersRouter);
app.use('/donate',      donateRouter);
app.use('/emails',      emailRouter);
app.use('/utils',       utilsRouter);


// middleware then adminRouter
app.use(adminMiddleware);
app.use('/admin', adminRouter);

app.use(function(req, res, next){
  res.status(404).render('404', {
    message: `Can\t find find the page ${req.url}`
  });
});

var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
