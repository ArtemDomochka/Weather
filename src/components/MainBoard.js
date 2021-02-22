import React from 'react'
import styles from './MainBoard.module.css'
import HoursBar from './HoursBar'

const MainBoard = props => {
    let forecast = props.forecast.daily[props.activeDay]

    return(
        <div className={styles.MainBoard}>
            <div className={styles.Forecast}>  
                {props.activeDay === 0 ? <h1>Today</h1> : null}
                {props.activeDay === 1 ? <h1>Tomorrow</h1> : null}
                {props.activeDay === 2 ? <h1>After Day</h1> : null}
                <h1>{new Date(forecast.dt * 1000).toDateString()}</h1>
                <h1>{forecast.temp.min.toFixed(0)} to {forecast.temp.max.toFixed(0)}C</h1> 
            </div>
            
            {
                props.isHourlyReady && props.isHourlyRequired
                ? 
                <HoursBar
                forecast={props.forecast}
                activeDay={props.activeDay}
                />
                : <div></div>
            }           

        </div>
    )
}

export default MainBoard