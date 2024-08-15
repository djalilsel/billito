import { db } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword");
  let airports = [];
  await db
    .collection("airports")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        doc.data().airports.forEach((airport) => {
          if (airport.city.toLowerCase().includes(keyword.toLowerCase())) {
            airports.push(airport);
          }
        });
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  if (airports.length === 0) {
    return NextResponse.json({ message: "No airports found" });
  }
  airports = airports.slice(0, 10);
  return NextResponse.json({ message: "ok", airports });
}
