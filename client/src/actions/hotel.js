import axios from "axios";

export async function createHotel(token, data) {
  return await axios.post(`${process.env.REACT_APP_API}/create-hotel`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
