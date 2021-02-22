import React from 'react'
import styles from './HoursBar.module.css'

const HoursBar = props => {

    let forecast = []

    if(props.activeDay === 0){
        forecast=props.forecast.hourly.today
    }else if(props.activeDay === 1){
        forecast=props.forecast.hourly.tomorrow
    }else if(props.activeDay === 2){
        forecast=props.forecast.hourly.afterDay
    }else{
        forecast=null
    }

    const dayCells = []
    const nightCells = []

        for(let i = 0; i < 12; i++){
            dayCells.push(
                <td
                    key={i}
                    className={styles.Hour}
                >
                    {
                        forecast[i]
                        ? <div>
                            {i}:00
                            <br/>
                            {forecast[i].temp.toFixed(0)} C
                        </div> 
                        : <div>
                            {i}:00
                        </div>
                    }
                </td>
            )
        }

        for(let i = 12; i < 24; i++){
            nightCells.push(
                <td
                    key={i}
                    className={styles.Hour}
                >
                    {
                        forecast[i]
                        ? <div>
                            {i}:00
                            <br/>
                            {forecast[i].temp.toFixed(0)} C
                          </div>
                        : <div>
                            {i}:00
                          </div> 
                        
                    }
                </td>
            )
        }




    return(
        <div className={styles.HoursBar}>
            <table className={styles.Table}>
                <tbody>
                <tr>
                    {dayCells}
                </tr>
                <tr>
                    {nightCells}
                </tr>
                </tbody>
            </table>
        </div>
        
        
    )
    
}

export default HoursBar