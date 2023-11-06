const { client } = require("../../utils/dbConfige");

const dataBase = client.db("library-room");

const createCategory = async (req, res) => {
  try {
    const body = req.body;

    const imgUrl = `/uploads/${req?.file?.filename}`;
    body.CategoryPhoto = imgUrl;
    const categorys = dataBase.collection("categorys");
    const query = { name: body.name };
    const existingCategory = await categorys.findOne(query);
    if (existingCategory) {
      return res.send({ error: "Category already exists. Try Another One" });
    }
    const result = await categorys.insertOne(body);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};
const getAllCategory = async (req, res) => {
  const Categorys = dataBase.collection("categorys");
  const category = await Categorys.find().toArray();
  res.send(category);
};
module.exports = { createCategory, getAllCategory };
