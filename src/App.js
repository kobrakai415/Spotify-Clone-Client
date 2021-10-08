import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Component } from "react"
import Login from './components/Login.jsx';
import Auth from "./components/Auth.js"
import Dashboard from './pages/Dashboard';
import { Container } from 'react-bootstrap';

const clientId = process.env.REACT_APP_CLIENT_ID
const clientSecret = process.env.REACT_APP_CLIENT_SECRET

function App() {

  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {

    handleLogin()
    return () => {
      localStorage.clear()
    }

  }, [])

  const handleLogin = async () => {
    try {
      const str = clientId + ":" + clientSecret
      const buff = Buffer.from(str, 'utf-8');
      const base64 = buff.toString('base64');

      const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + base64
        },
        body: "grant_type=client_credentials"
      })

      if (res.status === 200) {
        const json = await res.json()
        console.log(json)

        localStorage.setItem("accessToken", json.access_token)
        setAccessToken(json.access_token)
      }
      console.log(res)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      {accessToken ? <Dashboard token={accessToken} /> : null}

    </div>
  );

}

export default App;

