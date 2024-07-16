"use client";

export default function Home() {
  const getFlight = async () => {
    const origin = "SYD";
    const destination = "BKK";
    const departureDate = "2024-11-01";
    const response = await fetch(
      `/api/flights?origin=${origin}&destination=${destination}&departureDate=${departureDate}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data);
  };
  return (
    <main className="">
      <button onClick={getFlight}>Get Flight</button>
    </main>
  );
}
