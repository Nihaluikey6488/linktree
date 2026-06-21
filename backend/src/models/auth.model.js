import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

// User schema: stores basic authentication data.
// - username: unique handle shown publicly
// - email: used for login and uniqueness
// - password: stored hashed via pre-save hook
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Hash password before saving when it has changed
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hashSync(this.password, 10);
});

// Compare a plain-text password against the stored hash
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const userModel = model("User", userSchema);
export default userModel;
