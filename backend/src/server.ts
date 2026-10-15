import express from "express";
import  { testDBConnection }  from './config/database'
import userRoutes from './routes/userRoutes'
import googleAuthRoutes from "./routes/googleRoutes";
import hotelRoutes from './routes/hotelRoutes';
import hotelImageRoutes from "./routes/hotelImageRoutes";
import roomRoutes from "./routes/roomRoutes";
import bookingRoutes from './routes/bookingRoutes'
import paymentRoutes from './routes/paymentRoutes'
import notificationRoutes from './routes/notificationRoutes'
import reviewRoutes from "./routes/reviewRoutes";
import favouriteRoutes from "./routes/favouriteRoutes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();


const app = express();
app.use(cors({
    origin: "http://localhost:5173"
}));
const PORT = process.env.PORT || 5000;

app.use(express.json());


const startServer = async () => {

    await testDBConnection();
    app.use('/api/users', userRoutes )
    app.use("/auth", googleAuthRoutes);
    app.use('/api/hotels', hotelRoutes)
    app.use("/api/hotels", hotelImageRoutes);
    app.use("/api/hotels", roomRoutes);
    app.use("/api/bookings", bookingRoutes);
    app.use("/api/payments", paymentRoutes);
    app.use('/api/notifications', notificationRoutes)
    app.use("/api/reviews", reviewRoutes);
     app.use("/api/favourites", favouriteRoutes);
    
    

    


    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer();



