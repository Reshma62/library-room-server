const { ObjectId } = require("mongodb");
const { client } = require("../../utils/dbConfige");

const dataBase = client.db("library-room");

const createProduct = async (req, res) => {
  const body = await req.body;
  const books = dataBase.collection("books");
  const result = await books.insertOne(body);
  res.status(200).send(result);
};
module.exports = { createProduct };
