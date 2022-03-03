import { useState, useEffect } from "react"
import { supabase } from "../source/utils/supabaseClient"
import CoupleConfig from '../source/utils/CoupleConfig'
import Register from "./register"


export default function Account(){
    const [session, setSession] = useState(null)

    useEffect(() => {

    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
    })
    }, [])

    return(
        !session ? <a href='./'>You must be logged in to access this page</a> : <CoupleConfig key={session.user.id} session={session} />)
}