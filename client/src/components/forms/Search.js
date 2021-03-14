import React, { useState } from "react";
import { DatePicker, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useHistory } from "react-router-dom";

const { RangePicker } = DatePicker;
const { Option } = Select;

function Search() {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [bed, setBed] = useState("");

  const history = useHistory();
  function handleSubmit() {
    history.push(
      `/search-result?location=${location.label}&date=${date}&bed=${bed}`
    );
  }

  return (
    <div className="d-flex pb-4">
      <div className="w-100">
        <GooglePlacesAutocomplete
          className="form-control"
          apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
          apiOptions={{ language: "es" }}
          selectProps={{
            location,
            onChange: setLocation,
            placeholder: "Where are we going?",
          }}
        />
      </div>

      <RangePicker
        className="w-100"
        format="YYYY/MM/DD"
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
        onChange={(d, dateString) => setDate(dateString)}
      />

      <Select
        className="w-100"
        size="large"
        placeholder="Number of beds"
        onChange={(value) => setBed(value)}
      >
        <Option key={1}>{1}</Option>
        <Option key={2}>{2}</Option>
        <Option key={3}>{3}</Option>
        <Option key={4}>{4}</Option>
      </Select>

      <SearchOutlined
        onClick={handleSubmit}
        className="btn btn-primary p-3 btn-square"
      />
    </div>
  );
}

export default Search;
