require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
//method override allows you to use PUT and Delete requests
const methodOverride = require("method-override");
const connectDB = require("./server/config/db");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000 || process.env.PORT;

//Database connection
connectDB();

//urlenconder and json lets you take in data from forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    // cookie: { maxAge: 1000 * 60 * 60 * 24 }
  })
);

app.use(express.static("public"));
//Templating engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", require("./server/routes/main"));
app.use("/", require("./server/routes/admin"));
app.use("/api", require("./server/routes/api"));

app.listen(PORT, () => {
  console.log(`🚀 App listening on port ${PORT}`);
});
