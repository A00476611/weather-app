import * as SQLite from "expo-sqlite"
import { Platform } from "react-native";

export class DB {
    constructor(){
        this.openDB()
        this.db.transaction((tx) => {
            tx.executeSql(
              "CREATE TABLE IF NOT EXISTS saved-cities (id INTEGER PRIMARY KEY NOT NULL, name TEXT, latitude FLOAT, longitude FLOAT);",
              (message) => console.log(message) // callback
            );
        });
    }
    openDB() {        
        if (Platform.OS === "web") {
            this.db = {
              transaction: () => {
                return {
                  executeSql: () => {},
                };
              },
            };
          }
        else
            this.db = SQLite.openDatabase("myDb.db");
    }
    closeDB() {
        this.db.closeAsync()
    }

    runQuery(query, callback = () => {}){
        this.openDB()
        this.db.transaction((tx) => {
            tx.executeSql(
              query,
              callback // callback
            );
        });
    }

    getAll(callback) {
        this.openDB()
        
        this.db.transaction((tx) => {
            tx.executeSql(
                "Select * FROM saved-cities;",
                [], (_, { rows: { _array } }) => {
                    console.log("Query Ran")
                    callback(_array)
                },(err) => console.log(err)
            );
        });
    }

    insert({name, longitude, latitude}) {
        console.log(name)
        this.runQuery(`INSERT INTO saved-cites VALUES(${name}, ${longitude}, ${latitude};`)
    }
}