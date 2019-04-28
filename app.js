var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
	passport      = require("passport"),
	cookieParser  = require("cookie-parser"),
	LocalStrategy = require("passport-local"),
	flash         = require("connect-flash"),
	methodOverride = require("method-override"),
	Makeup        = require("./models/makeup"),
	Comment       = require("./models/comment"),
	User          = require("./models/user"),
	session       = require("express-session"),
	seedDB 	      = require("./seeds");

//requiring routes
var commentRoutes    = require("./routes/comments"),
	makeupRoutes    = require("./routes/makeups"),
	indexRoutes    = require("./routes/index");

mongoose.connect("mongodb+srv://junming:1234@cluster0-m0azh.mongodb.net/test?retryWrites=true", {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"public"));
app.use(methodOverride("_method"));
app.use(cookieParser('secret'));
//seedDB();

//passport configuration
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
   next();
});

//require routes
app.use("/",indexRoutes);
app.use("/makeups",makeupRoutes);
app.use("/makeups/:id/comments",commentRoutes);


app.listen(process.env.PORT||3000, process.env.IP, function(){
   console.log("The makeup review Server Has Started!");
});