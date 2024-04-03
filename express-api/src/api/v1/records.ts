import express, { Request, Response } from "express";
import CatcherService from "../../services/catcher_service";
import { IRecord } from "../../types/record";

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
  const body = req.body as IRecord;

  try {
    if (!!!body.name || !!!body.score) return res.status(422).send("Unprocessable Entity");

    const [responseStatus, response] = await CatcherService.upsertData({
      id: body.id,
      name: body.name!,
      score: parseFloat(body.score!.toString()),
    });

    if (responseStatus == "OK") {
      res.status(200).send(response);
    } else {
      console.error("*".repeat(66));
      console.error("Unable to upsert Data:", responseStatus);
      console.error("*".repeat(66));
      res.status(500).send("Internal Server Error");
    }
  } catch (err) {
    console.error("POST Records Error:", err);
    res.status(500).send("Internal Server Error");
  }
}

// Bind Router Functions
api.route("/records").get(GET).post(POST);

export default api;
