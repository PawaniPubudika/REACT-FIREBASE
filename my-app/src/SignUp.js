import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./firebase";
import firebase from "./firebase";
import styles from "./Login.module.css"
import login_back from './login_back.jpg';

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
      
      <form className={styles.login_form} onSubmit={handleSignUp}>
      <img src={login_back} className={styles.login_img} alt=""></img>
      <h1 className={styles.login_topic}>SignUp</h1>
      <div className={styles.label_div}>
        <label>
          <span className={styles.em}>Email</span>
          <input className={styles.un} name="email" type="email" placeholder="Email" />
        </label><br/><br/>
        <label>
        <span className={styles.em}>Password</span>
          <input className={styles.pw} name="password" type="password" placeholder="Password" />
        </label><br/><br/>
        <button  className={styles.login_button} type="submit">SignUp</button>
        </div>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
 