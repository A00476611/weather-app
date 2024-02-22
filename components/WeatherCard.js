import { useEffect, useState } from "react"
import { Card, Surface, Text } from "react-native-paper"
import { View } from "react-native"

export const WeatherCard = ({lat, long, city="Halifax"}) => {
    const [weather, setWeather] = useState()
    useEffect(()=>{
        // fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(2)}&longitude=${long.toFixed(2)}&current=temperature_120m,weathercode`).then(res=> res.json()).then(({current}) => 
        //     setWeather({temp: current.temperature_120m, code:current.weathercode})
        // )
        setWeather({temp:"-1", weathercode:"3"})
    },[lat,long])
    return (
        <Surface elevation={4}>            
            <Text variant="displayMedium">{city}</Text>
            <Text>{weather?weather.temp:""}</Text>
        </Surface>
    )
}