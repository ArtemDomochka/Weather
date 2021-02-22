import React from 'react'
import styles from "./WeatherBoard.module.css"
import MainBoard from './MainBoard'
import DaysBar from './DaysBar'

class WeatherBoard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoaded : false,
            isHourlyReady: false,
            isHourlyRequired : true,
            activeDay : 0,
            forecast : null,
        }
    }

    getPosition(options){
        return new Promise((resolve, reject) => 
            navigator.geolocation.getCurrentPosition(resolve, reject, options)
        );
    }

    async componentDidMount(){
        try{
            const position = await this.getPosition();
            const lat = position.coords.latitude; 
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=28fac3f57b86f68e027fe7277b3bf432`
            let response = await fetch(url)
            if(response.ok){
                const forecast = await response.json()
                this.setState({
                    forecast : forecast,
                    isLoaded : true, 
                })

                this.refactorHourlyForecast()

            }else{
                console.log(Error);
            }

        }catch(e){
            console.log(e);
        }
    }

    handleDayClick = dayIndex => {
        let isHourlyRequired
        if(dayIndex === 0 || dayIndex === 1 || dayIndex === 2){
            isHourlyRequired = true
        }else{
            isHourlyRequired = false
        }

        this.setState({
            activeDay:dayIndex,
            isHourlyRequired: isHourlyRequired
        })
    }

    refactorHourlyForecast = () => {
        const forecast = this.state.forecast
        const hourlyForecast = forecast.hourly

        const currentHour = new Date(hourlyForecast[0].dt * 1000).getHours()

        const today = []

        for(let i = 0; i < 24; i++){
            if(i < currentHour){
                today.push(null)
            }else{
                today.push(hourlyForecast[i - currentHour])
            }
        }

        const tomorrow = []

        for(let i = 0; i < 24; i++){
            tomorrow.push(hourlyForecast[24 - currentHour + i])
        }

        const afterDay = []

        for(let i = 0; i < 24; i++){
            if(i < 24 - (24 - currentHour)){
                afterDay.push(hourlyForecast[24 + 24 - currentHour + i])
            }else{
                afterDay.push(null)
            }
            
        }

        forecast.hourly = {
            today: today,
            tomorrow: tomorrow,
            afterDay: afterDay
        }

        this.setState({
            forecast: forecast,
            isHourlyReady : true
        })

    }

    render(){
        return(
            this.state.isLoaded
            ? <div className={styles.WeatherBoard}>
                <MainBoard
                    forecast={this.state.forecast}
                    activeDay={this.state.activeDay}
                    isHourlyReady={this.state.isHourlyReady}
                    isHourlyRequired={this.state.isHourlyRequired}
                />
                <DaysBar
                    days={this.state.forecast.daily}
                    onDayClick={this.handleDayClick}
                />
            </div> 
            : <div className={styles.LoadingScreen}>
                <p>Loading forecast...</p>
            </div>
        )
    }

}

export default WeatherBoard
