import { useNavigate } from 'react-router-dom';
import { typing } from '../components/generalFunctions';
import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const ForgotPassword = () => {
    const [validEmail, setvalidEmail]= useState(true);
    const navigate = useNavigate();

    const resetPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userEmail = document.querySelector("input") as HTMLInputElement;
        const email = userEmail.value;

        sendPasswordResetEmail(auth, email)
        .then(() => {
            navigate("/login");
        })
        .catch(err => {
            const errorMessage = err.message;
            if (errorMessage === "Firebase: Error (auth/invalid-email).") {
                userEmail.style.borderColor = "red";
                setvalidEmail(false)
            }
        })
    }

    return (  
        <div>
            <div className="form-container">
                <form className='login-form' onSubmit={(e) => resetPassword(e)}>
                    <label>Enter Email</label>
                    <input type="text" onInput={typing} placeholder="Email" className="form-input username-input"/>
                    {!validEmail && <div className="invalid-credentials">Enter a valid email address</div>}

                    <button type="submit" className="form-submit mt-[30px] ">Done</button>
                </form>
            </div>
        </div>
    );
}
 
export default ForgotPassword;