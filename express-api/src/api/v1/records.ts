import express, { Request, Response } from "express";
import CatcherService from "../../services/catcher_service";

const api = express.Router();

// Need to subscribe to database changed ***
// GET Function
async function GET(req: Request, res: Response) {
  const _key = req.query.key as string; // If undefine means GET ALL else by KEY
  const response = await CatcherService.getAllFilteredData(_key);
  res.status(200).json(response);
}

// POST Function
async function POST(req: Request, res: Response) {
  // Getting Body

  const [responseStatus, response] = await CatcherService.upsertData({
    name: "test",
    score: 90,
  });

  if (responseStatus == "OK") {
    res.status(200).send(response);
  } else {
    console.log("*".repeat(66));
    console.log("Unable to upsert Data:", responseStatus);
    console.log("*".repeat(66));
    res.status(500);
  }
}

api.route("/records").get(GET).post(POST);

export default api;
