import { useState } from "react";
import { toast } from "react-toastify";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { DatePicker, Select } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import { createHotel } from "../actions/hotel.js";

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

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
    let res = await createHotel(token, hotelData);
    console.log("Hotel create res", res);
    toast("New hotel is posted");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
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

  function hotelForm() {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="btn btn-outline-secondary btn-block m-2 text-left">
            Image
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              hidden
            />
          </label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Title"
            className="form-control m-2"
            value={values.title}
          />
          <textarea
            name="content"
            onChange={handleChange}
            placeholder="Content"
            className="form-control m-2"
            value={values.content}
          />
          <GooglePlacesAutocomplete
            className="form-control"
            apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
            apiOptions={{ language: "es" }}
            selectProps={{
              location,
              onChange: setLocation,
              placeholder: "Location",
            }}
          />
          <input
            type="number"
            name="price"
            onChange={handleChange}
            placeholder="Price"
            className="form-control m-2"
            value={values.price}
          />
          <Select
            className="w-100 m-2"
            size="large"
            placeholder="Number of beds"
            onChange={(value) => setValues({ ...values, bed: value })}
          >
            <Option key={1}>{1}</Option>
            <Option key={2}>{2}</Option>
            <Option key={3}>{3}</Option>
            <Option key={4}>{4}</Option>
          </Select>
        </div>
        <RangePicker
          className="form-control m-2"
          format={dateFormat}
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
          onChange={(date, dateString) =>
            setValues({ ...values, from: dateString[0], to: dateString[1] })
          }
        />

        <button className="btn btn-outline-primary m-2">Save</button>
      </form>
    );
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
            {hotelForm()}
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
