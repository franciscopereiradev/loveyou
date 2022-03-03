import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import styles from '../../styles/Main.module.css'
import stylesAlerts from '../../styles/Alerts.module.css'

export default function Account({ session }){
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [ username2, setUsername2 ] = useState(null)

    useEffect(() => {
        getProfile();
    }, [session])

    async function getProfile(){
        try {
            setLoading(true)
            const user = supabase.auth.user()

            let{ data, error, status } = await supabase
                .from('profiles')
                .select('username, username2')
                .eq('id', user.id)
                .single()
                
                if(error && status !== 406){
                    throw error;
                }
                if(data){
                    setUsername(data.username)
                    setUsername2(data.username2)
                
                }
        } catch (error) {
            alert(error.message)
        } finally{
            setLoading(false);
        }
    }

    async function updateProfile({username, username2}){
        try {
            setLoading(true)
            const user = supabase.auth.user()
            const updates = {
                id: user.id,username,username2,updated_at: new Date()
            }

            let {error} = await supabase.from('profiles').upsert(updates, {
                returning: 'minimal'
            })

            const chooseUser = document.getElementById('chooseUser')

            if(chooseUser.value == 'username'){
                sessionStorage.setItem('userCorrent', username)
            } else if(chooseUser.value == 'username2'){
                sessionStorage.setItem('userCorrent', username2)
            } else{
                // function displayAlert(){
                //     document.getElementById('error').style.top= '10px'
    
                //     setTimeout(function(){
                //         document.getElementById('error').style.top= '-150px'
                //     },3000)
                // } displayAlert()
            }

            if(error) {
                throw error
            }
            // function displayAlert(){
            //     document.getElementById('alert').style.top= '10px'

            //     setTimeout(function(){
            //         document.getElementById('alert').style.top= '-150px'
            //     }, 3000)
            // } displayAlert() 
            alert(`Sucess - Profile updated`)
        } catch (error) {
            // function displayAlert(){
            //     document.getElementById('error').style.top= '10px'

            //     setTimeout(function(){
            //         document.getElementById('error').style.top= '-150px'
            //     },3000)
            // } displayAlert()
            alert(`Error - Something went wrong, try again!`)
        } finally{
            setLoading(false)
        }
    }
    
    return(
        <div className={styles.footer}>
             {/* <div id='alert' className={stylesAlerts.alert} >
                    <h2>Sucess</h2>
                    <p>Profile updated</p>
            </div>
            <div id='error' className={stylesAlerts.alert}>
                <h2>Error</h2>
                <p>Something went wrong, try again!</p>
            </div> */}
                <input typeof='text' value={username || ''}  onChange={(e, any) => setUsername(e.target.value)}  placeholder={username || 'username'}/>
                <input typeof='text' value={username2 || ''}  onChange={(e, any) => setUsername2(e.target.value)}  placeholder={username2 || 'username2'}/>
                <p>Who are you?</p>
                <select id='chooseUser' placeholder='Who are you?'>
                    <option id='uNone' value='userNone'>---</option> 
                    <option id='u1' value='username'>{username}</option>
                    <option id='u2' value='username2'>{username2}</option>
                </select>
                <button className={styles.month} onClick={() => updateProfile({ username, username2 })}/>
        </div>
    )
}