const express = require("express");
const crypto = require("crypto");
const app = express();
const expressHandlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const Bcrypt = require("bcryptjs");

app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.engine(
  "hbs",
  expressHandlebars.engine({
    extname: "hbs",
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: "main",
  })
);

app.get("/", (req, res) => {
  res.render("index");
});
// Handle POST requests to the "/login" URL
app.post("/login", (req, res) => {
  console.log(req.body, "lal");
  const username = req.body.username;
  const password = req.body.password;

  // Generate a secure hash of the password using the "crypto" module
  const passwordHash = Bcrypt.hashSync(password, 6);
  console.log(passwordHash);

  // Render the second page with the username and password hash as template variables
  res.render("login_successful", {
    username: username,
    passwordHash: passwordHash,
  });
});

// Start the server on port 3000
app.listen(3000, () => console.log("Server started on port 3000"));
