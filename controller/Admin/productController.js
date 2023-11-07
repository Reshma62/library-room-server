const { ObjectId } = require("mongodb");
const { client } = require("../../utils/dbConfige");

const dataBase = client.db("library-room");

const createBook = async (req, res) => {
  const body = await req.body;
  console.log(body);
  const books = dataBase.collection("books");
  const result = await books.insertOne(body);
  res.status(200).send(result);
};
const getAllBooks = async (req, res) => {
  const query = {};
  const books = dataBase.collection("books");
  const result = await books.find(query).toArray();
  res.status(200).send(result);
};
const getSingleBookDetails = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const books = dataBase.collection("books");
  const result = await books.findOne(query);
  res.status(200).send(result);
};
const updateQuantity = async (req, res) => {
  const id = req.params.id;

  // find all books
  const books = dataBase.collection("books");
  const filter = { _id: new ObjectId(id) };
  const findQuantity = await books.findOne(filter);
  const prevQuantity = parseInt(findQuantity.quantity);
  // find borrow quantity
  const borrowBook = dataBase.collection("borrowBook");
  const existQuery = { bookId: id };
  const existingBorrowBook = await borrowBook.findOne(existQuery);
  const newQuantity = prevQuantity - 1;
  const updateDoc = {
    $set: {
      quantity: newQuantity.toString(),
    },
  };
  if (existingBorrowBook) {
    return;
  }
  const result = await books.updateOne(filter, updateDoc);
  res.send({ result });
};

module.exports = {
  createBook,
  getAllBooks,
  getSingleBookDetails,
  updateQuantity,
};
