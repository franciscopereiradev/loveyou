import { supabase } from './supabaseClient'
import { useEffect, useState } from 'react'
import styles from '../../styles/Main.module.css'

export function GetCouples(){

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const dayy = hour * 24;

    const today = new Date().getTime();
    const today_year = new Date().getFullYear()
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

    const day_initial = coupleDay
    const month_initial = coupleMonth
    const year_initial = coupleYear

    const date_initial = month_initial + day_initial
    let year_next = year_initial
    do{
        year_next += 1
    } while (year_next < today_year)

    const date_ini = new Date(`${date_initial}, ${year_initial}`).getTime();

    function countDays(){
        const time = today - date_ini;
        const timeInDays = Math.floor(time/dayy)
        return(timeInDays + 1)
    }
    countDays()
    
    function daysTo(){
        const date = new Date(`${date_initial}, ${year_next}`).getTime();
        const time3 = date - today
        const timeInDays2 = Math.floor(time3/dayy)
        return(timeInDays2)
    }
    daysTo()
    function howManyYears(){

        const howManyYears = year_next - year_initial

        return(`${howManyYears} years`)
    }
    howManyYears()

    function progress(){

        const date = new Date(`${date_initial}, ${year_next}`).getTime();

        const days = date - today
        const time = Math.floor(days/dayy)
        const percent = Math.floor(time/365*100)
        const progress = 100 - percent

        return(progress)
    }
    progress()
    
    return(
        <div className={styles.days}>
                    <h1> {countDays()} days together</h1>
                    <p>we have {daysTo()} days left to make {howManyYears()} together</p>
                    <div className={styles.mainProgressBar}>
                        <div className={styles.progressBar}>
                            <div className={styles.correntProgress} style={{width: `${progress()}%`}}>

                            </div>
                        </div>
                        <p>{`${progress()}%`}</p>
                    </div>
                </div>
    )
}
    