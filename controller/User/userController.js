const { ObjectId } = require("mongodb");
const { client } = require("../../utils/dbConfige");

const dataBase = client.db("library-room");
const borrowBook = async (req, res) => {
  const body = req.body;

  const borrowBook = dataBase.collection("borrowBook");
  const existQuery = { bookId: body.bookId };
  const existingBorrowBook = await borrowBook.findOne(existQuery);
  if (existingBorrowBook) {
    return res.send({ error: "Book already borrowed" });
  }
  const result = await borrowBook.insertOne(body);
  res.status(200).send(result);
};

module.exports = { borrowBook };
