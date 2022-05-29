import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import styles from '../../styles/Register.module.css'
import stylesTitleBar from '../../styles/TitleBar.module.css'
import stylesAlerts from '../../styles/Alerts.module.css'

export default function Auth(){
    const[loading, setLoading] = useState(false)
    const[email, setEmail] = useState('')
    const[ password, setPassword] = useState('')
    
    // async function login(email, password){
    //     try {
    //         const {error} = await supabase.auth.signUp({email, password})
    //         if(error) throw error
    //         function displayAlert(){
    //             document.getElementById('alert').style.top= '10px'
                
    //             setTimeout(function(){
    //                 document.getElementById('alert').style.top= '-150px'
    //             }, 3000)
    //         } displayAlert() 
    //     } catch (error) {
    //         function displayAlert(){
    //             document.getElementById('error').style.top= '10px'
                
    //             setTimeout(function(){
    //                 document.getElementById('error').style.top= '-150px'
    //             },3000)
    //         } displayAlert()
    //     }finally{
    //         setLoading(false);
    //     }
    // }

    const signUp = async (email, password) =>{
        
        let passwordInput = document.getElementById('password')
        let passwordInputLenght = passwordInput.value
        let repeatPasswordInput = document.getElementById('repeatPassword')
        if(passwordInput.value == repeatPasswordInput.value && passwordInputLenght.length >= 6){

            try {
                const {error} = await supabase.auth.signUp({email, password})
                if(error) throw error
                function displayAlert(){
                document.getElementById('alert').style.top= '10px'
                
                setTimeout(function(){
                    document.getElementById('alert').style.top= '-150px'
                }, 3000)
            } displayAlert() 
        } catch (error) {
            function displayAlert(){
                document.getElementById('error').style.top= '10px'
                
                setTimeout(function(){
                    document.getElementById('error').style.top= '-150px'
                },3000)
            } displayAlert()
        } finally{
            setLoading(false);
        }
        } else {
            function displayAlert(){
                document.getElementById('passwordNotMatch').style.top= '10px'
                
                setTimeout(function(){
                    document.getElementById('passwordNotMatch').style.top= '-150px'
                },3000)
            } displayAlert()
        }
    }

    return(
        <div className='container'>
            <div id='alert' className={stylesAlerts.alert} >
                    <h2>Sucess</h2>
                    <p>Your account has been created!</p>
            </div>
            <div id='error' className={stylesAlerts.alert}>
                <h2>Error</h2>
                <p>Something went wrong, try again!</p>
            </div>
            <div id='passwordNotMatch' className={stylesAlerts.alert}>
                <h2>Error</h2>
                <p>Password not match or your password its to short (min 6), try again!</p>
            </div>
            <title>Love You - Sign-Up</title>
            <div className={styles.header}>
                <div className={stylesTitleBar.title}>
                    <h1>Sign-Up</h1>
                </div>
                <div className={stylesTitleBar.titleBar1}></div>
                <div className={stylesTitleBar.titleBar2}></div>
            </div>
            <div className={styles.main}>
                <div className={styles.formBox}>
                    <h2>Email</h2>
                    <input placeholder='Email' typeof='email' value={email} onChange={e => setEmail(e.target.value)}></input>
                    <h2>Password</h2>
                    <input id='password' placeholder='Password' type='password' value={password} onChange={e => setPassword(e.target.value)}></input>
                    <h2>Repeat password</h2>
                    <input id='repeatPassword' placeholder='Password' type='password'></input>
                </div>
                <button className={styles.button} onClick={e => {e.preventDefault(); signUp(email, password)}}>
                    <h1>Register</h1>
                </button>
                <div className={styles.footer}>
                    <a href='./login'> 
                        Already have an account?
                    </a>
                </div>
            </div>


        </div>
    )
}