// Global Requirements
const express           = require("express"),
      cors              = require("cors"),
      env               = require("dotenv").config(),
      mongoose          = require("mongoose"),
      bodyParser        = require("body-parser"),
      cookieParser      = require("cookie-parser"),
      app               = express(),
      port              = process.env.PORT || 6969;

// Local Requirements
const postRoutes        = require("./routes/post"),
      authRoutes        = require("./routes/auth");

// Mongoose Connect
mongoose.connect(process.env.MONGO_CONNECT, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true})
        .then(result => app.listen(port, () => {console.log("Server Running")}))
        .catch(err => console.log(err));

// Middleware
app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

// Using Routes
app.use(authRoutes);
app.use("/posts", postRoutes);