const { ObjectId } = require("mongodb");
const { client } = require("../../utils/dbConfige");
const jwt = require("jsonwebtoken");
const dataBase = client.db("library-room");
const accessToken = async (req, res) => {
  const email = req.body;
  console.log(email);
  const token = jwt.sign(email, process.env.SECERET_KEY, { expiresIn: "10h" });
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .send({ success: true, token });
};
const deleteToken = async (req, res) => {
  const email = req.body;

  res.clearCookie("token", { maxAge: 0 }).send({ success: true });
};
const borrowBook = async (req, res) => {
  const body = req.body;
  const borrowBook = dataBase.collection("borrowBook");
  const existQuery = { bookId: body.bookId, userEmail: body.userEmail };
  const existingBorrowBook = await borrowBook.findOne(existQuery);
  if (existingBorrowBook) {
    return res.send({ error: "Book already borrowed" });
  }
  const result = await borrowBook.insertOne(body);
  res.status(200).send(result);
};

// get borrowed book
const getBorrowBook = async (req, res) => {
  let query = {};

  if (req?.query?.email) {
    query = { userEmail: req.query.email };
  }

  if (req?.user?.email === req?.query?.email) {
    const borrowBook = dataBase.collection("borrowBook");
    const result = await borrowBook.find(query).toArray();
    res.status(200).send(result);
  }
};
const retrunBook = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const borrowBook = dataBase.collection("borrowBook");
  const result = await borrowBook.deleteOne(filter);
  res.send(result);
};
const readBook = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const borrowBook = dataBase.collection("borrowBook");
  const result = await borrowBook.findOne(filter);
  res.send(result);
};

module.exports = {
  borrowBook,
  getBorrowBook,
  retrunBook,
  readBook,
  accessToken,
  deleteToken,
};
