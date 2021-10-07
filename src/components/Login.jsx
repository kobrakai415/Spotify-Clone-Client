import React, { useEffect } from "react"
import { Container } from "react-bootstrap"

const clientId = process.env.REACT_APP_CLIENT_ID
const clientSecret = process.env.REACT_APP_CLIENT_SECRET

const AUTH_URL =
  `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

export default function Login() {

  const handleLogin = async () => {
    try {
      const str = clientId + ":" + clientSecret
      const buff = Buffer.from(str, 'utf-8');
      const base64 = buff.toString('base64');
      console.log(buff)
      const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + base64
        },
        body: "grant_type=client_credentials"
      })

      if(res.status === 200) {
        localStorage.setItem("accessToken", res.accessToken)
      }
      console.log(res)

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <button className="btn btn-success btn-lg" onClick={handleLogin} >
        Enter a world of Music!
      </button>
    </Container>
  )
}