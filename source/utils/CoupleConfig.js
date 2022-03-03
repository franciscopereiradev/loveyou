import styles from '../../styles/Connect.module.css'
import stylesTitleBar from '../../styles/TitleBar.module.css'
import stylesAlerts from '../../styles/Alerts.module.css'
import { HiArrowLeft } from 'react-icons/hi'
import React, { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
// import { useHistory } from 'react-router-dom'

export default function CoupleConfig({session}){
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [username, setUsername] = useState(null)
    const [ username2, setUsername2 ] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getProfile();
    }, [session])

    async function getProfile(){
        try {
            setLoading(true)
            const user = supabase.auth.user()

            let{ data, error, status } = await supabase
                .from('profiles')
                .select('username, username2, day, month, year')
                .eq('id', user.id)
                .single()
                
                if(error && status !== 406){
                    throw error;
                }
                if(data){
                    setUsername(data.username)
                    setUsername2(data.username2)
                    setDay(data.day)
                    setMonth(data.month)
                    setYear(data.year)
                
                }
        } catch (error) {
            alert(error.message)
        } finally{
            setLoading(false);
        }
    }
    async function createCouple({username, username2, day, month, year}){
        try {
            setLoading(true)
            const user = supabase.auth.user()
            const updates = {
                id: user.id,username,username2,day,month,year,updated_at: new Date()
            }
            let {error} = await supabase.from('profiles').upsert(updates, {
                returning: 'minimal'
            })
            const chooseUser = document.getElementById('chooseUser')

            if(chooseUser.value == 'username'){
                localStorage.setItem('userCorrent', username)
            } else if(chooseUser.value == 'username2'){
                localStorage.setItem('userCorrent', username2)
            } else {
                function displayAlert(){
                    document.getElementById('errorWhoAreYou').style.top= '10px'
    
                    setTimeout(function(){
                        document.getElementById('errorWhoAreYou').style.top= '-150px'
                    },3000)
                } displayAlert()
                
            }
            if(error) throw error
            function displayAlert(){
                document.getElementById('alert').style.top= '10px'
                
                setTimeout(function(){
                    document.getElementById('alert').style.top= '-150px'
                }, 3000)
            } displayAlert()
            // window.location.href = './'

        } catch (error) {
            function displayAlert(){
                document.getElementById('error').style.top= '10px'
                
                setTimeout(function(){
                    document.getElementById('error').style.top= '-150px'
                },3000)
            } displayAlert()
        } finally{
            setLoading(false)
        }
    }
    return(
        <div className='container'>
            <div id='alert' className={stylesAlerts.alert} >
                    <h2>Sucess</h2>
                    <p>Your data was been updated</p>
            </div>
            <div id='error' className={stylesAlerts.alert}>
                <h2>Error</h2>
                <p>Something went wrong, try again!</p>
            </div>
            <div id='errorWhoAreYou' className={stylesAlerts.alert}>
                <h2>Error</h2>
                <p>Pick who are using the app on this device!</p>
            </div>
            <title>Love You - Connect</title>
            <div className={styles.header}>
                <div className={stylesTitleBar.title}>
                    <p><a href='./'><HiArrowLeft /></a></p>
                    <h1>Account</h1>
                </div>
                <div className={stylesTitleBar.titleBar1}></div>
                <div className={stylesTitleBar.titleBar2}></div>
            </div>
            <div className={styles.main}>
                <div className={styles.dateInput}>
                    <h2>Couple information</h2>
                    <p>Name:</p>
                    <input placeholder='Name' typeof='text' value={username}  onChange={(e, any) => setUsername(e.target.value)}/>
                    <p>Partner Name:</p>
                    <input placeholder='Partner name'typeof='text' value={username2}  onChange={(e, any) => setUsername2(e.target.value)}/>
                    <p>Who are you?</p>
                    <select id='chooseUser' className={styles.selectUser}>
                        <option id='uNone' value='userNone' className={styles.optionUser}>---</option> 
                        <option id='u1' value='username' className={styles.optionUser}>{username}</option>
                        <option id='u2' value='username2' className={styles.optionUser}>{username2}</option>
                    </select>
                    <h2>Relationship date</h2>
                    <p>Day:</p>
                    <input placeholder={day || '01'}value={day} onChange={(e, any) => setDay(e.target.value)}></input>
                    <p>Month:</p>
                    <input placeholder={month || 'January'} value={month} onChange={(e, any) => setMonth(e.target.value)}></input>
                    <p>Year:</p>
                    <input placeholder={year || '2022'} value={year} onChange={(e, any) => setYear(e.target.value)}></input>
                    </div>
                <button className={styles.button} onClick={() => createCouple({username, username2, day, month, year})}>
                    <h1>Save</h1>
                </button>
            </div>
            {/* <div className={styles.footer}>
                <p>
                   Share your code with your partner!
                </p>
            </div> */}
        </div>
    )
}