import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.cookies.jwtToken;
  if (!token) return res.status(401).send("Please login");

  jwt.verify(token, "POSTAWAY_SECRET", (err, data) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = data; // data contains user info
    next();
  });
};
