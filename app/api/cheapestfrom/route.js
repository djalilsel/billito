import { amadeus } from "@/lib/amadeus";
import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

let res = {
  type: "location",
  subType: "CITY",
  name: "MADRID",
  detailedName: "MADRID/ES",
  id: "CMAD",
  self: {
    href: "https://test.api.amadeus.com/v1/reference-data/locations/CMAD",
    methods: ["GET"],
  },
  timeZoneOffset: "+02:00",
  iataCode: "MAD",
  geoCode: { latitude: 40.49195, longitude: -3.56944 },
  address: {
    cityName: "MADRID",
    cityCode: "MAD",
    countryName: "SPAIN",
    countryCode: "ES",
    regionCode: "EUROP",
  },
  analytics: { travelers: { score: 30 } },
};

const getCity = async (text, name) => {
  console.log("text : ", text);
  let city = null;
  if (!name) {
    const unfiltered = await db
      .collection("cities")
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((doc) => doc.data());
      });
    city = unfiltered.filter((city) => city.city_code.includes(text))[0];
  } else {
    console.log("searching for name in db");
    const unfiltered = await db
      .collection("cities")
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((doc) => doc.data());
      });
    city = unfiltered.filter((city) => city.city.includes(text))[0];
  }
  if (city) {
    return city;
  }
  // const city_name = await amadeus.referenceData.locations
  //   .get({
  //     subType: "AIRPORT",
  //     keyword: text,
  //   })
  //   .then((response) => {
  //     console.log(response);

  //     if (response.data.length === 0) {
  //       console.log("no cities found");
  //       return null;
  //     }
  //     res = response.data[0];
  db.collection("cities")
    .doc(`${res.address.cityCode}, ${res.address.cityName}`)
    .set({
      city: res.address.cityName,
      city_code: res.address.cityCode,
      country: res.address.countryName,
      country_code: res.address.countryCode,
      region_code: res.address.regionCode,
      score: res.analytics.travelers.score,
    });
  return {
    city: res.address.cityName,
    city_code: res.address.cityCode,
    country: res.address.countryName,
    country_code: res.address.countryCode,
    region_code: res.address.regionCode,
    score: res.analytics.travelers.score,
  };
  // });
  return city_name;
};

const getCitiesNames = async (origin, destination) => {
  // const from = await getCity(origin, false);
  // const to = await getCity(destination, false);
  const cities = await amadeus.referenceData.location("RAK").get();
  console.log(cities.data);
  return { from: "MADRID", to: "PALMA DE MALLORCA" };
  // return { from, to };
};

const data = [
  {
    type: "flight-destination",
    origin: "MAD",
    destination: "PMI",
    departureDate: "2024-10-21",
    returnDate: "2024-11-05",
    price: {
      total: "56.49",
    },
    links: {
      flightDates:
        "https://test.api.amadeus.com/v1/shopping/flight-dates?origin=MAD&destination=PMI&departureDate=2024-07-28,2025-01-23&oneWay=false&duration=1,15&nonStop=false&viewBy=DURATION",
      flightOffers:
        "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=MAD&destinationLocationCode=PMI&departureDate=2024-10-21&returnDate=2024-11-05&adults=1&nonStop=false",
    },
  },
  {
    type: "flight-destination",
    origin: "MAD",
    destination: "AMS",
    departureDate: "2024-11-13",
    returnDate: "2024-11-14",
    price: {
      total: "124.08",
    },
    links: {
      flightDates:
        "https://test.api.amadeus.com/v1/shopping/flight-dates?origin=MAD&destination=AMS&departureDate=2024-07-28,2025-01-23&oneWay=false&duration=1,15&nonStop=false&viewBy=DURATION",
      flightOffers:
        "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=MAD&destinationLocationCode=AMS&departureDate=2024-11-13&returnDate=2024-11-14&adults=1&nonStop=false",
    },
  },
  {
    type: "flight-destination",
    origin: "MAD",
    destination: "ORY",
    departureDate: "2024-08-07",
    returnDate: "2024-08-22",
    price: {
      total: "92.19",
    },
    links: {
      flightDates:
        "https://test.api.amadeus.com/v1/shopping/flight-dates?origin=MAD&destination=ORY&departureDate=2024-07-28,2025-01-23&oneWay=false&duration=1,15&nonStop=false&viewBy=DURATION",
      flightOffers:
        "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=MAD&destinationLocationCode=ORY&departureDate=2024-08-07&returnDate=2024-08-22&adults=1&nonStop=false",
    },
  },
  {
    type: "flight-destination",
    origin: "MAD",
    destination: "RAK",
    departureDate: "2024-09-19",
    returnDate: "2024-10-04",
    price: {
      total: "69.93",
    },
    links: {
      flightDates:
        "https://test.api.amadeus.com/v1/shopping/flight-dates?origin=MAD&destination=RAK&departureDate=2024-07-28,2025-01-23&oneWay=false&duration=1,15&nonStop=false&viewBy=DURATION",
      flightOffers:
        "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=MAD&destinationLocationCode=RAK&departureDate=2024-09-19&returnDate=2024-10-04&adults=1&nonStop=false",
    },
  },
];

const dummyData = [
  {
    image:
      "https://i.pinimg.com/564x/50/1b/42/501b4236bcbe5aec37738b25994a503b.jpg",
    from: "سطيف",
    to: "الجزائر",
    price: "100.00",
  },
  {
    image:
      "https://i.pinimg.com/564x/6a/05/c8/6a05c8a30950986cea38c47eab4d79f9.jpg",
    from: "سطيف",
    to: "ورقلة",
    price: "80.00",
  },
  {
    image:
      "https://i.pinimg.com/564x/4c/67/6d/4c676d89bc3a2e54b55222fd7d14b677.jpg",
    from: "سطيف",
    to: "وهران",
    price: "132.00",
  },
  {
    image:
      "https://i.pinimg.com/564x/03/d3/82/03d3823ec406f94973db6961bae7ca8e.jpg",
    from: "سطيف",
    to: "قسنطينة",
    price: "89.99",
  },
  {
    image:
      "https://i.pinimg.com/564x/03/d3/82/03d3823ec406f94973db6961bae7ca8e.jpg",
    from: "سطيف",
    to: "قسنطينة",
    price: "89.99",
  },
];
export async function GET(request) {
  // const { searchParams } = new URL(request.url);
  // const from = searchParams.get("from");
  // const response = await amadeus.shopping.flightDestinations.get({
  //   origin: from.toString(),
  // });

  // const data = await response.data;
  // const filteredData = data.sort(() => Math.random() - 0.5).slice(0, 4);
  // let cities = [];
  // for (const city of filteredData) {
  //   const { from, to } = await getCitiesNames(city.origin, city.destination);
  //   cities.push({ ...city, origin: from, destination: to });
  // }

  return NextResponse.json(dummyData.slice(0, 4), { status: 200 });
}

// const cities = await amadeus.referenceData.locations.get({
//   keyword: "MAD",
//   subType: "CITY",
// });
// console.log(cities.data);
