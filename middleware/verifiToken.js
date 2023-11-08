const jwt = require("jsonwebtoken");
const verifiToken = async (req, res, next) => {
  const token = await req?.cookies?.token;

  if (!token) {
    return res.status(401).send({ error: "unathorized access" });
  }
  jwt.verify(token, process.env.SECERET_KEY, (error, decoded) => {
    if (error) {
      return res.send("unathorided access");
    }
    req.user = decoded;

    next();
  });
};
module.exports = verifiToken;
