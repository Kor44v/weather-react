import { useState, useEffect, useSyncExternalStore } from "react";
import "./App.css";
import Papa from "papaparse";
import config from "../config";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const API_KEY = config.MY_API_TOKEN;
    const url =
      "https://visual-crossing-weather.p.rapidapi.com/forecast?aggregateHours=24&location=Rancagua%2CChile&contentType=csv&unitGroup=us&shortColumnNames=0";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": `${API_KEY}`,
        "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
      },
    };

    try {
      fetch(url, options)
        .then((resp) => resp.text())
        .then((result) => {
          Papa.parse(result, {
            header: true, // Si la primera fila contiene encabezados
            dynamicTyping: true, // Convierte automáticamente tipos de datos
            skipEmptyLines: true, // Omite líneas vacías
            complete: (parsedData) => {
              setData(parsedData.data);
            },
            error: (error) => {
              console.error(error.message);
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const [temp, setTemp] = useState("");
  const Temperaturas = (data) => {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      console.log(element);
      setTemp(element);
    }
  };

  return (
    <>
      <div>
        <h1>Weather App</h1>
        {data.length}

        <div>{temp}</div>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </>
  );
}

export default App;
