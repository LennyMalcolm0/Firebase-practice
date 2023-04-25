import { 
    signInWithEmailAndPassword, onAuthStateChanged,
    sendEmailVerification, sendPasswordResetEmail, sendSignInLinkToEmail, signInWithEmailLink, signOut
} from "firebase/auth";
import { auth } from "../firebase";
import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { typing } from "../components/generalFunctions";

const Login = () => {
    const [validUser, setvalidUser]= useState(true);
    const [validPassword, setvalidPassword]= useState(true);

    const signInUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const signInForm= document.querySelector('.login-form') as HTMLElement;
        signInForm.classList.add("animate-pulse");

        const signInFormInputs = document.querySelectorAll('.login-form input');
        const goToHomePage = document.querySelector('.home-link') as HTMLElement;
    
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

            const errorMessage = err.message;
            if (errorMessage === "Firebase: Error (auth/wrong-password).") {
                passwordInput.style.borderColor = "red";

                setvalidUser(true);
                setvalidPassword(false);
            } else {
                emailInput.style.borderColor = "red";
                passwordInput.style.borderColor = "red"; 

                setvalidPassword(true);
                setvalidUser(false);
            }
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
                    {validPassword ? <></> : <div className="invalid-credentials">Wrong password</div>}

                    <button type="submit" className="form-submit mt-[30px] ">Login</button>
                    <Link to="/" className="home-link"></Link>
                    
                    <div className='links mt-[20px] '>
                        <Link to="/forgot-password" className="form-link forgot-password-link">Forgot Password?</Link>
                        <Link to='/create-account' className="form-link create-account-link">Create Account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default Login;