const jwt = require("jsonwebtoken");

// headerim yoxdusa ve headerde baererle baslamirsa 401 qaytarir
exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({ message: "Unauthorized" });

// baerernen tokeni ayirir
  const token = authHeader.split(" ")[1];
    // kodu yoxluyur 
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
