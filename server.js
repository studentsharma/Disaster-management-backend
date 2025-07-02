import express from "express";
import dotenv from "dotenv";
import helping from "./routes/helping.route.js"
import connectDB from "./config/connectDB.js";
import userroute from "./routes/user.route.js"
import cors from "cors"


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


app.use("/help", helping);
app.use("/user", userroute)

app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`listening at PORT ${process.env.PORT}`);
})