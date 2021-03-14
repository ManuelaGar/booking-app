import axios from "axios";

export async function createHotel(token, data) {
  return await axios.post(`${process.env.REACT_APP_API}/create-hotel`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getAllHotels() {
  return await axios.get(`${process.env.REACT_APP_API}/hotels`);
}

export function diffDays(from, to) {
  const day = 24 * 60 * 60 * 1000;
  const start = new Date(from);
  const end = new Date(to);

  const difference = Math.round(Math.abs((start - end) / day));
  return difference;
}

export async function sellerHotels(token) {
  return await axios.get(`${process.env.REACT_APP_API}/seller-hotels`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function deleteHotel(token, hotelId) {
  return await axios.delete(
    `${process.env.REACT_APP_API}/delete-hotel/${hotelId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function readHotel(hotelId) {
  return await axios.get(`${process.env.REACT_APP_API}/hotel/${hotelId}`);
}

export async function updateHotel(token, data, hotelId) {
  return await axios.put(
    `${process.env.REACT_APP_API}/update-hotel/${hotelId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
export async function userHotelBookings(token) {
  return await axios.get(`${process.env.REACT_APP_API}/user-hotel-bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function isAlreadyBooked(token, hotelId) {
  return await axios.get(
    `${process.env.REACT_APP_API}/is-already-booked/${hotelId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function searchListings(query) {
  return await axios.post(
    `${process.env.REACT_APP_API}/search-listings`,
    query
  );
}
