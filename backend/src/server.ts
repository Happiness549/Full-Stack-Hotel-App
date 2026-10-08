import express from "express";
import  { testDBConnection }  from './config/database'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());




const startServer = async () => {

    await testDBConnection();
    


    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer();



