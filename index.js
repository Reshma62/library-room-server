const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 8080;
const Routes = require("./routes");
const { run } = require("./utils/dbConfige");
const path = require("path");
const { addToCart } = require("./controller/User/userController");
run();

//middlewa

const corsOptions = {
  origin: ["http://localhost:8080", "https://library-room-20afe.web.app"],
  credentials: true,
};

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(Routes);

app.get("/", function (req, res) {
  res.send("library room is available");
});

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
