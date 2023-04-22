import { 
    signInWithEmailAndPassword,
    sendEmailVerification, sendPasswordResetEmail, sendSignInLinkToEmail, signInWithEmailLink, signOut
} from "firebase/auth";
import { auth } from "../firebase";
import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { createBrowserHistory } from 'history';

const Login = () => {
    const [validUser, setvalidUser]= useState(false);

    const signInUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const signInForm= document.querySelector('.login-form') as HTMLElement;
        signInForm.classList.add("auth-animation");

        const signInFormInputs = document.querySelectorAll('.login-form input');
    
        const emailInput = signInFormInputs[0] as HTMLInputElement;
        const passwordInput = signInFormInputs[1] as HTMLInputElement;
        
        const email = emailInput.value;
        const password = passwordInput.value;
    
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            signInForm.classList.remove("auth-animation");
            // console.log(userCredentials);
            signInFormInputs.forEach(input => {
                const inputval = input as HTMLInputElement;
                inputval.value = ""
            })
            setvalidUser(true);
            const history = createBrowserHistory();
            history.push('/');
        })
        .catch(err => {
            signInForm.classList.remove("auth-animation");
            // console.log(err);
            emailInput.style.borderColor = "red";
            passwordInput.style.borderColor = "red";

            const invalidCredentials = document.querySelector('.invalid-credentials') as HTMLElement;
            if (invalidCredentials) invalidCredentials.style.display = "block";
            
            setvalidUser(false)
        })
    }
    // betheludochukwu94@gmail.com

    function logoutUser () {
        signOut(auth)
        .then(() => {
            console.log("User signed out")
        })
        .catch(err => {
            console.log(err)
        })
    }

    const typing = () => {
        const signInFormInputs = document.querySelectorAll('.login-form input');
    
        signInFormInputs.forEach(input => {
            const inputElement = input as HTMLInputElement;
            inputElement.style.borderColor = "#ccc";
        })
    }

    return ( 
        <div>
            <div className="form-container">
                <form className='login-form' onSubmit={(e) => signInUser(e)}>
                    <label htmlFor="">Enter Email</label>
                    <input type="text" onInput={typing} placeholder="Email" className="form-input username-input"/>
                    <label htmlFor="">Enter Password</label>
                    <input type="password" onInput={typing} placeholder="Password" className="form-input password-input"/>

                    {!validUser ? <div className="invalid-credentials">Enter valid login details Or sign up if you don't have an account</div> : <></>}

                    <button type="submit" className="form-submit">Login</button>
                    
                    <div className='links'>
                        <Link to="/forgot-password" className="form-link forgot-password-link">Forgot Password?</Link>
                        <Link to='/create-account' className="form-link create-account-link">Create Account</Link>
                    </div>
                </form>
            </div>
            <button className="logout" onClick={logoutUser}>Log out</button>
        </div>
    );
}
 
export default Login;