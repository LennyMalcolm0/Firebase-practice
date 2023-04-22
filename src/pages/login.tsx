import { 
    signInWithEmailAndPassword,
    sendEmailVerification, sendPasswordResetEmail, sendSignInLinkToEmail, signInWithEmailLink
} from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

const Login = () => {
    const [validUser, setvalidUser]= useState(false);

    function signInUser () {
        const signInForm = document.querySelectorAll('.login-form input');
    
        const emailInput = signInForm[0] as HTMLInputElement;
        const passwordInput = signInForm[1] as HTMLInputElement;
        
        const email = emailInput.value;
        const password = passwordInput.value;
    
        signInWithEmailAndPassword(auth, email, password)
          .then(userCredentials => {
            console.log(userCredentials)
            signInForm.forEach(input => {
              const inputval = input as HTMLInputElement;
              inputval.value = ""
              setvalidUser(false)
            })
          })
          .catch(err => {
            console.log(err)
            emailInput.style.borderColor = "red";
            passwordInput.style.borderColor = "red";
            setvalidUser(true)
          })
      }

    return ( 
        <div>
             <div className="form-container">
                <form className='login-form'>
                    <label htmlFor="">Enter Email</label>
                    <input type="text" placeholder="Email" className="form-input username-input"/>
                    <label htmlFor="">Enter Password</label>
                    <input type="password" placeholder="Password" className="form-input password-input"/>

                    {validUser ? <div className="empty-input">Enter valid login details Or sign up if you don't have an account</div> : <></>}

                    <button type="submit" className="form-submit" onClick={signInUser}>Login</button>
                    
                    <div className='links'>
                        <a href="#" className="form-link forgot-password-link">Forgot Password?</a>
                        <a href="#" className="form-link create-account-link">Create Account</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default Login;