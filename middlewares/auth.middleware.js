import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
 
  const token = req.cookies.jwtToken;
 
  if (!token) return res.status(401).send("Please login");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure secret matches
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
  // jwt.verify(token, "POSTAWAY_SECRET", (err, data) => {
  //   if (err) return res.status(403).send("Invalid token");
  //   req.user = data; // data contains user info
  //   next();
  // });
};
