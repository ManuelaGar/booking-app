import { useState, useEffect } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import Search from "../components/forms/Search.js";
import { searchListings } from "../actions/hotel.js";
import HotelCard from "../components/cards/HotelCard.js";

function SearchResult() {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchBed, setSearchBed] = useState("");
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const { location, date, bed } = queryString.parse(window.location.search);
    searchListings({ location, date, bed }).then((res) => {
      console.log("Search Results", res.data);
      setHotels(res.data);
    });
  }, [window.location.search]);

  return (
    <>
      <div className="col px-3">
        <br />
        <Search />
      </div>
      <div className="container">
        <div className="row">
          {hotels.map((h) => {
            return <HotelCard key={h._id} h={h} />;
          })}
        </div>
      </div>
    </>
  );
}

export default SearchResult;
