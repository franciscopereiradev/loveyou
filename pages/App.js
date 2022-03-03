// import { ChakraProvider } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { supabase } from "../source/utils/supabaseClient"
import Home from "./home"
import Register from "./register"

export default function Main(){
    const [session, setSession] = useState(null)

    useEffect(() => {

    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
    })
    }, [])

    return (
        !session ? <Register /> : <Home key={session.user.id} session={session} />)
}