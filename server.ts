import express, { Express } from "express";
import cors from "cors";
import appRouter from "./routes";

const app: Express = express();
const PORT = process.env.PORT || 5001;

// allows project to parse JSON in request body
app.use(express.json());

// enable CORS for all origins
app.use(cors());

app.use("/api/idea/", appRouter);

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
})