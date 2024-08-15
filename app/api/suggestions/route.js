import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export async function GET(request) {
  const suggestions = await db.collection("city_suggestions").get();
  const data = suggestions.docs.map((doc) => doc.data());
  if (data.length < 4) {
    return NextResponse.json(
      {
        error:
          "No images found. This is a server error try again in a couple hours.",
      },
      { status: 404 }
    );
  }
  const randomData = data.sort(() => Math.random() - 0.5);
  const filteredData = randomData.slice(0, 4);
  return NextResponse.json(filteredData);
}
