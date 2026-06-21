import jwt from "jsonwebtoken";

const generateToken = (payload) => {
  return jwt.sign({id:payload._id,email: payload.email,username:payload.username}, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export default generateToken;
