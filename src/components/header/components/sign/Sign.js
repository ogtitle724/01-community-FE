import { useState } from "react";

import SignUp from "./signup/SignUp";
import SignIn from "./signin/SignIn";
import "./style.css";

export default function Sign() {
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  return (
    <>
      <SignIn />
      <button
        className="sign__btn-signup"
        onClick={() => setShowSignUpForm(true)}
      >
        +
      </button>
      {showSignUpForm && <SignUp setShowSignUpForm={setShowSignUpForm} />}
    </>
  );
}
