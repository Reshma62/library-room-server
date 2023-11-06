const { client } = require("../../utils/dbConfige");

const dataBase = client.db("library-room");
const registerUserController = async (req, res) => {
  const body = await req.body;
  const user = dataBase.collection("users");
  const result = await user.insertOne(body);

  res.status(200).send(result);
};

module.exports = { registerUserController };
