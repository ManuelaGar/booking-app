import Hotel from "../models/hotel.js";
import fs from "fs";
import Order from "../models/order.js";

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
  let allHotels = await Hotel.find({ from: { $gte: new Date() } })
    .limit(24)
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
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

export async function userHotelBookings(req, res) {
  const allOrders = await Order.find({ orderedBy: req.user._id })
    .select("session")
    .populate("hotel", "-image.data")
    .populate("orderedBy", "_id name")
    .exec();
  res.json(allOrders);
}

export async function isAlreadyBooked(req, res) {
  const { hotelId } = req.params;
  const userOrders = await Order.find({ orderedBy: req.user._id })
    .select("hotel")
    .exec();
  let ids = [];
  userOrders.forEach((u) => {
    ids.push(u.hotel.toString());
  });
  res.json({ ok: ids.includes(hotelId) });
}

export async function searchListings(req, res) {
  const { location, date, bed } = req.body;
  const from = date.split(",");
  let result = await Hotel.find({ from: { $gte: new Date(from[0]) }, location })
    .select("-image.data")
    .exec();
  res.json(result);
}
