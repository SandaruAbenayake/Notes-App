const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.JWT_SECRET
, (err, user) => {
    if (err) return res.sendStatus(401);
    req.user = user._id;
    next();
  });
}

module.exports = {
  authenticateToken,
};
