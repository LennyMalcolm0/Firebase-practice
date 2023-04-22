import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

const CreateAccount = () => {
    function signUpUser (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const signupForm = document.querySelectorAll('.sign-up-form input');
        // const linkTag = document.querySelector('a');
    
        const emailInput = signupForm[0] as HTMLInputElement;
        const passwordInput = signupForm[1] as HTMLInputElement;
        
        const email = emailInput.value;
        const password = passwordInput.value;
    
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            console.log(userCredentials)
            signupForm.forEach(input => {
                const inputval = input as HTMLInputElement;
                inputval.value = "";
            })
            document.querySelector('a')?.click();
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (  
        <div>
            <div className="form-container">
                <form className='sign-up-form' onSubmit={(e) => signUpUser(e)}>
                    <label htmlFor="">Enter Email</label>
                    <input type="text" placeholder="Email" className="form-input username-input"/>
                    <label htmlFor="">Create Password</label>
                    <input type="password" placeholder="Password" className="form-input password-input"/>

                    <button type="submit" className="form-submit">Sign up</button>
                    <Link to="/"></Link>
                </form>
            </div>
        </div>
    );
}
 
export default CreateAccount;