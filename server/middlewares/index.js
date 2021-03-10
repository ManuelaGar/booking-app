import expressJwt from "express-jwt";
import Hotel from "../models/hotel.js";

export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export async function hotelOwner(req, res, next) {
  let hotel = await Hotel.findById(req.params.hotelId).exec();
  let owner = hotel.postedBy._id.toString() == req.user._id.toString();
  if (!owner) {
    res.status(403).send("Unauthorized");
  }
  next();
}
