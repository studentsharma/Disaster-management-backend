import express from "express";
import dotenv from "dotenv";
import helping from "./routes/helping.route.js"
import connectDB from "./config/connectDB.js";
import userroute from "./routes/user.route.js"
import cors from "cors"


dotenv.config();
const app = express();
app.use(express.json());
// app.use(cors());

const allowedOrigins = ['https://rescueus.onrender.com'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));



app.use("/help", helping);
app.use("/user", userroute)

app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`listening at PORT ${process.env.PORT}`);
})
