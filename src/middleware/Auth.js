const jwt = require("jsonwebtoken");
const SECRET_KEY = 'jwt-secret';

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(authHeader)

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = {id: decoded.userId};
    console.log("DECODED BIASA:" ,decoded)
    console.log("REQ USER BIASA: ",req.user)
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authenticateJWT;