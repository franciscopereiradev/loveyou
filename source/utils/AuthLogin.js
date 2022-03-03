import styles from '../../styles/Login.module.css'
import stylesTitleBar from '../../styles/TitleBar.module.css'
import stylesAlerts from '../../styles/Alerts.module.css'
import { HiArrowLeft } from 'react-icons/hi'
import React, { useState } from 'react';
import { supabase } from './supabaseClient';
// import { Auth,  login } from '../source/utils/Auth'

export default function AuthLogin(){
    const[loading, setLoading] = useState(false)
    const[email, setEmail] = useState('')
    const[ password, setPassword] = useState('')
    
    async function login(email, password){
        try {
            const {error} = await supabase.auth.signIn({email, password})
            if(error) throw error
            function displayAlert(){
                document.getElementById('alert').style.top= '10px'
                
                setTimeout(function(){
                    document.getElementById('alert').style.top= '-150px'
                }, 3000)
            } displayAlert() 
            window.location.href = './'
        } catch (error) {
            function displayAlert(){
                document.getElementById('error').style.top= '10px'
                
                setTimeout(function(){
                    document.getElementById('error').style.top= '-150px'
                },3000)
            } displayAlert()
        }finally{
            setLoading(false);
        }
    }
    return(
        <div className='container'>
            <div id='alert' className={stylesAlerts.alert} >
                    <h2>Sucess</h2>
                    <p>Logged in</p>
            </div>
            <div id='error' className={stylesAlerts.alert}>
                <h2>Error</h2>
                <p>Something went wrong, try again!</p>
            </div>
            <title>Love You - Login</title>
            <div className={styles.header}>
                <div className={stylesTitleBar.title}>
                {/* <p><a href='./'><HiArrowLeft /></a></p> */}
                    <h1>Login</h1>
                </div>
                <div className={stylesTitleBar.titleBar1}></div>
                <div className={stylesTitleBar.titleBar2}></div>
            </div>
            <div className={styles.main}>
                <h2>Email</h2>
                <input placeholder='Email' typeof='email' value={email} onChange={e => setEmail(e.target.value)}></input>
                <h2>Password</h2>
                <input id='password' placeholder='Password' type='password' value={password} onChange={e => setPassword(e.target.value)}></input>
                <button className={styles.button} onClick={e => {e.preventDefault(); login(email, password)}}>
                    <h1>Enter</h1>
                </button>
                <div className={styles.footer}>
                    <a href='./register'>
                        Not have an account yet?
                    </a>
                </div>
            </div>
        </div>
    )
}