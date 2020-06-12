import React, { useCallback, useContext} from "react";
import { withRouter, Redirect } from "react-router";
import app from "./firebase.js";
import { AuthContext } from "./Auth.js";
// import SignUp from "./SignUp.js";
import styles from './Login.module.css'
import login_back from './login_back.jpg';


const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
  
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);
  

  if (currentUser) {
    return <Redirect to="/" />;
  }


  

  return (
    <div >
      
      <form className={styles.login_form} onSubmit={handleLogin}>
      {/* <img src="login_back.jpg" id="login_img" alt=""> */}
      <img src={login_back} className={styles.login_img} alt=""></img>
      <h1 className={styles.login_topic}>Log in</h1>
      <div className={styles.label_div}>
        <label>
          <span className={styles.em}>Email</span>
          <input className={styles.un} name="email" type="email" placeholder="Email" />
        </label><br/><br/>
        <label>
        <span className={styles.em}>Password</span>
          <input className={styles.pw} name="password" type="password" placeholder="Password" />
        </label><br/><br/>
        <button  className={styles.login_button} type="submit">Log in</button>
        </div>
        
      </form>

    </div>








  );
};

export default withRouter(Login);