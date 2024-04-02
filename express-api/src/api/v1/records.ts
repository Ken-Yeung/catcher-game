import express, { Request, Response } from 'express';

const api = express.Router();

// Need to subscribe to database changed
function GET(req: Request, res: Response){
    res.send("Hello World From Api")
}

function POST(req: Request, res: Response){

}

api.route("/records").get(GET).post(POST)

export default api