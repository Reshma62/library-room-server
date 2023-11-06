const express = require("express");
const app = express();
require("dotenv").config();
var cors = require("cors");

const PORT = process.env.PORT || 8000;
const Routes = require("./routes");
const { run } = require("./utils/dbConfige");
const path = require("path");
run();
//middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(Routes);

const corsOptions = {
  origin: ["http://localhost:5173"],
  Credential: true,
};

app.get("/", function (req, res) {
  res.send("library room is available");
});

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
