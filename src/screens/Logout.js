import React, { useState } from "react";

export default function LoginScreen() {
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div>
      <h1>Logout</h1>
      {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Logout</button>
    </div>
  );
}