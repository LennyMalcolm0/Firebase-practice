import './App.css'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth'
import CreateAccount from './pages/createAccount';
import Login from './pages/login';
import Home from './pages/home';
import AddPlayer from './pages/addPlayer';

function App() {
  const [userLoggedIn, setUserLoggedIn]= useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;
    setUserLoggedIn(true);

    onAuthStateChanged(auth, (user) => {
      setUserLoggedIn(true);
    });
    
  }, []);
  
  return (
    <div className="App ">
       <BrowserRouter>
            <Routes>
              {!userLoggedIn ?
                <Route path="/" element={<Navigate to={"/login"} />} /> :
                <Route path="/" element={<Home />} />
              }
              <Route path="/login" element={<Login />} />
              <Route path="/create-account" element={<CreateAccount />} />
              <Route path="/add-player" element={<AddPlayer />} />
            </Routes>
          </BrowserRouter>
    </div>
  );
}
export default App
