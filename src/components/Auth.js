import axios from "axios"
import { useEffect, useState } from "react"
import Home from "./Home"

export default function Auth(code) {
    const [accessToken, setAccessToken] = useState()
    // const [refreshToken, setRefreshToken] = useState()
    // const [expiresIn, setExpiresIn] = useState()


    useEffect(() => {
        axios
            .post("http://localhost:3001/login", {
                code,
            })
            .then(res => {
                setAccessToken(res.data.accessToken)
                // setRefreshToken(res.data.refreshToken)
                // setExpiresIn(res.data.expiresIn)
                window.history.pushState({}, null, "/")
            })
            .catch(() => {
                window.location = "/"
            })
    }, [code])


    
    return (<>
    {accessToken && <Home token={accessToken} ></Home>}
    </>)



}