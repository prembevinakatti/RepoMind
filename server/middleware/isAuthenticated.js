const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized. No token provided." });
    }

    const decoded = await jwt.verify(token, process.env.JWT_TOKEN);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Error in authentication middleware:", error);
  }
};

module.exports = isAuthenticated;
