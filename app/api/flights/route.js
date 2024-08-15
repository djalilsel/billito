import { amadeus } from "@/lib/amadeus.js";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const departureDate = searchParams.get("departureDate").toString();
  const response = await amadeus.shopping.flightOffersSearch.get({
    originLocationCode: origin,
    destinationLocationCode: destination,
    departureDate: String(departureDate),
    adults: 1,
    max: 5,
  });
  const data = await response.data;
  return NextResponse.json(data);
}
