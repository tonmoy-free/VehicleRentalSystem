import express, { Request, Response } from 'express';

import config from './config';
import initDB, { pool } from './config/db';
import logger from './middleware/logger';
import { userRoutes } from './modules/user/user.route';
import { vehicleRoutes } from './modules/vehicle/vehicle.route';
import { bookingRoutes } from './modules/booking/booking.route';


// dotenv.config({ path: path.join(process.cwd(), '.env') });
const app = express()
const port = config.port;

//initializing DB
initDB();


//parser
app.use(express.json());

app.get('/', logger, (req: Request, res: Response) => {
    res.send('Hello World!')
});

//users api
app.use("/", userRoutes);

//Vehicles api
app.use("/", vehicleRoutes);

//booking api
app.use("/", bookingRoutes);




app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path,
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
