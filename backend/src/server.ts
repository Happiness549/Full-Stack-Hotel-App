import express from "express";
import  { testDBConnection }  from './config/database'
import userRoutes from './routes/userRoutes'
import googleAuthRoutes from "./routes/googleRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


const startServer = async () => {

    await testDBConnection();
    app.use('/api/users', userRoutes )
    app.use("/auth", googleAuthRoutes);
    


    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer();



