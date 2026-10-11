import express from "express";
import  { testDBConnection }  from './config/database'
import userRoutes from './routes/userRoutes'
import googleAuthRoutes from "./routes/googleRoutes";
import hotelRoutes from './routes/hotelRoutes';
import hotelImageRoutes from "./routes/hotelImageRoutes";
import dotenv from "dotenv";

dotenv.config();
console.log(
    "Cloudinary API key loaded:",
    Boolean(process.env.CLOUDINARY_API_KEY)
);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


const startServer = async () => {

    await testDBConnection();
    app.use('/api/users', userRoutes )
    app.use("/auth", googleAuthRoutes);
    app.use('/api/hotels', hotelRoutes)
    app.use("/api/hotels", hotelImageRoutes);
    

    


    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer();



