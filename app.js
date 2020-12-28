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
      middleware        = require("./middleware/index");

// Mongoose Connect
mongoose.connect(process.env.MONGO_CONNECT, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true})
        .then(result => app.listen(port, () => {console.log("Server Running")}))
        .catch(err => console.log(err));

// Middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://192.168.10.2:3000"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

// Checking Current User on all Paths
// app.all('*', middleware.checkUser);

// Using Routes
app.use(authRoutes);
app.use("/posts", postRoutes);