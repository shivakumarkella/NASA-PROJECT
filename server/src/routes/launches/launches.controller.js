const {
  getAllTheLaunches,
  //addNewLaunch,
  abortLaunchByID,
  existsLaunchWithId,
  scheduleNewLaunch,
} = require("../../models/launches.model");

async function httpGetAllTheLaunches(req, res) {
  return res.status(200).json(await getAllTheLaunches());
}

async function httpAddNewLaunch(req, res) {
  //get the data from post method which is passing through the body
  const launch = req.body;

  //validation
  if (
    !launch.mission ||
    !launch.launchDate ||
    !launch.target ||
    !launch.rocket
  ) {
    return res.status(400).json({
      Error: "missing required launch property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      Error: "Invalid Launch Date",
    });
  }
  //InMemory
  //addNewLaunch(launch);
  //MongoDb
  await scheduleNewLaunch(launch);
  res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  //check the launch ID available or not
  const launchId = Number(req.params.id);
  // If Launch Id not available send the error back saying launch id not availble.
  if (!existsLaunchWithId(launchId)) {
    return res.status(400).json({
      Error: "Launch Not found",
    });
  }
  // If Laucnh Available then Aborted it and send the response back as OK
  abortLaunchByID(launchId);
  return res.status(200).json({
    ok: true,
  });
}

module.exports = { httpGetAllTheLaunches, httpAddNewLaunch, httpAbortLaunch };
