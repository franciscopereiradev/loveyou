import styles from '../../styles/Main.module.css'
import { supabase } from './supabaseClient'
import { useEffect, useState } from 'react'

export default function Months(){
    const [profiles, setProfiles] = useState([])
    const [profile, setProfile] = useState({day: '' ,month: '',year: ''})
    const {day, month, year } = profile

    useEffect(() =>{
        fetchProfiles()
    })
    
    async function fetchProfiles(){
        const user = supabase.auth.user()

        const { data } = await supabase
        .from('profiles')
        .select()
        .eq('id', user.id)
        setProfiles(data)

    }

    
    
    const coupleDay = profiles.map(couple => (couple.day))
    const coupleMonth = profiles.map(couple => (couple.month))  + ` `
    const coupleYear = parseInt(profiles.map(couple => (couple.year)))

    const today = new Date().getTime()
    const today_month = new Date().getUTCMonth()
    const today_year = new Date().getFullYear()
    console.log(today_year)
    
    
    
    
    const day_initial = coupleDay
    const month_initial = coupleMonth
    // console.log(month_initial)
    const year_initial = coupleYear
    const initial_month = new Date(`${month_initial} ${day_initial} ${year_initial}`).getUTCMonth()
    
    const date_initial = new Date(`${month_initial} ${day_initial} ${year_initial}`).getTime()

    const start_month = initial_month - initial_month

    
    // console.log(start_month)
    // const second = 1000;
    // const minute = second * 60;
    // const hour = minute * 60;
    // const dayy = hour * 24;
    // const months = dayy * 30;
    
    // const count_month = today - date_initial
    // const counter = Math.floor(count_month/months)
    // console.log(counter)

    let year_corrent = year_initial

    do{
        year_corrent += 1
    } while( year_corrent !== today_year)
    console.log(year_corrent)

    // let year_next = year_initial
    // const date_initial = month_initial + day_initial

    // const zero = new Date(`${date_initial}`).getTime()
    // const one = new Date(`January ${day_initial} ${year_corrent}`).getTime()
    // const oneM = new Date(`January ${day_initial} ${year_corrent}`).getUTCMonth()

    // const two = new Date(`February ${day_initial} ${year_corrent}`).getTime()
    // const twoM = new Date(`February ${day_initial} ${year_corrent}`).getUTCMonth()

    // const three = new Date(`March ${day_initial} ${year_corrent}`).getTime()
    // const threeM = new Date(`March ${day_initial} ${year_corrent}`).getUTCMonth()

    // const four = new Date(`April ${day_initial} ${year_corrent}`).getTime()
    // const fourM = new Date(`April ${day_initial} ${year_corrent}`).getUTCMonth()

    // const five = new Date(`May ${day_initial} ${year_corrent}`).getTime()
    // const fiveM = new Date(`May ${day_initial} ${year_corrent}`).getUTCMonth()

    // const six = new Date(`June ${day_initial} ${year_corrent}`).getTime()
    // const sixM = new Date(`June ${day_initial} ${year_corrent}`).getUTCMonth()

    // const seven = new Date(`July ${day_initial} ${year_corrent}`).getTime()
    // const sevenM = new Date(`July ${day_initial} ${year_corrent}`).getUTCMonth()
    
    // const height = new Date(`August ${day_initial} ${year_corrent}`).getTime()
    // const heightM = new Date(`August ${day_initial} ${year_corrent}`).getUTCMonth()

    // const nine = new Date(`September ${day_initial} ${year_corrent}`).getTime()
    // const nineM = new Date(`September ${day_initial} ${year_corrent}`).getUTCMonth()

    // const ten = new Date(`October ${day_initial} ${year_corrent}`).getTime()
    // const tenM = new Date(`October ${day_initial} ${year_corrent}`).getUTCMonth()

    // const eleven = new Date(`November ${day_initial} ${year_corrent}`).getTime()
    // const elevenM = new Date(`November ${day_initial} ${year_corrent}`).getUTCMonth()
    
    // const twelve = new Date(`December ${day_initial} ${year_corrent}`).getTime()
    // const twelveM = new Date(`December ${day_initial} ${year_corrent}`).getUTCMonth()
    // console.log(twelveM)

    // if(today_month == twelveM){
    //     return(
    //         <ul className={styles.list}>
    //             <li className={styles.month}>
    //                 <h2>meses de namoro</h2>
    //                 <p>{day_initial}/01/{year_corrent}</p>
    //             </li>
    //             <li className={styles.month}>
    //                 <h2></h2>
    //                 <p></p>
    //             </li>
    //             <li className={styles.month}>
    //                 <h2></h2>
    //                 <p></p>
    //             </li>
    //         </ul>
    //     )
    // }
    // console.log(one, two, three, four, five, six, seven, height, nine, ten, eleven, twelve)

    // return(
    //     <ul className={styles.list}>
    //         <li className={styles.month}>
    //             <h2></h2>
    //             <p></p>
    //         </li>
    //         <li className={styles.month}>
    //             <h2></h2>
    //             <p></p>
    //         </li>
    //         <li className={styles.month}>
    //             <h2></h2>
    //             <p></p>
    //         </li>
    //     </ul>
    // )
}