// ResultPage.js
import React from "react";
import { useLocation } from "react-router-dom";

function ResultPage() {
  const location = useLocation();
  const result = location.state?.result;

  return (
    <div>
      <h2>Result</h2>
      {result ? (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      ) : (
        <p>No result available</p>
      )}
    </div>
  );
}

export default ResultPage;
