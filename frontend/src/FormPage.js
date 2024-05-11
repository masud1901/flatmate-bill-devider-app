import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormPage() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/bills/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      navigate("/result", { state: { result } });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Enter Data</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <input type="text" name="field1" onChange={handleChange} />
        <input type="text" name="field2" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormPage;
