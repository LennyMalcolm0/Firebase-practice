import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { auth } from './firebase';
import CreateAccount from './pages/createAccount';
import Login from './pages/login';
import Home from './pages/home';
import AddPlayer from './pages/addPlayer';
import ForgotPassword from './pages/forgotPassword';
import { createBrowserHistory } from 'history';

function App() {
  const [userLoggedIn, setUserLoggedIn]= useState<boolean>();
  const history = createBrowserHistory();

  !auth.currentUser ? history.push("/login") : setUserLoggedIn(true);
  
  return (
    <div className="App ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/add-player" element={<AddPlayer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App
