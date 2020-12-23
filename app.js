// Global Requirements
const express           = require("express"),
      cors              = require('cors'),
      env               = require('dotenv').config(),
      mongoose          = require("mongoose"),
      passport          = require("passport"),
      LocalStrategy     = require("passport-local"),
      bodyParser        = require("body-parser"),
      flash             = require("connect-flash"),
      methodOverride    = require("method-override"),
      app               = express(),
      port              = 6969;

// Local Requirements
const Post              = require("./models/post"),
      User              = require("./models/user"),
      postRoutes        = require("./routes/post"),
      authRoutes        = require("./routes/index");

// Mongoose Connect
mongoose.connect(process.env.MONGO_CONNECT, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// Express Session
app.use(require("express-session")({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

// Global Declarations
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

// Passport Declarations
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Using Routes
app.use("/", authRoutes);
app.use("/posts", postRoutes);

// Running Server
app.listen(port, () => {
    console.log("Server runnning!");
});