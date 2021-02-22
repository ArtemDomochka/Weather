import React from 'react'
import styles from './DaysBar.module.css'


const DaysBar = props => {

    return(
        <div  className={styles.DaysBar}>
            {props.days.map((day, index) => {
                return(
                    <div
                        key={day.dt}
                        className={styles.Day}
                        onClick={() => props.onDayClick(index)}
                    >
                        <div>
                            {index === 0 ? <span><b>Today<br/></b></span> : null}
                            {index === 1 ? <span><b>Tomorrow<br/></b></span> : null}
                            {index === 2 ? <span><b>After Day<br/></b></span> : null}
                            <span >{new Date(day.dt * 1000).toDateString()}</span>
                            <br/>
                            <div>{day.temp.min.toFixed(0)} to {day.temp.max.toFixed(0)}C</div>
                        </div>    
                    </div>
                )
            })}

        </div>
        
    )
}

export default DaysBar