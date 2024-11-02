'use client';

import {AdvancedMarker,APIProvider,Map,useMap} from '@vis.gl/react-google-maps';
import {MarkerClusterer} from "@googlemaps/markerclusterer"
import type {Marker} from "@googlemaps/markerclusterer"

import { useEffect,useState,useRef } from 'react';



const page = () => {
  return (
    <div style={{height:"100vh", width:"100vw"}}>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <Map center={{ lat: 43.64, lng: -79.41 }} zoom={9} mapId={process.env.NEXT_PUBLIC_MAP_ID}>

            </Map>
        </APIProvider>
    </div>
  )
}
export default page