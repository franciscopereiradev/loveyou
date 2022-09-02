import styles from '../../styles/Main.module.css'
import stylesAlerts from '../../styles/Alerts.module.css'
import { BiMenuAltLeft, BiMessageSquare } from 'react-icons/bi'
import { supabase } from './supabaseClient'
import React, { useEffect, useState } from 'react'
import { GetCouples } from './GetCouples'
import Months from './Months'
import { useHref } from 'react-router-dom'

export default function Main({ session }){
    GetCouples()

    const [username, setUsername] = useState(null)
    const [username2, setUsername2] = useState(null)
//     const [p1, setP1] = useState(null)
//     const [p2, setP2] = useState(null)
//     const [p3, setP3] = useState(null)
//     const [p4, setP4] = useState(null)
//     const [p5, setP5] = useState(null)
//     const [p6, setP6] = useState(null)
//     const [p7, setP7] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getProfile();
    }, [session])
    
    async function getProfile(){
        try {
            // setLoading(true)
            const user = supabase.auth.user()
           
            let{ data, error, status } = await supabase
                .from('profiles')
                .select('username, username2')
//                         , p1, p2, p3, p4, p5, p6, p7')
                .eq('id', user.id)
                .single()
                
                if(error && status !== 406){
                    throw error;
                }
                if(data){
                    setUsername(data.username)
                    setUsername2(data.username2)
//                     setP1(data.p1)
//                     setP2(data.p2)
//                     setP3(data.p3)
//                     setP4(data.p4)
//                     setP5(data.p5)
//                     setP6(data.p6)
//                     setP7(data.p7)
                }
        } catch (error) {
            alert(error.message)
        } finally{
            // setLoading(false);
        }
    }
//     function updateNumberP1(){
//         if (p1 > 0){
//             let np1 = p1 -1
//             setP1(np1)
//         }
//         else{ throw error }
//     }
//     function updateNumberP2(){
//         if (p2 > 0){
//             let np2 = p2 -1
//             setP2(np2)
//         }
//         else{ throw error }
//     }
//     function updateNumberP3(){
//         if (p3 > 0){
//             let np3 = p3 -1
//             setP3(np3)
//         }
//         else{ throw error }
//     }
//     function updateNumberP4(){
//         if (p4 > 0){
//             let np4 = p4 -1
//             setP4(np4)
//         }
//         else{ throw error }
//     }
//     function updateNumberP5(){
//         if (p5 > 0){
//             let np5 = p5 -1
//             setP5(np5)
//         }
//         else{ throw error }
//     }
//     function updateNumberP6(){
//         if (p6 > 0){
//             let np6 = p6 -1
//             setP6(np6)
//         }
//         else{ throw error }
//     }
//     function updateNumberP7(){
//         if (p7 > 0){
//             let np7 = p7 -1
//             setP7(np7)
//         }
//         else{ throw error }
//     }
//     async function updateProfile({p1, p2, p3, p4, p5, p6, p7}){
//         try {
//             // setLoading(true)
//             const user = supabase.auth.user()
//             const updates = {
//                 id: user.id,p1,p2,p3,p4,p5,p6,p7,updated_at: new Date()
//             }
                
//             let {error} = await supabase.from('profiles').upsert(updates, {
//                 returning: 'minimal'
//             })
            
//             if(error){
//                 throw error
//             }
//             // function displayAlert(){
//             //     document.getElementById('alert').style.top= '150px'
//             //     document.getElementById('alert').style.trnasition= '1s'

//             //     setTimeout(function(){
//             //         document.getElementById('alert').style.top= '-150px'
//             //     }, 3000)
//             // } displayAlert() 
//             alert(`Sucess - coupons updated!`)
//         } catch (error) {
//             // function displayAlert(){
//             //     document.getElementById('error').style.top= '150px'
//             //     document.getElementById('error').style.trnasition= '1s'

//             //     setTimeout(function(){
//             //         document.getElementById('error').style.top= '-150px'
//             //     },3000)
//             // } displayAlert()
//             alert('Error - Something went wrong, try again!')

//         } finally{
//             // setLoading(false)
//         }
    }
    const sessionStorageUser = localStorage.getItem('userCorrent')
    let userCorrent
    if(sessionStorageUser === username || sessionStorageUser === username2){ userCorrent = sessionStorageUser}

// alert(p3-1)
    
    return(
        <div className='container'>
            <title>Love You - Home</title>
                <div className={styles.header}>
                    <div className={styles.top}>
                        <div className={styles.profile}>
                            <div className={styles.profilePhoto}>
                                {/* <a href='./account'>Account</a> */}
                            </div>
                            <a style={{color: '#fff'}}href='./account'><h1>Hi, {userCorrent}</h1></a>
                        </div>
                        <button className={styles.menu} onClick={() => supabase.auth.signOut()}>
                            <p>
                                {/* <BiMenuAltLeft /> */}
                                Leave
                            </p>
                        </button>
                    </div>
                    <GetCouples/>
                </div>
                <div id='alert' className={stylesAlerts.alert} >
                    <h2>Sucess</h2>
                    <p>Profile updated</p>
                </div>
                <div id='error' className={stylesAlerts.alert}>
                    <h2>Error</h2>
                    <p>Something went wrong, try again!</p>
                </div>
//                 <div className={styles.main}>
                {/* <Months/> */}
                {/* <div className={styles.folder}> */}
                    {/* <h2>Events</h2> */}
                    {/* <button></button> */}
                {/* </div> */}
                {/* <div className={styles.folder}> */}
                    {/* <h2>Goals</h2> */}
                    {/* <button></button> */}
                {/* </div> */}
                {/* <div className={styles.folder}> */}
                    {/* <h2>Gifts</h2> */}
                    {/* <button></button> */}
                {/* </div> */}
//                 <div className={styles.folder}>
//                     <h2>Prenda de 1 ano</h2>
//                     <div className={styles.prendaBox}>
//                         <div className={styles.prendaDiv}>
//                             <div>
//                                 <h2>Pedidos especiais</h2>
//                                 <p>restantes: {p1}</p>
//                             </div>
//                             <div>
//                             <button className={styles.prendaButton} onClick={() => updateNumberP1()}>
//                                 <p>Use</p>
//                             </button>
//                             </div>
//                         </div>
//                         <div className={styles.prendaDiv}>
//                             <div>
//                                 <h2>Massagens</h2>
//                                 <p>restantes: {p2}</p>
//                             </div>
//                             <div>
//                             <button className={styles.prendaButton} onClick={() => updateNumberP2()}>
//                                 <p>Use</p>
//                             </button>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={styles.prendaBox}>
//                         <div className={styles.prendaDiv}>
//                             <div>
//                                 <h2>Passeios</h2>
//                                 <p>restantes: {p3}</p>
//                             </div>
//                             <div>
//                             <button className={styles.prendaButton} onClick={() => updateNumberP3()}>
//                                 <p>Use</p>
//                             </button>
//                             </div>
//                         </div>
//                         <div className={styles.prendaDiv}>
//                             <div>
//                                 <h2>Idas ao Mc</h2>
//                                 <p>restantes: {p4}</p>
//                             </div>
//                             <div>
//                             <button className={styles.prendaButton} onClick={() => updateNumberP4()}>
//                                 <p>Use</p>
//                             </button>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={styles.prendaBox}>
//                         <div className={styles.prendaDiv}>
//                             <div>
//                                 <h2>Chocolates</h2>
//                                 <p>restantes: {p5}</p>
//                             </div>
//                             <div>
//                             <button className={styles.prendaButton} onClick={() => updateNumberP5()}>
//                                 <p>Use</p>
//                             </button>
//                             </div>
//                         </div>
//                         <div className={styles.prendaDiv}>
//                             <div>
//                                 <h2>Beijinhos</h2>
//                                 <p>restantes: {p6}</p>
//                             </div>
//                             <div>
//                             <button className={styles.prendaButton} onClick={() => updateNumberP6()}>
//                                 <p>Use</p>
//                             </button>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={styles.prendaDivBottom}>
//                         <div>
//                             <h2>Miminhos</h2>
//                             <p>restantes: {p7}</p>
//                         </div>
//                         <div>
//                             <button className={styles.prendaButton} onClick={() => updateNumberP7()}>
//                                 <p>Use</p>
//                             </button>
//                         </div>
//                     </div>
//                     <div className={styles.confirmButtonDiv}>
//                         <button className={styles.prendaConfirmButton} onClick={() => updateProfile({p1, p2, p3, p4, p5, p6, p7})}>
//                             <p>Save</p>
//                         </button>
//                     </div>
//                 </div>
//             </div>
        </div>
    )
}
