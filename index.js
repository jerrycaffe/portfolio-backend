const express = require("express");
const morgan = require("morgan");
const router = require("./routes");

const app = express();

// Middlewares
app.use(morgan("tiny"));
// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.get("/", (req, res) => {
  res.send("Welcome to my resume application with Zuri");
});

// running server
const port = process.env.PORT || 9000;

app.listen(port, () => console.log("litening on port " + port));
