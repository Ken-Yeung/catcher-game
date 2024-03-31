import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000; // Use the PORT environment variable, or default to 3000 if not set

app.use(express.static("./public"))

app.get('/', (req: Request, res: Response) => {
 res.send(`Hello World!, This RD Password is ${process.env.REDIS_PW}`);
});

app.listen(port, () => {
 console.log(`Server running at http://localhost:${port}`);
});
