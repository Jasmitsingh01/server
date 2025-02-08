import mongoose from "mongoose";
import Bycrpt from 'bcryptjs'
import Jwt from 'jsonwebtoken'
const GuestUserSchema = new mongoose.Schema({
  name: String,
  avtar: { type: String },
  email: { type: String, unique: true },
  contact:{type:String, default:'Please Enter Your Contact Number'},
  location:{type:String, default:'Please Enter Your location Address'},
  password: {
    type: String,
    require: true,
  },
});
GuestUserSchema.pre("save", async function (next) {
  if (this?.isModified("password")) {
    this.password = await Bycrpt.hash(this.password, 10);
  }
  next();
});

GuestUserSchema.methods.isPasswordMatch = async function (password) {
  return await Bycrpt.compare(password, this?.password);
};

GuestUserSchema.methods.generateAccessToken = function () {
  return Jwt.sign(
    { _id: this._id },
    process?.env?.JWT_SECRET_KEY_Access_Token,
    {
      expiresIn: "1d",
    }
  );
};

GuestUserSchema.methods.generateRefreshToken = function () {
  return Jwt.sign(
    { _id: this._id },
    process?.env?.JWT_SECRET_KEY_Refreseh_Token,
    {
      expiresIn: "7d",
    }
  );
};

const GuestUser = mongoose.model("GuestUser", GuestUserSchema);

export default GuestUser;
