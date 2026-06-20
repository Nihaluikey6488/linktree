import jwt from "jsonwebtoken";

const genearateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export default genearateToken;
