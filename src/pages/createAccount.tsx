import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, database, usersCollection } from '../firebase';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';

const CreateAccount = () => {
    const navigate = useNavigate();

    function signUpUser (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const signupForm = document.querySelectorAll('.sign-up-form input');
    
        const emailInput = signupForm[0] as HTMLInputElement;
        const usernameInput = signupForm[1] as HTMLInputElement;
        const passwordInput = signupForm[2] as HTMLInputElement;
        
        const email = emailInput.value;
        const userName = usernameInput.value;
        const password = passwordInput.value;
    
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            signupForm.forEach(input => {
                const inputval = input as HTMLInputElement;
                inputval.value = "";
            })
            const user: any = auth.currentUser;
            sendEmailVerification(user);

            const userDocument = doc(database, "users", user.uid);
            setDoc(userDocument, {
                username: userName
            })
            .then(() => {
                navigate("/");
            })
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
                    <input type="text" placeholder="Email" className="form-input"/>
                    <label htmlFor="">Enter Username</label>
                    <input type="text" placeholder="Username" className="form-input"/>
                    <label htmlFor="">Create Password</label>
                    <input type="password" placeholder="Password" className="form-input"/>

                    <button type="submit" className="form-submit">Sign up</button>
                </form>
            </div>
        </div>
    );
}
 
export default CreateAccount;