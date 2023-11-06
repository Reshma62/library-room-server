const express = require("express");
const app = express();
require("dotenv").config();
var cors = require("cors");

const PORT = process.env.PORT || 8000;
const Routes = require("./routes");
const { run } = require("./utils/dbConfige");

//middleware
app.use(cors());
app.use(express.json());
run();
app.use(Routes);
app.get("/", function (req, res) {
  res.send("library room is available");
});

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
