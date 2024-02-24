import { createContext, useEffect, useState } from "react"
import { Platform } from "react-native";
import * as SQLite from "expo-sqlite"

export const DBContext = createContext();

// const db = Platform.OS != "web" ? SQLite.openDatabase("myDb.db") : {transactionAsync: async () => {
//     return {
//       executeSqlAsync: async () => new Promise,
//     };
//   },
// };

const runQuery = (query) => {
    if(Platform.OS === "web") return
    return new Promise((res,rej) => {
        const db = SQLite.openDatabase("myDb.db")
        db.transactionAsync( async tx => {
            tx.executeSqlAsync(query).then(result => {
                db.closeSync()
                res(result)
            }).catch(err=>{
                db.closeSync()
                rej(err)
            })
            
        });
    })
}

// const test = await runQuery("Select * from saved_cities;");

export const useDB = () => {
    const [savedCities, setSavedCities] = useState([])
    const [db, setDB] = useState()

    useEffect(()=> {
        setDB(SQLite.openDatabase("myDb.db"))
    },[])

    useEffect(()=>{
        if(!db) return
        runQuery("CREATE TABLE IF NOT EXISTS saved_cities (id INTEGER PRIMARY KEY NOT NULL, name TEXT, latitude FLOAT, longitude FLOAT, country TEXT);").then(()=>{
            runQuery("Select * from saved_cities").then(res=>setSavedCities(res.rows))
        })
    },[db])

    const runQuery = (query) => {
        if(Platform.OS === "web" || db === undefined) return
        return new Promise((res,rej) => {
            db.transactionAsync( async tx => {
                tx.executeSqlAsync(query).then(result => {
                    res(result)
                }).catch(err=>{
                    rej(err)
                })
                
            });
        })
    }

    const insert = ({name, longitude, latitude, country}) => {
        runQuery(`INSERT INTO saved_cities (name, longitude, latitude, country) VALUES ('${name}', ${longitude}, ${latitude}, '${country}');`).then(res=>{
            console.log(res)
            setSavedCities(initial=>[...initial, {id:res.insertId, name, longitude, latitude, country}])
        }).catch(err=> console.log(err))
    }

    const remove = (id) => {
        runQuery(`DELETE FROM saved_cities where id=${id};`).then(()=>{
            setSavedCities(initial=>[...initial.filter(city=> city.id != id)])
        }).catch(e=>console.log(e))
    }

    return { savedCities, insert, remove }
}