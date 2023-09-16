import Papa from "papaparse";
import { useEffect, useState } from "react";

export default function GetData({ search }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // const API_KEY = config.MY_API_TOKEN;
    const url = `https://visual-crossing-weather.p.rapidapi.com/forecast?aggregateHours=24&location=${search}%2CChile&contentType=csv&unitGroup=us&shortColumnNames=0`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "8c80ea7253msh336a83e9cf9bddep1d3024jsnc96ad3ded5cc",
        "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
      },
    };

    fetch(url, options)
      .then((resp) => resp.text())
      .then((result) => {
        Papa.parse(result, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (parsedData) => {
            // Modificar los nombres de las propiedades en cada objeto
            const modifiedData = parsedData.data.map((item) => {
              const modifiedItem = {};
              for (const key in item) {
                if (item.hasOwnProperty(key)) {
                  // Reemplazar espacios con guiones bajos
                  const newKey = key.replace(/ /g, "_");
                  modifiedItem[newKey] = item[key];
                }
              }
              return modifiedItem;
            });

            // Establecer los datos modificados en el estado
            setData(modifiedData);
            console.log(modifiedData);
          },
          error: (error) => {
            console.error(error.message);
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return { data };
}
