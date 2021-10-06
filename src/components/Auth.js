import axios from "axios"
import { useEffect, useState } from "react"
import Dashboard from "../pages/Dashboard"

export default function Auth(code) {
    const [accessToken, setAccessToken] = useState()
    // const [refreshToken, setRefreshToken] = useState()
    // const [expiresIn, setExpiresIn] = useState()


    useEffect(() => {
        axios
            .post("https://strivify.herokuapp.com/login", {
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
    {accessToken && <Dashboard token={accessToken} ></Dashboard>}
    </>)



}