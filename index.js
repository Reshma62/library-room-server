const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8080;
const Routes = require("./routes");
const { run } = require("./utils/dbConfige");
const path = require("path");
const { addToCart } = require("./controller/User/userController");

run();

//middlewa

app.use(
  cors({
    origin: ["https://library-room-20afe.web.app", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(Routes);

app.get("/", function (req, res) {
  res.send("library room is available");
});

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
