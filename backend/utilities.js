const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: true, message: "Token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: true, message: "Invalid token" });
    }

    // Assuming your token was created like: jwt.sign({ user }, ...)
    const user = decoded.user;

    if (!user || !user._id) {
      return res.status(403).json({ error: true, message: "Invalid user data in token" });
    }

    req.user = user;
    req.userId = user._id;
    next();
  });
}

module.exports = { authenticateToken };
