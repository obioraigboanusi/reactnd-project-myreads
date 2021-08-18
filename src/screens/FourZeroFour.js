import React from "react";
import { Link } from "react-router-dom";

function FourZeroFour() {
  return (
    <div className="not-found">
      <h1>Ooops!!!</h1>
      <p> The page you are looking does not exist</p>
      <div>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}

export default FourZeroFour;
