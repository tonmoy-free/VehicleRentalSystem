import express, { Request, Response } from 'express';

import config from './config';
import initDB, { pool } from './config/db';
import logger from './middleware/logger';
import { userRoutes } from './modules/user/user.route';


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

//users post
app.use("/", userRoutes);

// app.delete("/user/:id", async (req: Request, res: Response) => {
//     // console.log(req.params.id);
//     try {
//         const result = await pool.query(`DELETE FROM users WHERE id = $1`, [req.params.id]);

//         if (result.rowCount === 0) {
//             res.status(404).json({
//                 success: false,
//                 message: "User not found",
//             })
//         } else {
//             res.status(200).json({
//                 success: true,
//                 message: "User deleted successfully",
//                 data: result.rows[0],
//             })
//         }
//     } catch (err: any) {
//         console.log("DB Error =>", err);
//         res.status(500).json({
//             success: false,
//             message: "Api is not working"
//         })
//     }

// });
//     const { name, email, phone, role } = req.body;
//     try {
//         const result = await pool.query(`UPDATE users SET
//              name = COALESCE($1, name),
//              email = COALESCE($2, email),
//              phone = COALESCE($3, phone),
//              role = COALESCE($4, role),
//              updated_at = NOW() 
//              WHERE id=$5 
//              RETURNING id, name, email, phone,role`, [name, email, phone, role, req.params.id]);

//         if (result.rows.length === 0) {
//             res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             })
//         }

//         res.status(200).json({
//             success: true,
//             message: "Users retrieved successfully",
//             data: result.rows
//         })
//     } catch (err: any) {
//         console.log("DB Error =>", err);
//         res.status(500).json({
//             success: false,
//             message: "Api is not working"
//         })
//     }
// });


//Vehicles post or Create Vehicle

app.post("/api/v1/vehicles", async (req: Request, res: Response) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;
    console.log(vehicle_name)

    try {
        const result = await pool.query(`
            INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status)VALUES($1,$2,$3,$4,$5) RETURNING vehicle_name, type, registration_number, daily_rent_price, availability_status`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);

        //convert to number
        const vehicle = result.rows[0];
        vehicle.daily_rent_price = parseFloat(vehicle.daily_rent_price);


        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0]
        })

    } catch (err: any) {
        console.log("DB Error =>", err);
        res.status(500).json({
            success: false,
            message: "Api is not working"
        })
    }
});


//Bookings post or Create Booking
app.post("/api/v1/bookings", async (req: Request, res: Response) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;

    try {
        //date validation
        const startDate = new Date(rent_start_date);
        const endDate = new Date(rent_end_date);

        if (endDate <= startDate) {
            return res.status(400).json({
                success: false,
                message: "rent_end_date must be after rent_start_date "
            })
        };

        //vehicle daily rate
        const vehicleResult = await pool.query(`
            SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id = $1`,
            [vehicle_id])


        if (vehicleResult.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
        };

        const vehicle = vehicleResult.rows[0];

        //calculation
        const durationInMs = endDate.getTime() - startDate.getTime();
        const durationInDays = Math.ceil(durationInMs / (1000 * 60 * 60 * 24));

        //total_price
        const total_price = parseFloat(vehicle.daily_rent_price) * durationInDays;

        const bookingResult = await pool.query(`
            INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)VALUES($1,$2,$3,$4,$5,$6) RETURNING id, customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status`, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, 'active']);

        //convert to number
        // const vehicle = result.rows[0];
        // vehicle.daily_rent_price = parseFloat(vehicle.daily_rent_price);


        const booking = bookingResult.rows[0];

        //Attach vehicle inside response
        booking.vehicle = {
            vehicle_name: vehicle.vehicle_name,
            daily_rent_price: parseFloat(vehicle.daily_rent_price)
        };

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking
        });

    } catch (err: any) {
        console.log("DB Error =>", err);
        res.status(500).json({
            success: false,
            message: "Api is not working"
        })
    }
});


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
