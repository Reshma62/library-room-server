const { client } = require("../../utils/dbConfige");

const dataBase = client.db("library-room");

const createCategory = async (req, res) => {
  const body = req.body;
  const imgUrl = `/uploads/${req?.file?.filename}`;
  body.image = imgUrl;

  const user = dataBase.collection("categorys");
  const result = await user.insertOne(body);
  res.status(200).send(result);
};
module.exports = { createCategory };
