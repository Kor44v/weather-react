import { useEffect, useState } from "react";
import Card from "./components/card.jsx";
import "./App.css";
import Papa from "papaparse";
// import GetData from "./services/getData.js";

// function GetData({ search }) {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // const API_KEY = config.MY_API_TOKEN;
//     const url = `https://visual-crossing-weather.p.rapidapi.com/forecast?aggregateHours=24&location=${search}%2CChile&contentType=csv&unitGroup=us&shortColumnNames=0`;
//     const options = {
//       method: "GET",
//       headers: {
//         "X-RapidAPI-Key": "8c80ea7253msh336a83e9cf9bddep1d3024jsnc96ad3ded5cc",
//         "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
//       },
//     };

//     fetch(url, options)
//       .then((resp) => resp.text())
//       .then((result) => {
//         Papa.parse(result, {
//           header: true,
//           dynamicTyping: true,
//           skipEmptyLines: true,
//           complete: (parsedData) => {
//             // Modificar los nombres de las propiedades en cada objeto
//             const modifiedData = parsedData.data.map((item) => {
//               const modifiedItem = {};
//               for (const key in item) {
//                 if (item.hasOwnProperty(key)) {
//                   // Reemplazar espacios con guiones bajos
//                   const newKey = key.replace(/ /g, "_");
//                   modifiedItem[newKey] = item[key];
//                 }
//               }
//               return modifiedItem;
//             });

//             // Establecer los datos modificados en el estado
//             setData(modifiedData);
//             console.log(modifiedData);
//           },
//           error: (error) => {
//             console.error(error.message);
//           },
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   // Retorna el valor del estado `data`
//   return data;
// }

function App() {
  const [data, setData] = useState([]);
  const [temp, setTemp] = useState([]);
  const [search, setSearch] = useState("");
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
  }, [search]);

  const day = (date) => {
    let dayWeek = new Date(date).getDay();
    switch (dayWeek) {
      case 0:
        dayWeek = "Domingo";
        break;
      case 1:
        dayWeek = "Lunes";
        break;
      case 2:
        dayWeek = "Martes";
        break;
      case 3:
        dayWeek = "Miércoles";
        break;
      case 4:
        dayWeek = "Jueves";
        break;
      case 5:
        dayWeek = "Viernes";
        break;
      case 6:
        dayWeek = "Sábado";
        break;
    }
    return dayWeek;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Valor del input", search);
    // GetData({ search });

    setTemp(data);
  };

  return (
    <>
      <div>
        <h1>Weather App</h1>
        <form action="" onSubmit={handleSearch}>
          <input
            className="p-2 rounded-xl text-center m-5"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Busca una localidad"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(e);
              }
            }}
          />
          {/* <button onClick={true}>Buscar</button> */}
        </form>
        <div>
          {temp.map((item, index) => (
            <div key={index}>
              <Card
                name={item.Address}
                day={day(item.Date_time)}
                tempMax={Math.round(((item.Maximum_Temperature - 32) * 5) / 9)}
                tempMin={Math.round(((item.Minimum_Temperature - 32) * 5) / 9)}
              />
            </div>
          ))}
        </div>
        {/* <button onClick={handleClick}>Click</button> */}
      </div>
    </>
  );
}

export default App;
