import { useState, useRef, useEffect } from 'react'
import { 
  collection, addDoc, deleteDoc, doc , onSnapshot, query, where, orderBy, serverTimestamp, updateDoc
} from "@firebase/firestore";
import { database } from '../firebase'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

const Home = () => {
    // interface player{
    //   age: number
    //   club: string
    //   createdAt: string
    //   id: string
    //   married: boolean
    //   name: string
    // }

    const playersInfo: Object[] = [];
    const [loadedPlayersInfo, setLoadedPlayersInfo]= useState(false);

    const collectionReference = collection(database, 'Players');
    const marriedPlayers = query(collectionReference, orderBy("createdAt"))

    useEffect(() => {
        onSnapshot(marriedPlayers, (snapshot) => {
            snapshot.forEach(document => {
                playersInfo.push({ ...document.data(), id: document.id })
                setLoadedPlayersInfo(true);
                // console.log(playersInfo)
            })
        })
    }, [])

    function addPlayer() {
        const inputsData = document.querySelectorAll('input');

        addDoc(collectionReference, {
            name: inputsData[0].value.toString(),
            age: Number(inputsData[1].value),
            married: inputsData[2].value.toLowerCase() === "single" ? false : true,
            club: inputsData[3].value.toString(),
            createdAt: serverTimestamp()
        })
        .then(() => {
            inputsData.forEach(inputData => {
            inputData.value = ""
            })
        })
    }

    function deletePlayer() {
        const playerID = document.querySelector('.delete-player input') as HTMLInputElement;

        const docReference = doc(database, 'Players', playerID.value);
        deleteDoc(docReference)
        .then(() => {
            playerID.value = "";
        })
    }

    function updatePlayer() {
        const playerID = document.querySelector('.update-player input') as HTMLInputElement;

        const docReference = doc(database, 'Players', playerID.value);
        updateDoc(docReference, {
            age: 25
        })
        .then((doc) => {
            playerID.value = "";
        })
    }

    function signUpUser () {
        const signupForm = document.querySelectorAll('.sign-up input');

        const emailInput = signupForm[0] as HTMLInputElement;
        const passwordInput = signupForm[1] as HTMLInputElement;
        
        const email = emailInput.value;
        const password = passwordInput.value;

        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            console.log(userCredentials)
            signupForm.forEach(input => {
            const inputval = input as HTMLInputElement;
            inputval.value = ""
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    function logoutUser () {
        signOut(auth)
        .then(() => {
            console.log("User signed out")
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (  
        <div>
            <h1>HOME PAGE</h1>
        </div>
    );
}
 
export default Home;