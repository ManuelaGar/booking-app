import { useState, useEffect } from "react";
import { getAllHotels } from "../actions/hotel.js";
import HotelCard from "../components/cards/HotelCard.js";
import Search from "../components/forms/Search.js";

function Home() {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    loadAllHotels();
  }, []);

  async function loadAllHotels() {
    let res = await getAllHotels();
    setHotels(res.data);
  }

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>All Hotels</h1>
      </div>
      <div className="col px-3">
        <br />
        <Search />
      </div>
      <div className="container-fluid">
        <br />
        {hotels.map((h) => (
          <HotelCard key={h._id} h={h} />
        ))}
      </div>
    </>
  );
}

export default Home;
