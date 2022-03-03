import { useState, useEffect } from "react"
import { supabase } from "../source/utils/supabaseClient"
import Main from '../source/utils/Main'
import Register from "./register"


export default function Home(){
    const [session, setSession] = useState(null)

    useEffect(() => {

    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
    })
    }, [])
    
    return(
        !session ? <a href='./'>You must be logged in to access this page</a> : <Main key={session.user.id} session={session} />)
}