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

const getVehicleById = async (id:any) => {
    const result = await pool.query(`SELECT id, vehicle_name, type, registration_number, daily_rent_price, availability_status FROM vehicles WHERE id=$1`,[id]);

    return result;
};

const updateVehicle = async (vehicle_name: string, type: string, registration_number: string, daily_rent_price: number, availability_status: string, id:any) => {
    const result = await pool.query(`UPDATE vehicles SET
             vehicle_name = COALESCE($1, vehicle_name),
             type = COALESCE($2, type),
             registration_number = COALESCE($3, registration_number),
             daily_rent_price = COALESCE($4, daily_rent_price),
             availability_status = COALESCE ($5, availability_status),
             updated_at = NOW() 
             WHERE id=$6 
             RETURNING id, vehicle_name, type, registration_number, daily_rent_price, availability_status`, [vehicle_name, type, registration_number, daily_rent_price, availability_status,id]);

    return result;
};

const deleteVehicle = async (id: any) => {
    const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [id]);

    return result;
}



export const vehicleServices = {
    createVehicle,
    getVehicle,
    getVehicleById,
    deleteVehicle,
    updateVehicle,
}