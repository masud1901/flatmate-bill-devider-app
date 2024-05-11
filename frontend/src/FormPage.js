import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormPage() {
  const [formData, setFormData] = useState({
    amount: "",
    month: "",
    year: "",
    flatmates: [
      { name: "", days_in_house: "" },
      { name: "", days_in_house: "" },
    ],
  });
  const navigate = useNavigate();


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const requestData = {
      amount: parseInt(formData.amount),
      month: parseInt(formData.month),
      year: parseInt(formData.year),
      flatmates: formData.flatmates.map((flatmate) => ({
        name: flatmate.name,
        days_in_house: parseInt(flatmate.days_in_house),
      })),
    };

    console.log("Form Data", JSON.stringify(requestData, null, 2));

    const response = await fetch("http://localhost:8000/api/bills/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Response data:", JSON.stringify(result, null, 2));
    navigate("/result", { state: { result } });
  } catch (error) {
    console.error("Error:", error);
  }
};
  const handleChange = (e, index, field) => {
    if (index !== null && field !== null) {
      const updatedFlatmates = [...formData.flatmates];
      updatedFlatmates[index][field] = e.target.value;
      setFormData({ ...formData, flatmates: updatedFlatmates });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <div>
      <h2>Enter Data</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={(e) => handleChange(e, null, null)}
          />
        </label>
        <label>
          Month:
          <input
            type="number"
            name="month"
            value={formData.month}
            onChange={(e) => handleChange(e, null, null)}
          />
        </label>
        <label>
          Year:
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={(e) => handleChange(e, null, null)}
          />
        </label>
        {formData.flatmates.map((flatmate, index) => (
          <div key={index}>
            <label>
              Name:
              <input
                type="text"
                value={flatmate.name}
                onChange={(e) => handleChange(e, index, "name")}
              />
            </label>
            <label>
              Days in House:
              <input
                type="number"
                value={flatmate.days_in_house}
                onChange={(e) => handleChange(e, index, "days_in_house")}
              />
            </label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormPage;
