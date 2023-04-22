import './App.css'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { 
  collection, addDoc, deleteDoc, doc , onSnapshot, query, where, orderBy, serverTimestamp, updateDoc
} from "@firebase/firestore";
import { database } from "./firebase";
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import CreateAccount from './pages/createAccount';
import Login from './pages/login';
import Home from './pages/home';

function App() {
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
  
  const [validUser, setvalidUser]= useState(false);

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
  function logoutUser () {
    signOut(auth)
      .then(() => {
        console.log("User signed out")
      })
      .catch(err => {
        console.log(err)
      })
  }

  const [userLoggedIn, setUserLoggedIn]= useState(false);
  onAuthStateChanged(auth, (user) => {
    if (!user) return;
    
    setUserLoggedIn(true);
  })
  
  return (
    <div className="App">
       <BrowserRouter>
            <Routes>
              {/* {!userLoggedIn ? <Route path="/" element={<Navigate to="/login" />} /> : <></>} */}
              <Route path="/" element={!userLoggedIn ? <Navigate to="/login" /> : <Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create-account" element={<CreateAccount />} />
            </Routes>
          </BrowserRouter>
    </div>
  );
}
export default App
