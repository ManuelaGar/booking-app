import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createHotel } from "../actions/hotel.js";
import HotelCreateForm from "../components/forms/HotelCreateForm.js";

function NewHotel() {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const [location, setLocation] = useState("");
  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );

  async function handleSubmit(event) {
    event.preventDefault();

    let hotelData = new FormData();
    hotelData.append("title", values.title);
    hotelData.append("content", values.content);
    hotelData.append("location", location.label);
    values.image && hotelData.append("image", values.image);
    hotelData.append("price", values.price);
    hotelData.append("from", values.from);
    hotelData.append("to", values.to);
    hotelData.append("bed", values.bed);

    console.log([...hotelData]);

    try {
      let res = await createHotel(token, hotelData);
      console.log("Hotel create res", res);
      toast.success("New hotel is posted");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  }

  function handleImageChange(event) {
    setPreview(URL.createObjectURL(event.target.files[0]));
    setValues({ ...values, image: event.target.files[0] });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Add Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <HotelCreateForm
              values={values}
              setValues={setValues}
              location={location}
              setLocation={setLocation}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            ></img>
            <pre>{JSON.stringify(values, null, 4)}</pre>
            {JSON.stringify(location.label, null, 4)}
          </div>
        </div>
      </div>
    </>
  );
}

export default NewHotel;
