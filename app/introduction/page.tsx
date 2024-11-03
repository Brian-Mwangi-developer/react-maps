'use client';

import {AdvancedMarker,APIProvider,Map,useMap} from '@vis.gl/react-google-maps';
import {MarkerClusterer} from "@googlemaps/markerclusterer"
import type {Marker} from "@googlemaps/markerclusterer"
import  trees  from '../../data/trees';
import { useEffect,useState,useRef } from 'react';



const page = () => {
  return (
    <div style={{height:"100vh", width:"100vw"}}>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <MapContainer points={trees} />
        </APIProvider>
    </div>
  )
}
export default page

type Point = google.maps.LatLngLiteral & {key :string}
type Props ={points:Point[]}


const MapContainer = ({ points }: Props) => {
  const [zoom, setZoom] = useState(10); // Initialize zoom level state

  return (
    <Map
      center={{ lat: 43.64, lng: -79.41 }}
      zoom={zoom} // Bind zoom level to state
      mapId={process.env.NEXT_PUBLIC_MAP_ID}
      onZoomChanged={(event) => setZoom(event.detail.zoom)} // Update zoom level on change
    >
      <Markers points={points} />
    </Map>
  );
};

const Markers =({points}:Props) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key:string]:Marker}>({});
  const clusterer =useRef<MarkerClusterer | null >(null);

  useEffect(()=>{
    if(!map) return;
    if(!clusterer.current){
      clusterer.current = new MarkerClusterer({//used to create and manage per zoom level clusterers
        map,
      })
    }
  },[map])

  useEffect(()=>{
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  },[markers])
  const  setMarkerRef =(marker:Marker | null, key:string) => {
    if ((marker && markers[key]) || (!marker && !markers[key])) return;

    setMarkers((prev) => {
      if(marker){
        return {...prev,[key]:marker};//Add or update marker
      }else{
        const newMarkers = {...prev};
        delete newMarkers[key];//Delete a Marker
        return newMarkers;
      } 
    })
  }
  console.log(markers)
  return (
    <>
    {points.map((point) => (
      <AdvancedMarker
        position={point}
        key={point.key}
        ref={(marker) => setMarkerRef(marker, point.key)}
      >
        <span>🌳</span>
      </AdvancedMarker>
    ))}
    </>
  );
}

//Ref with a clalback can also return Null