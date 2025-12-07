import { pool } from "../../config/db";

const createBookingBookingResult = async (customer_id: string, vehicle_id: string, rent_start_date: string, rent_end_date: string, total_price: number) => {
    const bookingResult = await pool.query(`
            INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)VALUES($1,$2,$3,$4,$5,$6) RETURNING id, customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status`, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, 'active']);

    return bookingResult;
};

const createBookingVehicleResult = async (vehicle_id: string) => {
    const vehicleResult = await pool.query(`
            SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id = $1`,
        [vehicle_id]);

    return vehicleResult;
};

const getAllBooking = async () => {
    const result = await pool.query(`SELECT id, customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status 
    FROM bookings `);

    return result;
};
const updateBooking = async (status: string, id: any) => {
    const result = await pool.query(`UPDATE bookings SET
             status = COALESCE($1, status),
             updated_at = NOW() 
             WHERE id=$2 
             RETURNING id, customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status`, [status, id]);

    return result;
};

export const bookingServices = {
    createBookingBookingResult,
    createBookingVehicleResult,
    getAllBooking,
    updateBooking,
}