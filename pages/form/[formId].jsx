import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ReactFormGenerator } from "react-form-builder2";

const FormPage = () => {
  const router = useRouter();

  const [form, setForm] = useState({});
  const [formData, setFormData] = useState([]);
  useEffect(() => {
    axios.get("/api/form?_id=" + router.query.formId).then((res) => {
      setFormData(res.data.formData);
      setForm(res.data);
    });
  }, [router.isReady]);

  if (formData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        margin: "50px",
      }}
    >
      <ReactFormGenerator
        form_action="/api/answers"
        form_method="POST"
        data={formData}
        onSubmit={async (data) => {
          //   event.preventDefault();
          await axios.post("/api/answers", {
            formId: form._id,
            values: data,
          });
        }}
      />
    </div>
  );
};

export default FormPage;
