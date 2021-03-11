import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { DatePicker, Select } from "antd";
import moment from "moment";

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

function HotelEditForm({
  values,
  setValues,
  handleChange,
  handleImageChange,
  handleSubmit,
}) {
  const { location, from, to } = values;
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
        {location && location.length && (
          <GooglePlacesAutocomplete
            className="form-control ml-20"
            apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
            apiOptions={{ language: "es" }}
            selectProps={{
              location,
              onChange: (value) => {
                setValues({ ...values, location: value.label });
              },
              placeholder: `${location}`,
            }}
          />
        )}
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
          value={values.bed}
        >
          <Option key={1}>{1}</Option>
          <Option key={2}>{2}</Option>
          <Option key={3}>{3}</Option>
          <Option key={4}>{4}</Option>
        </Select>
      </div>
      {from && to && (
        <RangePicker
          defaultValue={[
            moment(from.split("T")[0], dateFormat),
            moment(to.split("T")[0], dateFormat),
          ]}
          className="form-control m-2"
          format={dateFormat}
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
          onChange={(date, dateString) =>
            setValues({ ...values, from: dateString[0], to: dateString[1] })
          }
        />
      )}

      <button className="btn btn-outline-primary m-2">Save</button>
    </form>
  );
}

export default HotelEditForm;
