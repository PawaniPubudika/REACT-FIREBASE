import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./firebase";
import firebase from "./firebase";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
      const db = firebase.firestore();
      db.collection("user_data").add({
        email: email.value,
        attempt1: "",
        attempt2: "",
        attempt3: "",
      });


    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label><br/><br/>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label><br/><br/>
       <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
 