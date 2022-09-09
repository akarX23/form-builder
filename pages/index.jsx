import axios from "axios";
import React, { useEffect, useState } from "react";
import FormBuilder from "react-form-builder2";

const App = () => {
  const [values, setValues] = useState({
    formName: "",
    _id: "",
    formData: [],
  });

  const [url, setUrl] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    axios.post("/api/form", values).then((res) => {
      console.log(res.data);
      setValues(res.data);

      setUrl("/api/form?_id=" + res.data._id);
    });
  };

  return (
    <div>
      <div style={{ display: "flex", margin: "30px", alignItems: "end" }}>
        <div style={{ marginRight: "40px" }}>
          <p>Form name</p>
          <input
            value={values.formName}
            type="text"
            onChange={(event) => setValues({ formName: event.target.value })}
            id="name"
          />
        </div>
        {!url && <button onClick={onSubmit}>Create Form</button>}
      </div>
      {url && <FormBuilder.ReactFormBuilder saveUrl={url} />}
    </div>
  );
};

export default App;
