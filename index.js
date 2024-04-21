let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");

// Express Route
const studentRoute = require("./routes/user.routes");

// Connecting mongoDB Database
mongoose
  .connect(
    "mongodb+srv://ojadhav250:OIyYq8zGJvKK7nLF@cluster1.wz4vdqc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1", { useNewUrlParser: true, useUnifiedTopology: true } )
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err.reason);
  });

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/students", studentRoute);

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   User.findone({ email: email }, (err, user) => {
//     if (user) {
//       if (password === user.password) {
//         res.send({ message: "login sucess", user: user });
//       } else {
//         res.send({ message: "wrong credentials" });
//       }
//     } else {
//       res.send("not register");
//     }
//   });
// });
