import {   useEffect, useState } from 'react';
import '../App.css';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import axios from 'axios'; 
import api_key from './accessKey';
import AddressBox from './AddressBox';
import { addressContext } from './contexts'; 

function MapComponent() {
    const  [map,setMap] = useState(null);
    const [address, setAddress] = useState("")
    let hasMap = false;
    const onClick = (event)=>{
      let {lat,lng} = event.latlng;
      let url = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}&api_key=${api_key}`
      axios.get(url).then((res)=>{
        console.log(res.data.display_name);
        // alert(" address is: "+res.data.display_name)
        setAddress(res.data.display_name)
      }).catch(err =>{
        console.log(err);
      })
    }
  
    useEffect(()=>{
        if(map == null && !hasMap){
          let m = L.map('mapId',{minZoom:4, maxZoom:20, zoomControl:true}).setView([37.9566366,-91.7699109], 16);
          hasMap = true;
          m.on('click',onClick)
          setMap(m );
          
        }
      },[])
    
      useEffect(()=>{
        if(map!= null){
          const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            pane:'tilePane',
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          });
          map.addLayer(tiles);
        }
      },[map])
    return (      
        <>
            <h2 id='addressHeader'> Address</h2>
            {/* <div id='addressBox'> 
                <div className='text'>
                    {address}
                </div> 
            </div> */}
            {/* <AddressBox address={address}></AddressBox> */}
            <addressContext.Provider value={address}>
              <AddressBox ></AddressBox>
            </addressContext.Provider>
            <div id = "mapContainer">
                <div id="mapInnerContainer">
                    <div id = "mapId" className='mapClass'></div>
                </div>
            </div>
        </>
    );
}

export default MapComponent;