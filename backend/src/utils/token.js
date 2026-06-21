import jwt from "jsonwebtoken";

// Generate a JWT token for the given user payload.
// The token payload includes `id`, `email`, and `username` and is signed
// with the `JWT_SECRET` environment variable. Tokens expire in 1 hour.
const generateToken = (payload) => {
  return jwt.sign({ id: payload._id, email: payload.email, username: payload.username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export default generateToken;
