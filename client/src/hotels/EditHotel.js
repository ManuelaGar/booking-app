import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { readHotel, updateHotel } from "../actions/hotel.js";
import HotelEditForm from "../components/forms/HotelEditForm.js";

function EditHotel({ match }) {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
    location: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );

  useEffect(() => {
    loadSellerHotel();
  }, []);

  async function loadSellerHotel() {
    try {
      let res = await readHotel(match.params.hotelId);
      setValues({ ...values, ...res.data });
      setPreview(`${process.env.REACT_APP_API}/hotels/image/${res.data._id}`);
    } catch (error) {
      toast.error("Error getting hotel data.");
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

  async function handleSubmit(event) {
    event.preventDefault();

    let hotelData = new FormData();
    hotelData.append("title", values.title);
    hotelData.append("content", values.content);
    hotelData.append("location", values.location);
    values.image && hotelData.append("image", values.image);
    hotelData.append("price", values.price);
    hotelData.append("from", values.from);
    hotelData.append("to", values.to);
    hotelData.append("bed", values.bed);

    try {
      let res = await updateHotel(token, hotelData, match.params.hotelId);
      console.log("Hotel update response", res);
      toast.success(`${res.data.title} is updated`);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      //toast.error(error.response.data.err);
    }
  }

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Edit Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            show edit form
            <HotelEditForm
              values={values}
              setValues={setValues}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default EditHotel;
