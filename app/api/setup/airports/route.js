import { amadeus } from "@/lib/amadeus";
import db from "@/lib/db.js";
import { NextResponse } from "next/server";
import fs from "fs";
import os from "os";
import { parse } from "csv-parse";
import { finished } from "stream/promises";

const subType = "AIRPORT";

const getAirports = async (keyword, subType) => {
  const airports = await amadeus.referenceData.locations
    .get({
      subType,
      keyword,
    })
    .then((response) => {
      return response.data;
    });
  return airports;
};

const deleteAllDocs = async (collection) => {
  await db
    .collection(collection)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
};

const formateAirports = (response) => {
  return response.map((airport) => {
    return {
      name: airport.name,
      iataCode: airport.iataCode,
      city: airport.address.cityName,
      cityCode: airport.address.cityCode,
      country: airport.address.countryName,
      countryCode: airport.address.countryCode,
      region: airport.address.regionCode,
      timeZoneOffset: airport.timeZoneOffset,
      geoCode: airport.geoCode,
    };
  });
};

const getAirportsToInsert = (formattedAirports, dbAirports) => {
  const airportsToInsert = [];
  formattedAirports.map((airport) => {
    if (
      !dbAirports.some((dbAirport) => dbAirport.country === airport.country)
    ) {
      const data = {
        country: airport.country,
        airports: [
          {
            name: airport.name,
            iataCode: airport.iataCode,
            city: airport.city,
            timezone: airport.timezone,
            tz: airport.tz,
            dts: airport.dts,
            geoCode: airport.geoCode,
          },
        ],
      };
      dbAirports.push(JSON.parse(JSON.stringify(data)));
      airportsToInsert.push(data);
    } else if (
      !dbAirports.some((dbAirport) =>
        dbAirport.airports.some((a) => a.iataCode === airport.iataCode)
      )
    ) {
      const data = {
        name: airport.name,
        iataCode: airport.iataCode,
        city: airport.city,
        timezone: airport.timezone,
        tz: airport.tz,
        dts: airport.dts,
        geoCode: airport.geoCode,
      };

      dbAirports
        .find((dbAirport) => dbAirport.country === airport.country)
        .airports.push(JSON.parse(JSON.stringify(data)));
      airportsToInsert.find(
        (dbAirport) => dbAirport.country === airport.country
      )
        ? airportsToInsert
            .find((dbAirport) => dbAirport.country === airport.country)
            .airports.push(data)
        : airportsToInsert.push(
            dbAirports.find(
              (dbAirport) => dbAirport.country === airport.country
            )
          );
    }
  });
  return airportsToInsert;
};

const getAirportsCsv = async () => {
  const airportsData = [];
  const response = await fs.readFile(
    "lib/airports.dat",
    "binary",
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const lines = data.split("\n");
      for (let i = 0; i < lines.length; i++) {
        const splited = lines[i].split(",");
        const name = splited[1];
        const city = splited[2];
        const country = splited[3];
        const iata = splited[4];
        const icao = splited[5];
        const lat = splited[6];
        const long = splited[7];
        const alt = splited[8];
        const timezone = splited[9];
        const dst = splited[10];
        const tz = splited[11];
        const type = splited[12];
        const source = splited[13];
        airportsData.push({
          name,
          city,
          country,
          iata,
          icao,
          lat,
          long,
          alt,
          timezone,
          dst,
          tz,
          type,
          source,
        });
      }
      return airportsData;
    }
  );
  return airportsData;
};

const processFile = async () => {
  const records = [];
  const parser = fs.createReadStream(`lib/airports.csv`).pipe(parse({}));
  parser.on("readable", function () {
    let record;
    while ((record = parser.read()) !== null) {
      const [
        number,
        name,
        city,
        country,
        iata,
        icao,
        lat,
        long,
        alt,
        timezone,
        dts,
        tz,
        type,
        source,
      ] = record;
      records.push({
        name,
        city,
        country,
        iata,
        icao,
        lat,
        long,
        alt,
        timezone,
        dts,
        tz,
        type,
        source,
      });
    }
  });
  await finished(parser);
  return records;
};

const insertFromCsv = async () => {
  await fs.promises.writeFile(
    `${os.tmpdir()}/input.csv`,
    ["a,b,c", "1,2,3"].join("\n")
  );

  const records = await processFile();

  const formattedAirports = records.map((airport) => {
    return {
      name: airport.name == "\\N" ? null : airport.name,
      iataCode: airport.iata == "\\N" ? null : airport.iata,
      city: airport.city == "\\N" ? null : airport.city,
      country: airport.country == "\\N" ? null : airport.country,
      timezone: airport.timezone == "\\N" ? null : airport.timezone,
      tz: airport.tz == "\\N" ? null : airport.tz,
      dts: airport.dts ? airport.dts : null,
      geoCode: {
        latitude: airport.lat == "\\N" ? null : airport.lat,
        logitude: airport.long == "\\N" ? null : airport.long,
      },
    };
  });

  const dbAirportsData = await db.collection("airports").get();
  let dbAirports = [];
  // if (!dbAirportsData.empty) {
  //   dbAirports = await dbAirportsData.docs.map((doc) => doc.data());
  // }

  const airportsToInsert = getAirportsToInsert(formattedAirports, dbAirports);

  if (airportsToInsert.length > 0) {
    airportsToInsert.map((airport) => {
      db.collection("airports").doc(`${airport.country}`).set(airport);
      console.log("Insertd: ", airport.country);
    });
  } else {
    console.log("No data to insert");
  }
};
export async function POST(request) {
  // const { keyword } = await request.json();
  // const airports = await getAirports(keyword, subType);

  // if (!airports) {
  //   return NextResponse.json({ message: "No data" }, { status: 404 });
  // }
  // const formattedAirports = await formateAirports(airports);

  // if (airportsToInsert.length > 0) {
  //   airportsToInsert.map((airport) => {
  //     db.collection("cities")
  //       .doc(`${airport.countryCode}, ${airport.country}`)
  //       .set(airport);
  //   });
  //   console.log("Insertd: ", airportsToInsert);
  // } else {
  //   console.log("No data to insert");
  // }

  // const airportsData = await getAirportsCsv();

  // console.log(airportsData);

  // insertFromCsv();

  return NextResponse.json({ message: "Done" }, { status: 200 });
}
