import { View } from "react-native"
import { DB } from "../utils/Db"
import { useEffect, useState } from "react"

export const SavedScreen = () => {
    const [savedCites, setSavedCities] = useState([])
    const db = new DB()
    useEffect(()=>{
        db.getAll((res) => {
            console.log(res)
            setSavedCities(res)
        })
    },[])

    useEffect(()=>{
        console.log(savedCites)
    }, [savedCites])

    return (
        <View>
            {savedCites.map((city,i) => <Text>{city.name}</Text>)}
        </View>
    )
}