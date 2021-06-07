import { useState, useEffect } from "react"
import axios from "axios"
import Mainpage from "./Mainpage"

export default function Auth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()


    useEffect(() => {
        axios
            .post("http://localhost:3001/login", {
                code,
            })
            .then(res => {
                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)
                setExpiresIn(res.data.expiresIn)
                window.history.pushState({}, null, "/")
            })
            .catch(() => {
                window.location = "/"
            }).catch(() => {
                window.location = "/"
            })
    }, [code])



    return (<>
    <div>{accessToken}</div>
    {accessToken && <Mainpage token={accessToken} ></Mainpage>}
    </>)



}