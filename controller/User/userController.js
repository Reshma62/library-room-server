const { ObjectId } = require("mongodb");
const { client } = require("../../utils/dbConfige");

const dataBase = client.db("library-room");

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

  if (req.query?.email) {
    query = { userEmail: req.query.email };
  }
  const borrowBook = dataBase.collection("borrowBook");

  const result = await borrowBook.find(query).toArray();

  res.status(200).send(result);
};
const retrunBook = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const borrowBook = dataBase.collection("borrowBook");
  const result = await borrowBook.deleteOne(filter);
  res.send(result);
};

module.exports = { borrowBook, getBorrowBook, retrunBook };
