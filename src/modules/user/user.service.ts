import { pool } from "../../config/db";

const createUser = async (name: string, email: string, password: string, phone: string, role: string) => {
    const result = await pool.query(`
                INSERT INTO users(name,email, password, phone, role)VALUES($1,$2,$3,$4,$5) RETURNING id, name, email, phone, role`, [name, email, password, phone, role]);

    return result;

};

const getUsers = async () => {
    const result = await pool.query(`SELECT id, name, email, phone, role 
    FROM users`);

    return result;
};

const updateUser = async (name: string, email: string, phone: string, role: string, id: any) => {
    const result = await pool.query(`UPDATE users SET
             name = COALESCE($1, name),
             email = COALESCE($2, email),
             phone = COALESCE($3, phone),
             role = COALESCE($4, role),
             updated_at = NOW() 
             WHERE id=$5 
             RETURNING id, name, email, phone,role`, [name, email, phone, role, id]);

    return result;
};

export const userServices = {
    createUser,
    getUsers,
    updateUser,
}