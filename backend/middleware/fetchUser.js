const jwt = require("jsonwebtoken");
const JWT_SECRET = "jenilgajj@r";

const fetchUser = (req, res, next) => {
  // Get the user from the jwt token and add id to the request object
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using correct token." });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;

    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Please authenticate using correct token." });
  }
};

module.exports = fetchUser;
