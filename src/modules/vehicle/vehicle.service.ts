import { pool } from "../../config/db";

const createVehicle = async (vehicle_name: string, type: string, registration_number: string, daily_rent_price: string, availability_status: string) => {
    const result = await pool.query(`
                INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status)VALUES($1,$2,$3,$4,$5) RETURNING id ,vehicle_name, type, registration_number, daily_rent_price, availability_status`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);

    return result;
};

const getVehicle = async () => {
    const result = await pool.query(`SELECT id, vehicle_name, type, registration_number, daily_rent_price, availability_status FROM vehicles`);

    return result;
};

const deleteVehicle = async (id: any) => {
    const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [id]);

    return result;
}



export const vehicleServices = {
    createVehicle,
    getVehicle,
    deleteVehicle,
}