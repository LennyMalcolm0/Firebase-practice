import './App.css'
import { useState, useRef, useEffect } from 'react'
import { 
  collection, addDoc, deleteDoc, doc , onSnapshot, query, where, orderBy, serverTimestamp, updateDoc
} from "@firebase/firestore";
import { database } from "./firebase";
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

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

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {

  //   }
  // })
  
  return (
    <div className="App">
      {/* <div className="player-forms">
        <div className="add-player">
          <div className='player-info'>
              <label htmlFor="">Player Name</label>
              <input type= "text" name="name" />
          </div>
          <div className='player-info'>
              <label htmlFor="">Player Age</label>
              <input type= "text" name="age" />
          </div>
          <div className='player-info'>
              <label htmlFor="">Relationship Satus</label>
              <input type= "text" name="married" />
          </div>
          <div className='player-info'>
              <label htmlFor="">Player Club</label>
              <input type= "text" name="club" />
          </div>
        
          <button onClick={addPlayer}>Save</button>
        </div>  

        <div className="delete-player">
          <div className='player-info'>
              <label htmlFor="">Delete Player</label>
              <input type= "text" name="delete" placeholder="Enter Player ID" />
          </div>
        
          <button onClick={deletePlayer}>Delete</button>
        </div>

        <div className="update-player">
          <div className='player-info'>
              <label htmlFor="">Update Player</label>
              <input type= "text" name="delete" />
          </div>
        
          <button onClick={updatePlayer}>Update</button>
        </div>
      </div>

      <div className="user">
        <div className="sign-up">
          <label htmlFor="">Enter Email</label>
          <input type= "text" name="email" />
          <label htmlFor="">Enter Password</label>
          <input type= "password" name="email" />
          <button onClick={signUpUser}>Sign Up</button>
        </div>

        <div className="login">
          <label htmlFor="">Enter Email</label>
          <input type= "text" name="email" />
          <label htmlFor="">Enter Password</label>
          <input type= "password" name="email" />
          {validUser ? <div className="empty-input">Enter Login Details</div> : <></>}
          <button onClick={signInUser}>Log In</button>
        </div>
        
        <button onClick={logoutUser}>Log Out</button>
      </div> */}

      <div className="form-container">
        <form className='login-form'>
          <label htmlFor="">Enter Email</label>
          <input type="text" placeholder="Email" className="form-input username-input"/>
          <label htmlFor="">Enter Password</label>
          <input type="password" placeholder="Password" className="form-input password-input"/>

          {validUser ? <div className="empty-input">Enter Login Details</div> : <></>}

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
export default App
