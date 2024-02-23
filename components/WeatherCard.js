import { useEffect, useState } from "react"
import { Card, Icon, Surface, Text } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import weathercodes from "../utils/WeatherCodes.json"


const sunny = {
    text:"#c7a94a",
    icon:"#ffc100",
    bg:"#ffe799",
    gradient:['#ffefbe', '#ffe799']
}

export const WeatherCard = ({lat, long, city, country, weatherData, large = false, style = {}}) => {
    const [weather, setWeather] = useState({temp:-1, code:0})
    const [colorScheme, setColorScheme] = useState(sunny)
    useEffect(()=>{
        if(weatherData) setWeather(weatherData)
        else
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(2)}&longitude=${long.toFixed(2)}&current=temperature_120m,weathercode`).then(res=> res.json()).then(({current}) => 
                setWeather({temp: current.temperature_120m, code:current.weathercode})
            )
    },[lat,long])
    return (
        <Surface style={{borderRadius:0, width:"100%", overflow:"hidden", ...style}} mode="flat" >
            <LinearGradient colors={colorScheme.gradient} start={[0, 0]} end={[1, 1]} location={[0.25, 0.4, 1]} style={{padding:20, height:"100%", display:"flex", justifyContent:"center"}}>
                <View style= {{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"start"}}>
                    <Icon source="weather-sunny" color={colorScheme.icon} size={100}/>
                    <View style= {{display:"flex", alignItems:"flex-end"}}>
                        <Text variant="titleLarge" style={{color:colorScheme.text}}>{weathercodes[weather.code].desc}</Text>
                        <Text style={{color:colorScheme.text, fontSize:90}}>{weather.temp}°</Text>
                        <Text variant="bodyLarge" style={{color:colorScheme.text}}>{city}, {country}</Text>
                    </View>
                </View>
            </LinearGradient>
        </Surface>
    )
}

const styles = StyleSheet.create({
    text:{
        //color:"#303345",
    },
})