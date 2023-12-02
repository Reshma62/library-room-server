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
  let query = {};
  const reqcategory = req.query?.category;
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.size);
  const skipBook = page * size;
  console.log(skipBook);
  if (reqcategory) {
    query = { category: reqcategory };
  }
  const books = dataBase.collection("books");
  const result = await books.find(query).skip(skipBook).limit(size).toArray();
  res.status(200).send(result);
};
const getAllBooksCount = async (req, res) => {
  const books = dataBase.collection("books");
  const result = await books.estimatedDocumentCount();
  res.status(200).send({ count: result });
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
  const returnBook = req.query?.returnBook;

  // find all books
  const books = dataBase.collection("books");
  const filter = { _id: new ObjectId(id) };
  const findQuantity = await books.findOne(filter);
  const prevQuantity = parseInt(findQuantity.quantity);
  console.log(findQuantity);

  let newQuantity;

  if (returnBook) {
    newQuantity = prevQuantity + 1;
  } else {
    newQuantity = prevQuantity - 1;
  }
  const updateDoc = {
    $set: {
      quantity: newQuantity.toString(),
    },
  };

  const result = await books.updateOne(filter, updateDoc);
  return res.send(result);
};
const sortingQuantity = async (req, res) => {
  const sort = req.query.sort;
  const returnBook = req.query?.returnBook;

  // find all books
  const books = dataBase.collection("books");
  const results = await books.find().sort(sort).toArray;
  res.send(results);
};

const updateBooks = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const books = dataBase.collection("books");

  const query = { _id: new ObjectId(id) };
  const filter = await books.findOne(query);
  const updateDoc = {
    $set: {
      bookName: body.bookName,
      authorName: body.authorName,
      rating: body.rating,
      category: body.category,
      bookPhoto: body.bookPhoto,
      description: body.description,
      quantity: body.quantity,
    },
  };

  const result = await books.updateOne(filter, updateDoc);
  return res.send(result);
};

module.exports = {
  createBook,
  getAllBooks,
  getSingleBookDetails,
  updateQuantity,
  getAllBooksCount,
  sortingQuantity,
  updateBooks,
};
