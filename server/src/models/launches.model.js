//const launches = require("../models/launches.mongo");
const launches = new Map();

let latestFlightNumber = 100;
function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27,2030"),
  target: "Kepler-442 b",
  customers: ["Mahadev", "ZTM", "ISRO"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllTheLaunches() {
  return Array.from(launches.values());
}

//Add the new Launch to launches
function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customers: ["Mahadev", "ZTM", "ISRO"],
      upcoming: true,
      success: true,
    })
  );
}

function abortLaunchByID(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
}

module.exports = {
  existsLaunchWithId,
  getAllTheLaunches,
  addNewLaunch,
  abortLaunchByID,
};
