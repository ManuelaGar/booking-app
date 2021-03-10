import express from "express";
import formidable from "express-formidable";
import { create, hotels, image, sellerHotels } from "../controllers/hotel";
import { requireSignin } from "../middlewares";

const router = express.Router();

router.post("/create-hotel", requireSignin, formidable(), create);
router.get("/hotels", hotels);
router.get("/hotels/image/:hotelId", image);
router.get("/seller-hotels", requireSignin, sellerHotels);

module.exports = router;
