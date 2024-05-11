// LandingPage.js
import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <Link to="/form">
        <button>Get Started</button>
      </Link>
    </div>
  );
}

export default LandingPage;
