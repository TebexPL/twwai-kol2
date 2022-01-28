import React, {useState, useEffect} from "react";
import LineChart from "./LineChart";
const io = require("socket.io-client");


export default function Dashboard() {

   const [response, setResponse] = useState({});
   const [tempHumData, tempHumDataSet] = useState(null);
   const [pressData, pressDataSet] = useState(null);
   const [currentData, currentDataSet] = useState(null);


   const getAllData = async () => {
     const res = await fetch("http://localhost:3001/api/params")
     const dataRes = await res.json();
     const data = dataRes.filter((el) => el.temp);
     setDatasets(data);
   }

   const setDatasets = (dataRes) => {
       let tempHum = {
           labels: [],
           datasets: [
               {
                   label: 'Temperature',
                   data: [],
                   borderColor: 'rgb(255, 99, 132)',
                   backgroundColor: 'rgba(255, 99, 132, 0.5)',
               },
               {
                   label: 'Humidity',
                   data: [],
                   borderColor: 'rgb(31,52,217)',
                   backgroundColor: 'rgba(31,52,217, 0.5)',
               }
           ],
       };

       let press = {
           labels: [],
           datasets: [
               {
                   label: 'Pressure',
                   data: [],
                   borderColor: 'rgb(95,220,61)',
                   backgroundColor: 'rgba(95,220,61, 0.5)',
               }
           ],
       };

       tempHum.datasets[0].data = dataRes.map(item => {
           return item.temp;
       })

       tempHum.datasets[1].data = dataRes.map(item => {
           return item.humidity;
       })

       press.datasets[0].data = dataRes.map(item => {
           return item.pressure;
       })

       tempHum.labels = press.labels = dataRes.map(item => {
           return item.date;
       })

       tempHumDataSet(tempHum);
       pressDataSet(press);
   }


  useEffect(() => {
    const socket = io("http://localhost:3001/", {
        transports: ['websocket', 'polling', 'flashsocket'],
    });
    socket.on("currentState", data => {
        setDatasets(data.data);
    });
       const fetchAir = async () => {
           const res = await fetch("http://localhost:3001/api/params")
           const dataRes = await res.json();
           const data = dataRes.filter((el) => el.temp);
           setDatasets(data);

       }
       fetchAir();

   }, []);

   return (
       <div>
            <div>
           {tempHumData==null||pressData==null
                ?
             <div>
               <p>Loading</p>
             </div>
             :
             (
             <div>
               <LineChart title="Temperature & Humidity" data={tempHumData}/>
               <LineChart title="Pressure" data={pressData}/>
             </div>
            )
          }
           </div>

       </div>
   );
}
