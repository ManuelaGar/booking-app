import Hotel from "../models/hotel.js";
import fs from "fs";

export async function create(req, res) {
  try {
    let fields = req.fields;
    let files = req.files;

    let hotel = new Hotel(fields);
    hotel.postedBy = req.user._id;

    if (files.image) {
      hotel.image.data = fs.readFileSync(files.image.path);
      hotel.image.contentType = files.image.type;
    }

    hotel.save((err, result) => {
      if (err) {
        console.log("saving hotel err ", err);
        res.status(400).json("Error saving");
      }
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
}

export async function hotels(req, res) {
  let allHotels = await Hotel.find({})
    .limit(24)
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  console.log(allHotels);
  res.json(allHotels);
}

export async function image(req, res) {
  let hotel = await Hotel.findById(req.params.hotelId).exec();
  if (hotel && hotel.image && hotel.image.data !== null) {
    res.set("Content-Type", hotel.image.contentType);
    return res.send(hotel.image.data);
  }
}

export async function sellerHotels(req, res) {
  let allHotels = await Hotel.find({ postedBy: req.user._id })
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  res.send(allHotels);
}

export async function remove(req, res) {
  let removedHotel = await Hotel.findByIdAndDelete(req.params.hotelId)
    .select("-image.data")
    .exec();
  res.json(removedHotel);
}

export async function read(req, res) {
  let hotel = await Hotel.findById(req.params.hotelId)
    .populate("postedBy", "_id name")
    .select("-image.data")
    .exec();
  res.json(hotel);
}

export async function update(req, res) {
  try {
    let fields = req.fields;
    let files = req.files;

    let data = { ...fields };
    if (files.image) {
      let image = {};
      image.data = fs.readFileSync(files.image.path);
      image.contentType = files.image.type;
      data.image = image;
    }

    let updatedHotel = await Hotel.findByIdAndUpdate(req.params.hotelId, data, {
      new: true,
    }).select("-image.data");

    res.json(updatedHotel);
  } catch (error) {
    console.log(error);
    res.status(400).send("Hotel update failed. Try again.");
  }
}
