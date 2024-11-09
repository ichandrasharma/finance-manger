import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const mongoURI: string = "mongodb+srv://chaikenevenerrvgie305:6ETVo5AsvN2ejxXk@finance-tracker.v1zwv.mongodb.net/";

mongoose.connect(mongoURI).then(() => console.log("Connected success")).catch((err) => console.error("Failed to connect to mongodb", err));

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
    console.log(`server run on ${port}`);
});