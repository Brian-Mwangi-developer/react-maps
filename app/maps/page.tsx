"use client";
import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const page = () => {
  const position = { lat: 53.45, lng: 10 };
  const [open, setOpen] = useState(false);
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div style={{ height: "100vh", width: "100vw" }}>
        <Map zoom={9} center={position} mapId={process.env.NEXT_PUBLIC_MAP_ID}>
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin
              background={"yellow"}
              borderColor={"green"}
              glyphColor={"purple"}
            />
          </AdvancedMarker>
          {open && (
              <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                <p className="text-black">I am available</p>
                </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default page;
