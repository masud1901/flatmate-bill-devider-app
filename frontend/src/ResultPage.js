import React from "react";
import { useLocation } from "react-router-dom";

function ResultPage() {
  const location = useLocation();
  const result = location.state?.result || [];

  return (
    <div>
      <h2>Result</h2>
      {result.length > 0 ? (
        <ul>
          {result.map((flatmate, index) => (
            <li key={index}>
              <p>Name: {flatmate.name}</p>
              <p>Days in House: {flatmate.days_in_house}</p>
              <p>Payment: {flatmate.payment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No result available</p>
      )}
    </div>
  );
}

export default ResultPage;
