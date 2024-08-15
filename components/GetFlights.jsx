"use client";

import { useEffect, useState } from "react";

const GetFlights = () => {
  const [airportName, setAirportName] = useState("houari");

  const fetchAirport = async () => {
    try {
      const res = await fetch(
        "https://api.api-ninjas.com/v1/airports?name=" + airportName,
        {
          headers: {
            "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY,
          },
        }
      );

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch airport data:", error);
    }
  };

  return <div onClick={() => fetchAirport()}>GetFlights</div>;
};

export default GetFlights;
