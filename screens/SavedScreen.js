import { View } from "react-native"
import { useContext, useEffect, useState } from "react"
import { WeatherCard } from "../components/WeatherCard"
import { DBContext } from "../useDB"

export const SavedScreen = () => {
    const {savedCities, remove} = useContext(DBContext)

    return (
        <View style={{paddingHorizontal:20, flex:1, display:"flex", justifyContent:"space-around"}}>
            {savedCities.map((city,i) => (
                <View key={i}> 
                    <WeatherCard lat={city.latitude} long={city.longitude} city={city.name} country={city.country} onHold={e=>remove(city.id)}/>
                </View>
            ))}
        </View>
    )
}