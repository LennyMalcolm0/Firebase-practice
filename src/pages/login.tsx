import { 
    signInWithEmailAndPassword, onAuthStateChanged,
    sendEmailVerification, sendPasswordResetEmail, sendSignInLinkToEmail, signInWithEmailLink, signOut
} from "firebase/auth";
import { auth } from "../firebase";
import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import { typing } from "../components/generalFunctions";

const Login = () => {
    const [validUser, setvalidUser]= useState(true);
    const history = createBrowserHistory();

    const signInUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const signInForm= document.querySelector('.login-form') as HTMLElement;
        signInForm.classList.add("animate-pulse");

        const signInFormInputs = document.querySelectorAll('.login-form input');
        const goToHomePage = document.querySelector('.link-home') as HTMLElement;
    
        const emailInput = signInFormInputs[0] as HTMLInputElement;
        const passwordInput = signInFormInputs[1] as HTMLInputElement;
        
        const email = emailInput.value;
        const password = passwordInput.value;
    
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            // console.log(userCredentials);
            signInForm.classList.remove("animate-pulse");
            goToHomePage.click();
        })
        .catch(err => {
            signInForm.classList.remove("animate-pulse");
            // console.log(err);
            emailInput.style.borderColor = "red";
            passwordInput.style.borderColor = "red";
            
            setvalidUser(false)
        })
    }

    return ( 
        <div>
            <div className="form-container">
                <form className='login-form' onSubmit={(e) => signInUser(e)}>
                    <label>Enter Email</label>
                    <input type="text" onInput={typing} placeholder="Email" className="form-input username-input"/>
                    
                    <label>Enter Password</label>
                    <input type="password" onInput={typing} placeholder="Password" className="form-input password-input"/>

                    {validUser ? <></> : <div className="invalid-credentials">Enter valid login details Or sign up if you don't have an account</div>}

                    <button type="submit" className="form-submit">Login</button>
                    <Link to="/" className="link-home"></Link>
                    
                    <div className='links'>
                        <Link to="/forgot-password" className="form-link forgot-password-link">Forgot Password?</Link>
                        <Link to='/create-account' className="form-link create-account-link">Create Account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default Login;