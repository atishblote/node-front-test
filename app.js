const express = require("express");
const app = express();
const morgan = require("morgan");

// const adminLogin = require("./api/routes/adminBackendRoute");
const frontPages = require("./api/routes/pageRoutes");


app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // This is where your EJS templates will be stored

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept" // Corrected header name
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


// app.use("",adminLogin)
app.use('', frontPages)


app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
