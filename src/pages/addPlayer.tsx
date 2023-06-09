import { useNavigate } from 'react-router-dom';
import { typing } from '../components/generalFunctions';
import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore';
import { auth, database } from '../firebase';
import React from 'react';

const AddPlayer = () => {
    const navigate = useNavigate();

    function addPlayer(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const addPlayerForm= document.querySelector('.add-player-form') as HTMLElement;
        addPlayerForm.classList.add("animate-pulse");

        const inputsData: NodeListOf<HTMLInputElement> = document.querySelectorAll('.add-player-form input');

        const user: any = auth.currentUser,
        userDocument = doc(database, "users", user.uid),
        userDocumentCollection = collection(userDocument, "user-team");
        
        addDoc(userDocumentCollection, {
            name: inputsData[0].value.toString(),
            age: Number(inputsData[1].value),
            club: inputsData[2].value.toString(),
            position: inputsData[3].value.toString(),
            createdAt: serverTimestamp()
        })
        .then(() => {
            inputsData.forEach(inputData => {
                inputData.value = "";
            });

            addPlayerForm.classList.remove("animate-pulse");

            navigate("/");
        })
        .catch(err => {
            addPlayerForm.classList.remove("animate-pulse");
        })
    }

    return (  
        <div>
            <div className="form-container">
                <form className='add-player-form' onSubmit={(e) => addPlayer(e)}>
                    <label>Player Name</label>
                    <input type="text" onInput={typing} placeholder="Name" className="form-input username-input"/>

                    <label>Player Age</label>
                    <input type="number" onInput={typing} placeholder="Age" className="form-input password-input"/>

                    <label>Player Club</label>
                    <input type="text" onInput={typing} placeholder="Club" className="form-input password-input"/>

                    <label>Player Position</label>
                    <input type="text" onInput={typing} placeholder="Position" className="form-input password-input"/>

                    <button type="submit" className="form-submit mt-[20px] ">Done</button>
                </form>
            </div>
        </div>
    );
}
 
export default AddPlayer;