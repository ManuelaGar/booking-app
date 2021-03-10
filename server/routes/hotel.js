import express from "express";
import formidable from "express-formidable";
import {
  create,
  hotels,
  image,
  sellerHotels,
  remove,
  read,
} from "../controllers/hotel";
import { requireSignin, hotelOwner } from "../middlewares";

const router = express.Router();

router.post("/create-hotel", requireSignin, formidable(), create);
router.get("/hotels", hotels);
router.get("/hotels/image/:hotelId", image);
router.get("/seller-hotels", requireSignin, sellerHotels);
router.delete("/delete-hotel/:hotelId", requireSignin, hotelOwner, remove);
router.get("/hotel/:hotelId", read);

module.exports = router;
